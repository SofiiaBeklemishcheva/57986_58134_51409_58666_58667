import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Invoice } from '../shared/interfaces';
import { InvoicesService } from '../shared/invoices.service';
import { DueDatePipe } from '../shared/dueDate.pipe';
import { NgFor, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VendorService } from '../shared/vendor.service';

@Component({
  selector: 'app-obligation-summary',
  standalone: true,
  imports: [NgFor, CommonModule, DueDatePipe, FormsModule],
  templateUrl: './obligation-summary.component.html',
  styleUrl: './obligation-summary.component.css',
})
export class ObligationSummaryComponent {
  dateFrom!: Date;
  dateTo!: Date;

  constructor(
    private invoicesSer: InvoicesService,
    public vendSer: VendorService
  ) {}
  invoices: Invoice[] = [];
  invoicesSub!: Subscription;

  filtering() {
    const dateFrom: Date = new Date(this.dateFrom);
    const dateTo: Date = new Date(this.dateTo);
    const initialInvoices = this.invoicesSer.getInvoices();
    const filteredInvoices = initialInvoices.filter((val) => {
      return (
        val.issueDate.getTime() >= dateFrom.getTime() - 6400000 &&
        val.issueDate.getTime() <= dateTo.getTime() + 6400000 &&
        val.invoiceType === 'wystawione'
      );
    });
    this.invoices = filteredInvoices;
  }

  deleteInvoice(invoice: Invoice) {
    this.invoicesSer.deleteInvoice(invoice);
  }

  ngOnInit(): void {
    this.invoicesSub = this.invoicesSer.invoicesChange.subscribe(
      (vInvoices) => {
        this.invoices = vInvoices.filter((val) => {
          return val.invoiceType === 'wystawione';
        });
      }
    );
  }

  ngOnDestroy(): void {
    this.invoicesSub.unsubscribe();
  }
}
