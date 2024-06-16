import { Injectable } from '@angular/core';
import { Invoice, User } from './interfaces';
import { AuthService } from './auth.service';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class InvoicesService {
  constructor(private auth: AuthService, private http: HttpClient) {}

  user: User | undefined;
  invoiceIdUnderEdit!: number;
  isBeingEdited: boolean = false;
  private invoices: Invoice[] = [];
  invoicesChange = new BehaviorSubject<Invoice[]>(this.getInvoices());

  formatDateToSQL(vDate: any) {
    let date = new Date(vDate);
    let year = date.getFullYear();
    let month = ('0' + (date.getMonth() + 1)).slice(-2);
    let day = ('0' + date.getDate()).slice(-2);
    let hours = ('0' + date.getHours()).slice(-2);
    let minutes = ('0' + date.getMinutes()).slice(-2);
    let seconds = ('0' + date.getSeconds()).slice(-2);
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }
  getInvoices() {
    return this.invoices.slice();
  }

  addInvoice(invoice: Invoice[]) {
    invoice.forEach((eachInvoice) => {
      this.invoices.push(eachInvoice);
      this.addInvoiceHttp(eachInvoice);
    });
  }

  getInvoiceNextIndex() {
    return Math.trunc(Math.random() * 1000000000);

    // Zdecydowałem się na rozwiązanie mniej uzależnione od backednu
    //if (this.invoices.length > 0) {
    // return this.invoices[this.invoices.length - 1].ID + 1;
    // } else {
    //   return 1;
    //  }
  }

  declareAsEdited(invoice: Invoice) {
    let id = this.invoices.indexOf(invoice);
    this.invoiceIdUnderEdit = id;
  }

  deleteInvoice(invoice: Invoice) {
    let id = this.invoices.indexOf(invoice);
    this.invoices.splice(id, 1);
    this.deleteInvoiceHttp(invoice);
  }

  refreshInvoicesHttp() {
    return this.http
      .get<Invoice[]>('http://localhost/api/invoices-render.php')
      .subscribe((response) => {
        this.invoices = response;
        this.invoicesChange.next(this.getInvoices());
      });
  }

  addInvoiceHttp(invoice: Invoice) {
    return this.http
      .post(
        'http://localhost/api/invoice-input.php',
        {
          invoiceNum: invoice.invoiceNum,
          issueDate: this.formatDateToSQL(invoice.issueDate),
          paymentMethod: invoice.paymentMethod,
          currency: invoice.currency,
          netPrice: invoice.netPrice,
          VAT: invoice.VAT,
          issuerID: invoice.issuerID,
          clientID: invoice.clientID,
          materialName: invoice.materialName,
          amount: invoice.amount,
          dueDate: this.formatDateToSQL(invoice.dueDate),
          invoiceType: invoice.invoiceType,
          issuePlace: invoice.issuePlace,
          deliveryMethod: invoice.deliveryMethod,
          reciver: invoice.reciver,
          payer: invoice.payer,
          seller: invoice.seller,
          assJm: invoice.assjm,
          issuedBy: invoice.issuedBy,
          recived: invoice.recived,
          comments: invoice.comments,
          payDate: this.formatDateToSQL(invoice.payDate),
        },
        {
          responseType: 'text',
        }
      )
      .subscribe((response) => {
        console.log(response);
        this.refreshInvoicesHttp();
      });
  }
  deleteInvoiceHttp(invoice: Invoice) {
    return this.http
      .post(
        'http://localhost/api/invoice-delete.php',
        {
          ID: invoice.ID,
          invoiceNum: invoice.invoiceNum,
          issueDate: this.formatDateToSQL(invoice.issueDate),
          paymentMethod: invoice.paymentMethod,
          currency: invoice.currency,
          netPrice: invoice.netPrice,
          VAT: invoice.VAT,
          issuerID: invoice.issuerID,
          clientID: invoice.clientID,
          materialName: invoice.materialName,
          amount: invoice.amount,
          dueDate: this.formatDateToSQL(invoice.dueDate),
          invoiceType: invoice.invoiceType,
          issuePlace: invoice.issuePlace,
          deliveryMethod: invoice.deliveryMethod,
          reciver: invoice.reciver,
          payer: invoice.payer,
          seller: invoice.seller,
          assJm: invoice.assjm,
          issuedBy: invoice.issuedBy,
          recived: invoice.recived,
          comments: invoice.comments,
          payDate: this.formatDateToSQL(invoice.payDate),
        },
        {
          responseType: 'text',
        }
      )
      .subscribe((response) => {
        console.log(response);
        this.refreshInvoicesHttp();
      });
  }
  editInvoiceHttp(invoice: Invoice) {
    return this.http
      .post(
        'http://localhost/api/invoice-edit.php',
        {
          ID: invoice.ID,
          invoiceNum: invoice.invoiceNum,
          issueDate: this.formatDateToSQL(invoice.issueDate),
          paymentMethod: invoice.paymentMethod,
          currency: invoice.currency,
          netPrice: invoice.netPrice,
          VAT: invoice.VAT,
          issuerID: invoice.issuerID,
          clientID: invoice.clientID,
          materialName: invoice.materialName,
          amount: invoice.amount,
          dueDate: this.formatDateToSQL(invoice.dueDate),
          invoiceType: invoice.invoiceType,
          issuePlace: invoice.issuePlace,
          deliveryMethod: invoice.deliveryMethod,
          reciver: invoice.reciver,
          payer: invoice.payer,
          seller: invoice.seller,
          assJm: invoice.assjm,
          issuedBy: invoice.issuedBy,
          recived: invoice.recived,
          comments: invoice.comments,
          payDate: this.formatDateToSQL(invoice.payDate),
        },
        {
          responseType: 'text',
        }
      )
      .subscribe((response) => {
        console.log(response);
        this.refreshInvoicesHttp();
      });
  }
  comingSoon() {
    alert('Funkcjonalność w produkcji');
  }
}
