import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-invoice-input',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './invoice-input.component.html',
  styleUrl: './invoice-input.component.css',
})
export class InvoiceInputComponent {
  constructor() {
    this.addInvoice = new FormGroup({
      invoiceID: new FormControl(),
      issueDate: new FormControl(),
      issuePlace: new FormControl(),
      issues: new FormControl(),
    });
  }
  addInvoice: FormGroup;
}
