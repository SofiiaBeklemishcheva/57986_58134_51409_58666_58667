import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, take } from 'rxjs';
import { Invoice, Vendor } from '../shared/interfaces';
import { InvoicesService } from '../shared/invoices.service';
import { VendorService } from '../shared/vendor.service';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor(
    private invoicesSer: InvoicesService,
    public vendSer: VendorService
  ) {}
  incomingInvoices: Invoice[] = [];
  outcomingInvoices: Invoice[] = [];
  vendors: Vendor[] = [];
  invoicesSub!: Subscription;
  vendorsSub!: Subscription;
  searchString!: string;

  Absolute(arg0: number) {
    return Math.abs(arg0);
  }

  deleteVendor(vendor: any) {
    this.vendSer.deleteVendor(vendor);
  }

  filterVendors() {
    this.vendors = this.vendSer.getVendor();

    this.vendors = this.vendors.filter((val) => {
      return (
        val.name.toUpperCase().indexOf(this.searchString.toUpperCase()) >= 0
      );
    });
  }

  ngOnInit(): void {
    this.invoicesSub = this.invoicesSer.invoicesChange
      .pipe(take(1))
      .subscribe((vInvoices) => {
        vInvoices.forEach((val) => {
          if (val.invoiceType === 'wystawione') {
            this.incomingInvoices.push(val);
          } else if (val.invoiceType === 'do zapłaty') {
            this.outcomingInvoices.push(val);
          }
        });
      });
    this.vendorsSub = this.vendSer.vendorsChange.subscribe((vVendors) => {
      this.vendors = vVendors;
    });
  }

  ngOnDestroy(): void {
    this.invoicesSub.unsubscribe();
    this.vendorsSub.unsubscribe();
  }
}
