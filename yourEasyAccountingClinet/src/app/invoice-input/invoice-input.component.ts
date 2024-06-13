import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { VendorService } from '../shared/vendor.service';

@Component({
  selector: 'app-invoice-input',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './invoice-input.component.html',
  styleUrl: './invoice-input.component.css',
})
export class InvoiceInputComponent {
  constructor(private vendSer: VendorService) {
    this.addClient = new FormGroup({
      name: new FormControl(),
      NIP: new FormControl(),
      address: new FormControl(),
      phone: new FormControl(),
      email: new FormControl(),
      comments: new FormControl(),
    });
  }

  onSubmit() {
    this.vendSer.addVendor({
      ID: this.vendSer.getVendorNextIndex(),
      name: String(this.addClient.get('name')?.value),
      NIP: String(this.addClient.get('NIP')?.value),
      address: String(this.addClient.get('address')?.value),
      phone: String(this.addClient.get('phone')?.value),
      comments: String(this.addClient.get('comments')?.value),
    });
    alert('Dodano podmiot');
    this.addClient.reset();
  }

  addClient: FormGroup;
}
