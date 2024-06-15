import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditInvoiceComponent } from './edit-invoice.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

describe('EditInvoiceComponent', () => {
  let component: EditInvoiceComponent;
  let fixture: ComponentFixture<EditInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, ReactiveFormsModule, EditInvoiceComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EditInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with invoice data', () => {
    const invoice = {
      ID: 1,
      invoiceNum: '123',
      issueDate: new Date('2023-01-01'),
      issuePlace: 'Place',
      deliveryMethod: 'Method',
      reciver: 'Reciver',
      payer: 'Payer',
      seller: 'Seller',
      assName: 'Item',
      assQty: 10,
      assjm: 'pcs',
      netPrice: 1000,
      VAT: 0.23,
      issuedBy: 'Issuer',
      recived: 'Recived',
      comments: 'Comments',
      dueDate: new Date('2023-02-01'),
      payDate: new Date('2023-02-15'),
      paymentMethod: '',
      currency: '',
      issuerID: 0,
      clientID: 1,
      materialName: '',
      amount: '',
      invoiceType: '',
    };

    component.invoiceUnderEdit = invoice;
    component.ngOnInit();

    expect(component.addInvoiceForm.get('invoiceNum')?.value).toBe(
      invoice.invoiceNum
    );
    expect(component.addInvoiceForm.get('issueDate')?.value).toBe(
      '2023-01-01' || undefined
    );
    expect(component.addInvoiceForm.get('netPrice')?.value).toBe(
      invoice.netPrice / invoice.assQty
    );
    expect(component.addInvoiceForm.get('VAT')?.value).toBe(invoice.VAT * 100);
  });

  it('should format dates correctly in dateValidityCheck', () => {
    const validDate = new Date('2023-01-01');
    const invalidDate = 'invalid-date';
    expect(component.dateValidityCheck(validDate)).toBe('2023-01-01');
    expect(component.dateValidityCheck(invalidDate)).toBeUndefined();
  });

  it('should reset the form after submission', () => {
    component.addInvoiceForm.get('invoiceNum')?.setValue('123');
    component.onSubmit();

    expect(component.addInvoiceForm.pristine).toBeTrue();
    expect(component.addInvoiceForm.untouched).toBeTrue();
  });

  it('should handle payment methods correctly', () => {
    component.addInvoiceForm.get('cash')?.setValue(true);
    component.addInvoiceForm.get('card')?.setValue(true);
    component.addInvoiceForm.get('bank')?.setValue(true);
    component.onSubmit();
    expect(component.addInvoiceForm.get('cash')?.value).toBeTrue();
    expect(component.addInvoiceForm.get('card')?.value).toBeTrue();
    expect(component.addInvoiceForm.get('bank')?.value).toBeTrue();
  });

  it('should not submit the form if it is invalid', () => {
    component.addInvoiceForm.get('invoiceNum')?.setValue('');
    component.onSubmit();

    expect(component.addInvoiceForm.valid).toBeFalse();
  });

  it('should set isBeingEdited to false on init', () => {
    component.ngOnInit();
    expect(component.invoiceService.isBeingEdited).toBeFalse();
  });

  it('should set vendors array on init', () => {
    component.ngOnInit();
    expect(component.vendors).toEqual([]);
  });
});
