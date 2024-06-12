import { Injectable } from '@angular/core';
import { Invoice, Vendor } from './interfaces';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VendorService {
  invoices: any;
  constructor() {}

  vendors: Vendor[] = [
    {
      ID: 1,
      name: 'Kabaczkowa',
      NIP: '423423423432',
      address: 'adres',
    },
    {
      ID: 2,
      name: 'Legnicka',
      NIP: '23423423432',
      address: 'adres1',
    },
  ];
  vendorsChange = new BehaviorSubject<Vendor[]>(this.vendors.slice());
}
