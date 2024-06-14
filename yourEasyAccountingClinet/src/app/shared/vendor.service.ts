import { Injectable } from '@angular/core';
import { Invoice, Vendor } from './interfaces';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VendorService {
  invoices: any;
  constructor() {}
  private vendors: Vendor[] = [
    {
      ID: 1,
      name: 'Kabaczkowa',
      NIP: '423423423432',
      address: 'adres',
      phone: '4324532124',
      comments: 'testowykomentarz',
    },
    {
      ID: 2,
      name: 'Legnicka',
      NIP: '23423423432',
      address: 'adres1',
      phone: '654734672',
      comments: 'testowykomentarz2',
    },
  ];
  vendorsChange = new BehaviorSubject<Vendor[]>(this.vendors.slice());

  addVendor(vendor: Vendor) {
    this.vendors.push(vendor);
    this.vendorsChange.next(this.vendors.slice());
  }

  getVendor() {
    return this.vendors.slice();
  }

  getVendorNextIndex() {
    if (this.vendors.length > 0) {
      return this.vendors[this.vendors.length - 1].ID + 1;
    } else {
      return 1;
    }
  }

  getVendorById(id: number) {
    return this.vendors.find((vendor) => {
      return vendor.ID == id;
    });
  }


  deleteVendor(vendor: Vendor) {
    let index = this.vendors.indexOf(vendor);

    this.vendors.splice(index, 1);
    this.vendorsChange.next(this.vendors);
  }
}
