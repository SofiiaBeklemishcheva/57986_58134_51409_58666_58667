import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { Invoice, Vendor } from '../interfaces';
import { InvoicesService } from '../invoices.service';
import { VendorService } from '../vendor.service';
import { CommonModule, formatDate } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-invoice',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './edit-invoice.component.html',
  styleUrl: './edit-invoice.component.css',
})
export class EditInvoiceComponent implements OnInit {
  selectedVendor: any;
  invoiceUnderEdit: Invoice;

  issueDateVal!: any;
  dueDateVal!: any;
  payDateVal!: any;
  chosenVendor!: number;

  dateValidityCheck(InitDate: any) {
    if (!!InitDate.getDate()) {
      return formatDate(new Date(InitDate), 'yyyy-MM-dd', 'en');
    } else {
      return undefined;
    }
  }
  constructor(
    private vendorsService: VendorService,
    private invoiceService: InvoicesService,
    private authService: AuthService,
    private router: Router
  ) {
    this.invoiceUnderEdit =
      invoiceService.getInvoices()[invoiceService.invoiceIdUnderEdit];

    this.issueDateVal = this.dateValidityCheck(this.invoiceUnderEdit.issueDate);
    this.dueDateVal = this.dateValidityCheck(this.invoiceUnderEdit.dueDate);
    this.payDateVal = this.dateValidityCheck(this.invoiceUnderEdit.payDate);
    this.chosenVendor = this.vendorsService.getVendorIndex(
      this.vendorsService.getVendorById(this.invoiceUnderEdit.clientID)
    );

    this.addInvoiceForm = new FormGroup({
      invoiceNum: new FormControl(this.invoiceUnderEdit.invoiceNum),
      issueDate: new FormControl(this.issueDateVal),
      issuePlace: new FormControl(this.invoiceUnderEdit.issuePlace),
      deliveryMethod: new FormControl(this.invoiceUnderEdit.deliveryMethod),
      reciver: new FormControl(this.invoiceUnderEdit.reciver),
      payer: new FormControl(this.invoiceUnderEdit.payer),
      seller: new FormControl(this.invoiceUnderEdit.seller),
      assName: new FormControl(this.invoiceUnderEdit.assName),
      assQty: new FormControl(this.invoiceUnderEdit.assQty),
      assJm: new FormControl(this.invoiceUnderEdit.assjm),
      netPrice: new FormControl(
        this.invoiceUnderEdit.netPrice / this.invoiceUnderEdit.assQty
      ),
      VAT: new FormControl(this.invoiceUnderEdit.VAT * 100),
      issuedBy: new FormControl(this.invoiceUnderEdit.issuedBy),
      recived: new FormControl(this.invoiceUnderEdit.recived),
      comments: new FormControl(this.invoiceUnderEdit.comments),
      dueDate: new FormControl(
        formatDate(new Date(this.invoiceUnderEdit.dueDate), 'yyyy-MM-dd', 'en')
      ),
      cash: new FormControl(),
      card: new FormControl(),
      bank: new FormControl(),
      payDate: new FormControl(
        formatDate(new Date(this.invoiceUnderEdit.payDate), 'yyyy-MM-dd', 'en')
      ),
      vendorID: new FormControl(this.chosenVendor + 1),
    });
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
        ID: this.invoiceUnderEdit.ID,
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
        assQty: Number(this.addInvoiceForm.get('assQty')?.value),
        assjm: String(this.addInvoiceForm.get('assJm')?.value),
        issuedBy: String(this.addInvoiceForm.get('issuedBy')?.value),
        recived: String(this.addInvoiceForm.get('recived')?.value),
        comments: String(this.addInvoiceForm.get('comments')?.value),
        payDate: new Date(String(this.addInvoiceForm.get('payDate')?.value)),
      },
    ]);

    this.invoiceService.deleteInvoice(this.invoiceUnderEdit);
    alert('Faktura edytowana pomyślnie');
    this.addInvoiceForm.reset();

    this.router.navigate(['home']);
  }
  ngOnInit() {
    this.invoiceService.isBeingEdited = false;
    this.vendorsSub = this.vendorsService.vendorsChange.subscribe((val) => {
      this.vendors = val;
    });
  }
}
