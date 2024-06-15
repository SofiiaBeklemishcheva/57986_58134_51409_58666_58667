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
  invoiceIdUnderEdit!: number;
  isBeingEdited: boolean = false;
  private invoices: Invoice[] = [
    {
      ID: 1,
      invoiceNum: '202401',
      issueDate: new Date('2024-06-01'),
      paymentMethod: 'bank',
      currency: 'PLN',
      netPrice: -1500,
      VAT: 0.23,
      issuerID: 1001,
      clientID: 416387525429,
      materialName: 'Laptop Dell XPS 15',
      amount: '1',
      dueDate: new Date('2024-06-14'),
      invoiceType: 'do zapłaty',
      issuePlace: 'Warszawa',
      deliveryMethod: 'kurier',
      reciver: 'Jan Kowalski',
      payer: 'Firma XYZ Sp. z o.o.',
      seller: 'Sklep Komputerowy "IT World"',
      assName: 'Laptop Dell XPS 15',
      assQty: 1,
      assjm: 'szt.',
      issuedBy: 'Anna Nowak',
      recived: 'Jan Kowalski',
      comments: 'Zakup laptopa przez firmę XYZ Sp. z o.o.',
      payDate: new Date('2024-06-10'),
    },
    {
      ID: 2,
      invoiceNum: '202402',
      issueDate: new Date('202422121303'),
      paymentMethod: 'cash',
      currency: 'PLN',
      netPrice: -800,
      VAT: 0.23,
      issuerID: 1002,
      clientID: 416387525429,
      materialName: 'Smartphone Samsung Galaxy S22',
      amount: '1',
      dueDate: new Date('2024-06-18'),
      invoiceType: 'do zapłaty',
      issuePlace: 'Kraków',
      deliveryMethod: 'osobiście',
      reciver: 'Ewa Nowak',
      payer: 'Osoba prywatna',
      seller: 'Sklep Elektroniczny "Mobile Planet"',
      assName: 'Smartphone Samsung Galaxy S22',
      assQty: 1,
      assjm: 'szt.',
      issuedBy: 'Piotr Wiśniewski',
      recived: 'Ewa Nowak',
      comments: 'Sprzedaż telefonu na fakturę.',
      payDate: new Date('2024-06-05'),
    },
    {
      ID: 3,
      invoiceNum: '202403',
      issueDate: new Date('2024-06-05'),
      paymentMethod: 'bank cash',
      currency: 'PLN',
      netPrice: 5000,
      VAT: 0.23,
      issuerID: 1001,
      clientID: 716057728707,
      materialName: 'Oprogramowanie biurowe Microsoft Office 365',
      amount: '10',
      dueDate: new Date('2024-06-20'),
      invoiceType: 'wystawione',
      issuePlace: 'Warszawa',
      deliveryMethod: 'poczta',
      reciver: 'Firma XYZ Sp. z o.o.',
      payer: 'Firma XYZ Sp. z o.o.',
      seller: 'Sklep Komputerowy "IT World"',
      assName: 'Oprogramowanie biurowe Microsoft Office 365',
      assQty: 10,
      assjm: 'licencja',
      issuedBy: 'Anna Nowak',
      recived: 'Firma XYZ Sp. z o.o.',
      comments: 'Zakup licencji na oprogramowanie biurowe.',
      payDate: new Date('2024-06-15'),
    },
    {
      ID: 4,
      invoiceNum: '202404',
      issueDate: new Date('2024-06-07'),
      paymentMethod: 'bank cash card',
      currency: 'PLN',
      netPrice: 3200,
      VAT: 0.23,
      issuerID: 1003,
      clientID: 416387525429,
      materialName: 'Usługi serwisowe komputera stacjonarnego',
      amount: '1',
      dueDate: new Date('2024-06-22'),
      invoiceType: 'wystawione',
      issuePlace: 'Gdańsk',
      deliveryMethod: 'serwis na miejscu',
      reciver: 'Tomasz Nowak',
      payer: 'Firma ABC Sp. z o.o.',
      seller: 'Firma XYZ Sp. z o.o.',
      assName: 'Usługi serwisowe komputera stacjonarnego',
      assQty: 1,
      assjm: 'usługa',
      issuedBy: 'Marcin Kowalski',
      recived: 'Tomasz Nowak',
      comments: 'Naprawa i konserwacja komputera stacjonarnego.',
      payDate: new Date('2024-06-12'),
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
    return Math.trunc(Math.random() * 1000000000000);

    // Zdecydowałem się na rozwiązanie mniej uzależnione od backednu
    //if (this.invoices.length > 0) {
    // return this.invoices[this.invoices.length - 1].ID + 1;
    // } else {
    //   return 1;
    //  }
  }
  updateInvoice() {}

  declareAsEdited(invoice: Invoice) {
    let id = this.invoices.indexOf(invoice);
    this.invoiceIdUnderEdit = id;
  }

  deleteInvoice(invoice: Invoice) {
    let id = this.invoices.indexOf(invoice);
    this.invoices.splice(id, 1);
    this.invoicesChange.next(this.invoices.slice());
  }

  comingSoon() {
    alert('Funkcjonalność w produkcji');
  }
}
