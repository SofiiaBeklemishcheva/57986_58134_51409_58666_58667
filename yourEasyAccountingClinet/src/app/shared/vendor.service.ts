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
      ID: 416387525429,
      name: 'EasyLease',
      NIP: '5683748028',
      address: 'adres',
      phone: '543634632',
      comments: 'testowykomentarz',
    },
    {
      ID: 716057728707,
      name: 'HugeHurtownia',
      NIP: '5803583017',
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
    return Math.trunc(Math.random() * 1000000000000);
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
    this.vendorsChange.next(this.vendors);
  }

  getVendorIndex(vendor: Vendor) {
    return this.vendors.indexOf(vendor);
  }
}
