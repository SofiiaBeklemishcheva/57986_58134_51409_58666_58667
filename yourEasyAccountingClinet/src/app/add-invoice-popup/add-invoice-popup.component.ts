import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-invoice-popup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-invoice-popup.component.html',
  styleUrl: './add-invoice-popup.component.css',
})
export class AddInvoicePopupComponent {
  constructor() {
    this.addInvoice = new FormGroup({
      username: new FormControl(),
      password: new FormControl(),
    });
  }
  addInvoice: FormGroup;

  onSubmit() {}
}
