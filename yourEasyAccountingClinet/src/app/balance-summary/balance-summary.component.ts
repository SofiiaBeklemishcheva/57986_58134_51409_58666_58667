import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Invoice, Vendor } from '../shared/interfaces';
import { InvoicesService } from '../shared/invoices.service';
import { CommonModule, NgFor } from '@angular/common';
import { VendorService } from '../shared/vendor.service';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-balance-summary',
  standalone: true,
  imports: [NgFor, CommonModule, FormsModule],
  templateUrl: './balance-summary.component.html',
  styleUrl: './balance-summary.component.css',
})
export class BalanceSummaryComponent implements OnInit, OnDestroy {
  vendorsSub!: Subscription;
  constructor(
    private invoicesSer: InvoicesService,
    public vendSer: VendorService
  ) {}
  incomingInvoices: Invoice[] = [];
  outcomingInvoices: Invoice[] = [];
  vendors: Vendor[] = [];
  invoicesSub!: Subscription;
  dateFrom!: Date;
  dateTo!: Date;

  bulkFilter() {
    this.outcomingInvoices = this.filtering(
      'do zapłaty',
      this.outcomingInvoices
    );
    this.incomingInvoices = this.filtering('wystawione', this.incomingInvoices);
  }

  filtering(invoiceType: string, invoiceArrayRef: any) {
    const dateFrom: Date = new Date(this.dateFrom);
    const dateTo: Date = new Date(this.dateTo);
    const initialInvoices = this.invoicesSer.getInvoices();
    const filteredInvoices = initialInvoices.filter((val) => {
      let issueDate = new Date(val.issueDate);
      return (
        issueDate.getTime() >= dateFrom.getTime() - 6400000 &&
        issueDate.getTime() <= dateTo.getTime() + 6400000 &&
        val.invoiceType === invoiceType
      );
    });
    return filteredInvoices;
  }

  incomingBalance(): number {
    let balance: number = 0;
    this.incomingInvoices.forEach((val) => {
      balance += val.netPrice + val.VAT * val.netPrice;
    });
    return this.Absolute(balance);
  }
  outcomingBalance(): number {
    let balance: number = 0;
    this.outcomingInvoices.forEach((val) => {
      balance += val.netPrice + val.VAT * val.netPrice;
    });
    return this.Absolute(balance);
  }

  Absolute(arg0: number) {
    return Math.abs(arg0);
  }

  ngOnInit(): void {
    this.invoicesSub = this.invoicesSer.invoicesChange.subscribe(
      (vInvoices) => {
        vInvoices.forEach((val) => {
          if (val.invoiceType === 'wystawione') {
            this.incomingInvoices.push(val);
          } else if (val.invoiceType === 'do zapłaty') {
            this.outcomingInvoices.push(val);
          }
        });
      }
    );

    this.vendorsSub = this.vendSer.vendorsChange.subscribe((val) => {
      this.vendors = val;
    });
  }

  ngOnDestroy(): void {
    this.invoicesSub.unsubscribe();
  }

  test() {
    let test;
  }
}
