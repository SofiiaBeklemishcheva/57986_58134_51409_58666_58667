import { Routes } from '@angular/router';
import { LoginFormComponent } from './login-form/login-form.component';
import { BalanceSummaryComponent } from './balance-summary/balance-summary.component';
import { InvoicesSummaryComponent } from './invoices-summary/invoices-summary.component';
import { ObligationSummaryComponent } from './obligation-summary/obligation-summary.component';
import { InvoiceInputComponent } from './invoice-input/invoice-input.component';
import { AddInvoicePopupComponent } from './add-invoice-popup/add-invoice-popup.component';
import { guardsGuard } from './shared/guards.guard';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { denyloginGuard } from './shared/denylogin.guard';
import { EditInvoiceComponent } from './shared/edit-invoice/edit-invoice.component';
import { editGuard } from './shared/edit.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginFormComponent,
    canActivate: [denyloginGuard],
  },
  {
    path: 'balanceSummary',
    component: BalanceSummaryComponent,
    canActivate: [guardsGuard],
  },
  {
    path: 'invoicesSummary',
    component: InvoicesSummaryComponent,
    canActivate: [guardsGuard],
  },
  {
    path: 'obligationSummary',
    component: ObligationSummaryComponent,
    canActivate: [guardsGuard],
  },
  {
    path: 'inputInvoice',
    component: InvoiceInputComponent,
    canActivate: [guardsGuard],
  },
  {
    path: 'addInvoice',
    component: AddInvoicePopupComponent,
    canActivate: [guardsGuard],
  },

  {
    path: 'contact',
    component: ContactComponent,
    canActivate: [guardsGuard],
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [guardsGuard],
  },
  {
    path: 'edit',
    component: EditInvoiceComponent,
    canActivate: [guardsGuard, editGuard],
  },
];
