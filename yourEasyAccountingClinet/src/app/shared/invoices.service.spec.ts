import { TestBed } from '@angular/core/testing';
import { InvoicesService } from './invoices.service';
import { AuthService } from './auth.service';
import { Invoice } from './interfaces';
import { BehaviorSubject } from 'rxjs';

describe('InvoicesService', () => {
  let service: InvoicesService;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    const authSpy = jasmine.createSpyObj('AuthService', ['getUser']);
    await TestBed.configureTestingModule({
      providers: [InvoicesService, { provide: AuthService, useValue: authSpy }],
    }).compileComponents();

    service = TestBed.inject(InvoicesService);
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with predefined invoices', () => {
    expect(service.getInvoices().length).toBe(4);
  });

  it('should add a new invoice', () => {
    const newInvoice: Invoice = {
      ID: 5,
      invoiceNum: '202405',
      issueDate: new Date('2024-06-08'),
      paymentMethod: 'credit card',
      currency: 'PLN',
      netPrice: 2000,
      VAT: 0.23,
      issuerID: 1004,
      clientID: 816387525429,
      materialName: 'Monitor LG UltraWide',
      amount: '2',
      dueDate: new Date('2024-06-23'),
      invoiceType: 'do zapłaty',
      issuePlace: 'Wrocław',
      deliveryMethod: 'kurier',
      reciver: 'Katarzyna Zielińska',
      payer: 'Firma DEF Sp. z o.o.',
      seller: 'Sklep Elektroniczny "Tech Store"',
      assName: 'Monitor LG UltraWide',
      assjm: 'szt.',
      issuedBy: 'Robert Lewandowski',
      recived: 'Katarzyna Zielińska',
      comments: 'Zakup monitorów.',
      payDate: new Date('2024-06-20'),
    };

    service.addInvoice([newInvoice]);
    expect(service.getInvoices().length).toBe(5);
    expect(
      service.getInvoices().some((invoice) => invoice.ID === 5)
    ).toBeTrue();
  });

  it('should delete an invoice', () => {
    const initialLength = service.getInvoices().length;
    const invoiceToDelete = service.getInvoices()[0];
    service.deleteInvoice(invoiceToDelete);
    expect(service.getInvoices().length).toBe(initialLength - 1);
    expect(
      service.getInvoices().some((invoice) => invoice.ID === invoiceToDelete.ID)
    ).toBeFalse();
  });

  it('should declare an invoice as being edited', () => {
    const invoiceToEdit = service.getInvoices()[1];
    service.declareAsEdited(invoiceToEdit);
    expect(service.invoiceIdUnderEdit).toBe(1);
  });

  it('should generate a new invoice ID', () => {
    const newId = service.getInvoiceNextIndex();
    expect(newId).toBeGreaterThan(0);
  });

  it('should alert "Funkcjonalność w produkcji" when comingSoon is called', () => {
    spyOn(window, 'alert');
    service.comingSoon();
    expect(window.alert).toHaveBeenCalledWith('Funkcjonalność w produkcji');
  });
});
