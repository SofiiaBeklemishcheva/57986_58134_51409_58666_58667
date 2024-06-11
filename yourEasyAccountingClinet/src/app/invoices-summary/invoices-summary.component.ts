import { CommonModule, NgFor } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Invoice } from '../shared/interfaces';
import { Subscription } from 'rxjs';
import { InvoicesService } from '../shared/invoices.service';
import { DueDatePipe } from '../shared/dueDate.pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-invoices-summary',
  standalone: true,
  imports: [NgFor, CommonModule, DueDatePipe, FormsModule],
  templateUrl: './invoices-summary.component.html',
  styleUrl: './invoices-summary.component.css',
})
export class InvoicesSummaryComponent implements OnInit, OnDestroy {
  dateFrom!: Date;
  dateTo!: Date;

  constructor(private invoicesSer: InvoicesService) {}
  invoices: Invoice[] = [];
  invoicesSub!: Subscription;

  filtering() {
    const dateFrom: Date = new Date(this.dateFrom);
    const dateTo: Date = new Date(this.dateTo);
    const initialInvoices = this.invoicesSer.getInvoices();
    const filteredInvoices = initialInvoices.filter((val) => {
      console.log(val.issueDate.getTime());
      console.log(dateFrom.getTime());
      return (
        val.issueDate.getTime() >= dateFrom.getTime() &&
        val.issueDate.getTime() <= dateTo.getTime()
      );
    });
    this.invoices = filteredInvoices;
  }

  ngOnInit(): void {
    this.invoicesSub = this.invoicesSer.invoicesChange.subscribe(
      (vInvoices) => {
        this.invoices = vInvoices;
      }
    );
  }

  ngOnDestroy(): void {
    this.invoicesSub.unsubscribe();
  }
}
