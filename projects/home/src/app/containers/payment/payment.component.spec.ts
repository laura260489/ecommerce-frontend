import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of, Subject } from 'rxjs';
import { PaymentComponent } from './payment.component';
import { ModalInformationService, clearCart, DiscountResponse, User } from '@commons-lib';

describe('PaymentComponent', () => {
  let component: PaymentComponent;
  let fixture: ComponentFixture<PaymentComponent>;
  let httpTestingController: HttpTestingController;
  let mockStore: jest.Mocked<Store>;
  let mockModalService: jest.Mocked<ModalInformationService>;
  let mockRouter: jest.Mocked<Router>;

  const mockProducts = [
    { id: 1, title: 'Producto 1', price: 100, quantity: 2 },
    { id: 2, title: 'Producto 2', price: 50, quantity: 1 }
  ];

  const mockUser: User = {
    id: '1',
    firstName: 'Test',
    lastName: 'User',
    sub: 'test-sub',
    frecuent: true,
    role: ['user']
  };

  const mockDiscounts: DiscountResponse[] = [
    { 
      id: '1', 
      description: 'Descuento general', 
      percentage: 10, 
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      status: 'ACTIVE'
    },
    { 
      id: '2', 
      description: 'Descuento cliente frecuente', 
      percentage: 5,
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      status: 'ACTIVE'
    }
  ];

  beforeEach(async () => {
    const storeSpy = {
      select: jest.fn(),
      dispatch: jest.fn()
    };
    const modalSpy = {
      setConfigModal: jest.fn()
    };
    const routerSpy = {
      navigate: jest.fn()
    };

    await TestBed.configureTestingModule({
      declarations: [PaymentComponent],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: Store, useValue: storeSpy },
        { provide: ModalInformationService, useValue: modalSpy },
        { provide: Router, useValue: routerSpy }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(PaymentComponent);
    component = fixture.componentInstance;
    httpTestingController = TestBed.inject(HttpTestingController);
    mockStore = TestBed.inject(Store) as jest.Mocked<Store>;
    mockModalService = TestBed.inject(ModalInformationService) as jest.Mocked<ModalInformationService>;
    mockRouter = TestBed.inject(Router) as jest.Mocked<Router>;

    mockStore.select.mockImplementation((selector: any) => {
      const selectorStr = selector?.toString() || '';
      if (selectorStr.includes('selectCartProducts') || selector === 'cartProducts') {
        return of(mockProducts);
      }
      if (selectorStr.includes('selectCartTotalPrice') || selector === 'cartTotalPrice') {
        return of(250);
      }
      if (selectorStr.includes('selectUser') || selector === 'user') {
        return of(mockUser);
      }
      return of(null);
    });
    if (!process.env) {
      (global as any).process = { env: {} };
    }
    process.env['urlBase'] = 'http://localhost:3000/api/';
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.disablePayment).toBe(true);
    expect(component.discounts).toEqual([]);
    expect(component.totalPaymentDiscount).toBe(0);
    expect(component.imgBase).toBeDefined();
  });



  it('should handle discount loading error', () => {
    jest.spyOn(console, 'log').mockImplementation();

    component.ngOnInit();

    const req = httpTestingController.expectOne('http://localhost:3000/api/active-discount');
    req.error(new ErrorEvent('Network error'));

    expect(component.discounts).toEqual([]);
  });



  it('should configure modal correctly in showModal', () => {
    component.showModal();

    expect(mockModalService.setConfigModal).toHaveBeenCalledWith({
      message: "Pago exitoso",
      showButton: true,
      buttonConfig: {
        label: "Volver a inicio",
        navigate: "/"
      }
    });
  });

  it('should close modal and clear cart in modalClose', () => {
    component.modalClose(true);

    expect(mockModalService.setConfigModal).toHaveBeenCalledWith(null);
    expect(mockStore.dispatch).toHaveBeenCalledWith(clearCart());
  });

  it('should navigate to categories', () => {
    component.navigateToCategories();

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/categorias']);
  });

  it('should cleanup on destroy', () => {
    jest.spyOn(component['destroy$'], 'next').mockImplementation();
    jest.spyOn(component['destroy$'], 'complete').mockImplementation();

    component.ngOnDestroy();

    expect(component['destroy$'].next).toHaveBeenCalled();
    expect(component['destroy$'].complete).toHaveBeenCalled();
  });


});