import { TestBed } from '@angular/core/testing';

import { AutomationApiService } from './automation-api.service';

describe('AutomationApiService', () => {
  let service: AutomationApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutomationApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
