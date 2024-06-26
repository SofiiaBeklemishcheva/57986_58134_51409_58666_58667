import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { VendorService } from '../shared/vendor.service';
import { Vendor } from '../shared/interfaces';
import { CommonModule, NgFor } from '@angular/common';
import { InvoicesService } from '../shared/invoices.service';
import { AuthService } from '../shared/auth.service';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-invoice-popup',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor, FormsModule, CommonModule],
  templateUrl: './add-invoice-popup.component.html',
  styleUrl: './add-invoice-popup.component.css',
})
export class AddInvoicePopupComponent implements OnInit {
  selectedVendor: any;
  constructor(
    private vendorsService: VendorService,
    private invoiceService: InvoicesService,
    private authService: AuthService,
    private http: HttpClient
  ) {
    this.addInvoiceForm = new FormGroup({
      invoiceNum: new FormControl(),
      issueDate: new FormControl(),
      issuePlace: new FormControl(),
      deliveryMethod: new FormControl(),
      reciver: new FormControl(),
      payer: new FormControl(),
      seller: new FormControl(),
      assName: new FormControl(),
      assQty: new FormControl(),
      assJm: new FormControl(),
      netPrice: new FormControl(),
      VAT: new FormControl(),
      issuedBy: new FormControl(),
      recived: new FormControl(),
      comments: new FormControl(),
      dueDate: new FormControl(),
      cash: new FormControl(),
      card: new FormControl(),
      bank: new FormControl(),
      payDate: new FormControl(),
      vendorID: new FormControl(),
    });
  }
  inProduction() {
    alert('Funkcjonalność w trakcie tworzenia.');
  }

  vendorsSub!: Subscription;
  vendors: Vendor[] = [];
  addInvoiceForm: FormGroup;

  onSubmit() {
    let paymentMethod: string = '';
    if (this.addInvoiceForm.get('cash')?.value) {
      paymentMethod = paymentMethod + 'cash ';
    }
    if (this.addInvoiceForm.get('cash')?.value) {
      paymentMethod = paymentMethod + 'card ';
    }
    if (this.addInvoiceForm.get('bank')?.value) {
      paymentMethod = paymentMethod + 'bank';
    }

    let netPrice: number =
      Number(this.addInvoiceForm.get('assQty')?.value) *
      Number(this.addInvoiceForm.get('netPrice')?.value);

    let VAT = Number(this.addInvoiceForm.get('VAT')?.value) / 100;

    let invoiceType: string;
    if (netPrice > 0) {
      invoiceType = 'wystawione';
    } else {
      invoiceType = 'do zapłaty';
    }

    this.invoiceService.addInvoice([
      {
        ID: this.invoiceService.getInvoiceNextIndex(),
        invoiceNum: String(this.addInvoiceForm.get('invoiceNum')?.value),
        issueDate: new Date(
          String(this.addInvoiceForm.get('issueDate')?.value)
        ),
        paymentMethod: paymentMethod,
        currency: 'PLN',
        netPrice: netPrice,
        VAT: VAT,
        issuerID: Number(this.authService.getUser()?.ID),
        clientID: Number(this.addInvoiceForm.get('vendorID')?.value),
        materialName: String(this.addInvoiceForm.get('assName')?.value),
        amount: String(this.addInvoiceForm.get('assQty')?.value),
        dueDate: new Date(String(this.addInvoiceForm.get('dueDate')?.value)),
        invoiceType: invoiceType,
        issuePlace: String(this.addInvoiceForm.get('issuePlace')?.value),
        deliveryMethod: String(
          this.addInvoiceForm.get('deliveryMethod')?.value
        ),
        reciver: String(this.addInvoiceForm.get('reciver')?.value),
        payer: String(this.addInvoiceForm.get('payer')?.value),
        seller: String(this.addInvoiceForm.get('seller')?.value),
        assName: String(this.addInvoiceForm.get('assName')?.value),
        assjm: String(this.addInvoiceForm.get('assJm')?.value),
        issuedBy: String(this.addInvoiceForm.get('issuedBy')?.value),
        recived: String(this.addInvoiceForm.get('recived')?.value),
        comments: String(this.addInvoiceForm.get('comments')?.value),
        payDate: new Date(String(this.addInvoiceForm.get('payDate')?.value)),
      },
    ]);

    alert('Faktura dodana pomyślnie');
    this.addInvoiceForm.reset();
  }
  ngOnInit() {
    this.vendorsSub = this.vendorsService.vendorsChange.subscribe((val) => {
      this.vendors = val;
    });
  }
  apiUrl = 'http://localhost:8000/';

  test() {
    this.storeRecipes();
  }

  storeRecipes() {
    this.http
      .post('http://localhost/api/vendor-delete.php', {
        ID: 312323,
        name: 'test',
        NIP: 2312412,
        address: 'abssws',
        phone: '321543234',
        comments: 'testowy komponent',
      })
      .subscribe((response) => {
        console.log(response);
      });
  }
}
