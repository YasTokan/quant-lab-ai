import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutomationComponent } from './pages/automation/automation.component';

export const routes: Routes = [
  { path: '', component: AutomationComponent },
  { path: 'test', component: AutomationComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }



