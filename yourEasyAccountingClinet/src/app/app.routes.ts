import { Routes } from '@angular/router';
import { LoginFormComponent } from './login-form/login-form.component';
import { BalanceSummaryComponent } from './balance-summary/balance-summary.component';
import { InvoicesSummaryComponent } from './invoices-summary/invoices-summary.component';
import { ObligationSummaryComponent } from './obligation-summary/obligation-summary.component';

export const routes: Routes = [
  { path: 'login', component: LoginFormComponent },
  { path: 'balanceSummary', component: BalanceSummaryComponent },
  { path: 'invoicesSummary', component: InvoicesSummaryComponent },
  { path: 'obligationSummary', component: ObligationSummaryComponent },
  { path: 'obligationSummary', component: ObligationSummaryComponent },
];
