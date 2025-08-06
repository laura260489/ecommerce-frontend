import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AppComponent } from './app.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let httpMock: HttpTestingController;
  let router: Router;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: '', component: AppComponent },
          { path: 'producto/:id', component: AppComponent },
          { path: 'pago', component: AppComponent }
        ]),
        HttpClientTestingModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        provideMockStore({})
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);
    store = TestBed.inject(Store) as MockStore;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'shell'`, () => {
    expect(component.title).toEqual('shell');
  });

  it('should initialize observables and call ngOnInit', () => {
    store.overrideSelector('selectUser', null);
    store.overrideSelector('selectCartProducts', []);
    store.overrideSelector('selectCartTotalQuantity', 0);
    
    jest.spyOn(component.user$, 'subscribe');
    jest.spyOn(component.totalQuantity$, 'subscribe');
    
    component.ngOnInit();
    
    expect(component.user$).toBeDefined();
    expect(component.totalQuantity$).toBeDefined();
  });

  it('should set user menu items when user is null', () => {
    component.ngOnInit();
    
    expect(component.userMenuItems).toBeDefined();
    expect(Array.isArray(component.userMenuItems)).toBeTruthy();
  });

  it('should set user menu items when user is admin', () => {
    component.ngOnInit();
    
    expect(component.userMenuItems).toBeDefined();
    expect(Array.isArray(component.userMenuItems)).toBeTruthy();
  });

  it('should update total quantity from store', () => {
    component.ngOnInit();
    
    expect(component.totalQuantity).toBeDefined();
    expect(typeof component.totalQuantity).toBe('number');
  });

  it('should perform search and update items', () => {
    const mockResponse = { content: [{ id: 1, title: 'Product 1' }] };
    const searchEvent = { query: 'test product' };
    
    component.search(searchEvent);
    
    const req = httpMock.expectOne(request => 
      request.url.includes('search-product') && 
      request.params.get('title') === 'test product'
    );
    
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
    
    expect(component.items).toEqual(mockResponse.content);
  });

  it('should handle search error and set empty items', () => {
    const searchEvent = { query: 'test product' };
    
    component.search(searchEvent);
    
    const req = httpMock.expectOne(request => 
      request.url.includes('search-product')
    );
    
    req.flush('Error', { status: 500, statusText: 'Server Error' });
    
    expect(component.items).toEqual([]);
  });

  it('should navigate to product on product select', () => {
    jest.spyOn(router, 'navigate');
    const selectedProduct = { id: 123, title: 'Test Product' };
    
    component.onProductSelect(selectedProduct);
    
    expect(component.value).toBe(selectedProduct);
    expect(router.navigate).toHaveBeenCalledWith(['/producto', 123]);
  });

  it('should navigate to payment', () => {
    jest.spyOn(router, 'navigate');
    
    component.navigateToPayment();
    
    expect(router.navigate).toHaveBeenCalledWith(['/pago']);
  });

  it('should navigate to shopping', () => {
    jest.spyOn(router, 'navigate');
    
    component.navigateShopping();
    
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });
});
