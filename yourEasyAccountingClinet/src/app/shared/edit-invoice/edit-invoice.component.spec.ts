import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditInvoiceComponent } from './edit-invoice.component';
import { VendorService } from '../vendor.service';
import { InvoicesService } from '../invoices.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { of } from 'rxjs';

describe('EditInvoiceComponent', () => {
  let component: EditInvoiceComponent;
  let fixture: ComponentFixture<EditInvoiceComponent>;
  let mockVendorService: jasmine.SpyObj<VendorService>;
  let mockInvoiceService: jasmine.SpyObj<InvoicesService>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockVendorService = jasmine.createSpyObj('VendorService', [
      'vendorsChange',
    ]);
    mockInvoiceService = jasmine.createSpyObj('InvoicesService', [
      'getInvoices',
      'addInvoice',
      'deleteInvoice',
    ]);
    mockAuthService = jasmine.createSpyObj('AuthService', ['getUser']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    mockInvoiceService.getInvoices.and.returnValue([
      {
        ID: 1,
        invoiceNum: '123',
        issueDate: new Date('2023-02-01'),
        issuePlace: 'Place',
        deliveryMethod: 'Method',
        reciver: 'Reciver',
        payer: 'Payer',
        seller: 'Seller',
        assName: 'Item',
        assQty: 10,
        assjm: 'pcs',
        netPrice: 100,
        VAT: 0.23,
        issuedBy: 'Issuer',
        recived: 'Recived',
        comments: 'Comments',
        dueDate: new Date('2023-02-01'),
        payDate: new Date('2023-02-01'),
        paymentMethod: '',
        currency: '',
        issuerID: 0,
        clientID: 0,
        materialName: '',
        amount: '',
        invoiceType: '',
      },
    ]);
    mockInvoiceService.invoiceIdUnderEdit = 0;
    mockAuthService.getUser.and.returnValue({
      ID: 2,
      albumId: 5,
      name: 'test',
      surname: 'Test',
      nickname: 'Testowy',
      access: 2,
    });

    await TestBed.configureTestingModule({
      imports: [CommonModule, ReactiveFormsModule],
      declarations: [EditInvoiceComponent],
      providers: [
        { provide: VendorService, useValue: mockVendorService },
        { provide: InvoicesService, useValue: mockInvoiceService },
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with invoice data', () => {
    const invoice =
      mockInvoiceService.getInvoices()[mockInvoiceService.invoiceIdUnderEdit];
    expect(component.addInvoiceForm.get('invoiceNum')?.value).toBe(
      invoice.invoiceNum
    );
    expect(component.addInvoiceForm.get('issueDate')?.value).toBe('2023-01-01');
    expect(component.addInvoiceForm.get('netPrice')?.value).toBe(
      invoice.netPrice / invoice.assQty
    );
    expect(component.addInvoiceForm.get('VAT')?.value).toBe(invoice.VAT * 100);
    // Add other form fields checks here
  });

  it('should submit the form and call addInvoice and deleteInvoice methods', () => {
    spyOn(window, 'alert');
    component.onSubmit();
    expect(mockInvoiceService.addInvoice).toHaveBeenCalled();
    expect(mockInvoiceService.deleteInvoice).toHaveBeenCalledWith(
      component.invoiceUnderEdit
    );
    expect(window.alert).toHaveBeenCalledWith('Faktura edytowana pomyślnie');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['home']);
  });

  it('should handle payment methods correctly', () => {
    component.addInvoiceForm.get('cash')?.setValue(true);
    component.addInvoiceForm.get('card')?.setValue(true);
    component.addInvoiceForm.get('bank')?.setValue(true);
    component.onSubmit();
    expect(mockInvoiceService.addInvoice).toHaveBeenCalledWith(
      jasmine.arrayContaining([
        jasmine.objectContaining({
          paymentMethod: 'cash card bank',
        }),
      ])
    );
  });

  // Add more tests as necessary
});
