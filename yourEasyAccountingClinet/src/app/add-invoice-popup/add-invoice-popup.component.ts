import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { VendorService } from '../shared/vendor.service';
import { Vendor } from '../shared/interfaces';
import { NgFor } from '@angular/common';
import { InvoicesService } from '../shared/invoices.service';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-add-invoice-popup',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor],
  templateUrl: './add-invoice-popup.component.html',
  styleUrl: './add-invoice-popup.component.css',
})
export class AddInvoicePopupComponent {
  constructor(
    private vendorsService: VendorService,
    private invoiceService: InvoicesService,
    private authService: AuthService
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
    });
  }
  vendors: Vendor[] = this.vendorsService.vendorsChange.value;
  addInvoiceForm: FormGroup;

  onSubmit() {
    let paymentMethod: string = '';
    if (this.addInvoiceForm.get('cash')) {
      paymentMethod = paymentMethod + 'cash ';
    } else if (this.addInvoiceForm.get('cash')) {
      paymentMethod = paymentMethod + 'card ';
    } else if (this.addInvoiceForm.get('bank')) {
      paymentMethod = paymentMethod + 'bank';
    }

    let netPrice: number =
      Number(this.addInvoiceForm.get('assQty')?.value) *
      Number(this.addInvoiceForm.get('netPrice')?.value);
    let VAT = Number(this.addInvoiceForm.get('VAT')?.value) / 100;

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
        clientID: 0,
        materialName: String(this.addInvoiceForm.get('assName')?.value),
        amount: String(this.addInvoiceForm.get('assQty')?.value),
        dueDate: new Date(String(this.addInvoiceForm.get('dueDate')?.value)),
        invoiceType: '1',
        issuePlace: String(this.addInvoiceForm.get('issuePlace')?.value),
        deliveryMethod: String(
          this.addInvoiceForm.get('deliveryMethod')?.value
        ),
        reciver: String(this.addInvoiceForm.get('reciver')?.value),
        payer: String(this.addInvoiceForm.get('payer')?.value),
        seller: String(this.addInvoiceForm.get('seller')?.value),
        assName: String(this.addInvoiceForm.get('assName')?.value),
        assQty: Number(this.addInvoiceForm.get('assQty')?.value),
        assjm: String(this.addInvoiceForm.get('assJm')?.value),
        issuedBy: String(this.addInvoiceForm.get('issuedBy')?.value),
        recived: String(this.addInvoiceForm.get('recived')?.value),
        comments: String(this.addInvoiceForm.get('comments')?.value),
        payDate: new Date(String(this.addInvoiceForm.get('payDate')?.value)),
      },
    ]);

    this.addInvoiceForm.reset();
    console.log(this.invoiceService.getInvoices());
  }

  onSelectClientID() {}
}
