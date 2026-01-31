import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AutomationApiService, JobResponse } from '../../services/automation-api.service';

@Component({
  selector: 'app-automation',
  templateUrl: './automation.component.html',
  styleUrl: './automation.component.scss'
})
export class AutomationComponent implements OnInit {
  loading = false;
  lastResult: JobResponse | null = null;
  lastMessage: string | null = null;

  form = this.fb.group({
    toEmail: ['', [Validators.required, Validators.email]],
    sendTime: ['09:00', [Validators.required, Validators.pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)]],
    sendNow: [false],
    overrideEmail: [''] // optional one-off recipient for Send Now
  });

  constructor(private fb: FormBuilder, private api: AutomationApiService) {}

  ngOnInit(): void {
    this.refreshConfig();
  }

  refreshConfig() {
    this.loading = true;
    this.api.getConfig().subscribe({
      next: (cfg) => {
        this.form.patchValue({
          toEmail: cfg.toEmail,
          sendTime: cfg.sendTime
        });
        this.lastMessage = `Loaded config (timezone: ${cfg.timezone})`;
        this.loading = false;
      },
      error: (err) => {
        this.lastMessage = `Failed to load config: ${err?.message || err}`;
        this.loading = false;
      }
    });
  }

  saveConfig() {
    if (this.form.invalid) return;

    const { toEmail, sendTime, sendNow } = this.form.value;

    this.loading = true;
    this.lastResult = null;

    this.api.updateConfig({
      toEmail: toEmail!,
      sendTime: sendTime!,
      sendNow: !!sendNow
    }).subscribe({
      next: (res) => {
        this.lastMessage = sendNow ? 'Config saved + job triggered.' : 'Config saved.';
        this.lastResult = res?.result ?? null;
        this.loading = false;
      },
      error: (err) => {
        this.lastMessage = `Save failed: ${err?.message || err}`;
        this.loading = false;
      }
    });
  }

  triggerNow() {
    const overrideEmail = (this.form.value.overrideEmail || '').trim();
    const emailToUse = overrideEmail.length ? overrideEmail : undefined;

    this.loading = true;
    this.lastResult = null;

    this.api.sendNow(emailToUse).subscribe({
      next: (res) => {
        this.lastMessage = 'Job executed.';
        this.lastResult = res;
        this.loading = false;
      },
      error: (err) => {
        this.lastMessage = `Run failed: ${err?.message || err}`;
        this.loading = false;
      }
    });
  }

  formatMatches(matches?: string[]) {
    if (!matches) return '';
    if (matches.length === 0) return 'No tickers matched.';
    return matches.join(', ');
  }
}
