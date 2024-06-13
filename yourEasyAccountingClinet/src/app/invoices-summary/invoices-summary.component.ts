import { CommonModule, NgFor } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Invoice } from '../shared/interfaces';
import { Subscription } from 'rxjs';
import { InvoicesService } from '../shared/invoices.service';
import { DueDatePipe } from '../shared/dueDate.pipe';
import { FormsModule } from '@angular/forms';
import { VendorService } from '../shared/vendor.service';

@Component({
  selector: 'app-invoices-summary',
  standalone: true,
  imports: [NgFor, CommonModule, DueDatePipe, FormsModule],
  templateUrl: './invoices-summary.component.html',
  styleUrl: './invoices-summary.component.css',
})
export class InvoicesSummaryComponent implements OnInit, OnDestroy {
  deleteInvoice(invoice: Invoice) {
    this.invoicesSer.deleteInvoice(invoice);
  }
  Absolute(arg0: number) {
    return Math.abs(arg0);
  }
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
        val.invoiceType === 'do zapłaty'
      );
    });
    this.invoices = filteredInvoices;
  }

  ngOnInit(): void {
    this.invoicesSub = this.invoicesSer.invoicesChange.subscribe(
      (vInvoices) => {
        this.invoices = vInvoices.filter((val) => {
          return val.invoiceType === 'do zapłaty';
        });
      }
    );
  }

  ngOnDestroy(): void {
    this.invoicesSub.unsubscribe();
  }
}
