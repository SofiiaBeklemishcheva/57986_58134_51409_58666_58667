import { Injectable, ValueEqualityFn } from '@angular/core';
import { Invoice, Vendor } from './interfaces';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class VendorService {
  invoices: any;
  constructor(private http: HttpClient) {}
  private vendors: Vendor[] = [];
  vendorsChange = new BehaviorSubject<Vendor[]>(this.vendors.slice());

  addVendor(vendor: Vendor) {
    this.vendors.push(vendor);
    this.addVendorsHttp(vendor);
  }

  getVendor() {
    return this.vendors.slice();
  }

  getVendorNextIndex() {
    return Math.trunc(Math.random() * 1000000000);

    //if (this.vendors.length > 0) {
    // return this.vendors[this.vendors.length - 1].ID + 1;
    // } else {
    //   return 1;
    //  }
  }

  getVendorById(id: number): Vendor {
    let vend = this.vendors.find((vendor) => {
      return vendor.ID == id;
    });

    if (typeof vend == 'object') {
      return vend!;
    }

    return {
      ID: 99999,
      name: 'Brak',
      NIP: '',
      address: '',
      phone: '',
      comments: '',
    };
  }

  deleteVendor(vendor: Vendor) {
    let index = this.vendors.indexOf(vendor);
    this.vendors.splice(index, 1);
    this.deleteVendorHttp(vendor);
  }

  getVendorIndex(vendor: Vendor) {
    return this.vendors.indexOf(vendor);
  }

  getVendorsHttp() {
    return this.http
      .get<Vendor[]>('http://localhost/api/vendor-render.php')
      .subscribe((response) => {
        this.vendors = response;
        this.vendorsChange.next(this.getVendor());
      });
  }

  addVendorsHttp(vendor: Vendor) {
    return this.http
      .post('http://localhost/api/vendor-input.php', vendor)
      .subscribe((response) => {
        this.getVendorsHttp();
      });
  }

  deleteVendorHttp(vendor: Vendor) {
    return this.http
      .post('http://localhost/api/vendor-delete.php', vendor)
      .subscribe((response) => {
        this.getVendorsHttp();
      });
  }
}
