import { Injectable } from '@angular/core';
import { Invoice, User } from './interfaces';
import { AuthService } from './auth.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InvoicesService {
  constructor(private auth: AuthService) {}

  user: User | undefined;

  private invoices: Invoice[] = [
    {
      ID: 1,
      invoiceNum: '53434543534',
      issueDate: new Date('12/05/2000'),
      paymentMethod: 'cash',
      currency: 'PLN',
      netPrice: 125,
      VAT: 0.12,
      issuerID: 214,
      clientID: 1,
      materialName: 'baton', //Nazwa towaru
      amount: '12',
      dueDate: new Date('12/05/2000'),
      invoiceType: 'wystawione',
      issuePlace: 'ostroleka',
      deliveryMethod: '',
      reciver: '',
      payer: '',
      seller: '',
      assName: '',
      assQty: 0,
      assjm: '',
      issuedBy: '',
      recived: '',
      comments: '',
      payDate: new Date('12/08/2000'),
    },
    {
      ID: 2,
      invoiceNum: '1343242',
      issueDate: new Date('12/07/2000'),
      paymentMethod: 'card',
      currency: 'EUR',
      netPrice: 1225,
      VAT: 0.15,
      issuerID: 2432,
      clientID: 2,
      materialName: 'towar', //Nazwa towaru
      amount: '124',
      dueDate: new Date('12/08/2000'),
      invoiceType: 'wystawione',
      issuePlace: 'wroclaw',
      deliveryMethod: '',
      reciver: '',
      payer: '',
      seller: '',
      assName: '',
      assQty: 0,
      assjm: '',
      issuedBy: '',
      recived: '',
      comments: '',
      payDate: new Date('12/08/2000'),
    },
    {
      ID: 3,
      invoiceNum: '53434543534',
      issueDate: new Date('12/05/2000'),
      paymentMethod: 'cash',
      currency: 'PLN',
      netPrice: -999,
      VAT: 0.12,
      issuerID: 214,
      clientID: 1,
      materialName: 'baton', //Nazwa towaru
      amount: '12',
      dueDate: new Date('12/05/2000'),
      invoiceType: 'do zapłaty',
      issuePlace: 'ostroleka',
      deliveryMethod: '',
      reciver: '',
      payer: '',
      seller: '',
      assName: '',
      assQty: 0,
      assjm: '',
      issuedBy: '',
      recived: '',
      comments: '',
      payDate: new Date('12/08/2000'),
    },
    {
      ID: 4,
      invoiceNum: '1343242',
      issueDate: new Date('12/07/2000'),
      paymentMethod: 'card',
      currency: 'EUR',
      netPrice: -99,
      VAT: 0.15,
      issuerID: 1,
      clientID: 1,
      materialName: 'towar', //Nazwa towaru
      amount: '124',
      dueDate: new Date('12/08/2000'),
      invoiceType: 'do zapłaty',
      issuePlace: 'wroclaw',
      deliveryMethod: '',
      reciver: '',
      payer: '',
      seller: '',
      assName: '',
      assQty: 0,
      assjm: '',
      issuedBy: '',
      recived: '',
      comments: '',
      payDate: new Date('12/08/2000'),
    },
  ];
  invoicesChange = new BehaviorSubject<Invoice[]>(this.invoices.slice());

  getInvoices() {
    return this.invoices.slice();
  }

  addInvoice(invoice: Invoice[]) {
    invoice.forEach((eachInvoice) => {
      this.invoices.push(eachInvoice);
    });
    this.invoicesChange.next(this.invoices.slice());
  }

  getInvoiceNextIndex() {
    if (this.invoices.length > 0) {
      return this.invoices[this.invoices.length - 1].ID + 1;
    } else {
      return 1;
    }
  }
  updateInvoice() {}

  deleteInvoice(invoice: Invoice) {
    let id = this.invoices.indexOf(invoice);
    this.invoices.splice(id, 1);
    this.invoicesChange.next(this.invoices.slice());
  }
}
