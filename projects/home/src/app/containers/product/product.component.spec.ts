import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import { ProductComponent } from './product.component';
import { addToCart, ProductResponse } from '@commons-lib';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;
  let httpTestingController: HttpTestingController;
  let mockStore: jest.Mocked<Store>;
  let mockActivatedRoute: any;

  const mockProduct: ProductResponse = {
    id: '1',
    title: 'Producto Test',
    description: 'Descripción test',
    price: 100,
    discount_percentage: 0,
    stock: 15,
    status: 'ACTIVE',
    categories: ['test']
  };

  beforeEach(async () => {
    const storeSpy = {
      dispatch: jest.fn()
    };

    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: jest.fn()
        }
      }
    };

    await TestBed.configureTestingModule({
      declarations: [ProductComponent],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: Store, useValue: storeSpy },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    httpTestingController = TestBed.inject(HttpTestingController);
    mockStore = TestBed.inject(Store) as jest.Mocked<Store>;

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
    expect(component.producto).toBeNull();
    expect(component.data).toEqual([]);
    expect(component.quantities).toEqual([]);
    expect(component.stock).toBe(0);
    expect(component.selectedQuantity).toBeNull();
    expect(component.images).toEqual([
      'https://img.freepik.com/vector-premium/no-hay-foto-disponible-icono-vector-simbolo-imagen-predeterminado-imagen-proximamente-sitio-web-o-aplicacion-movil_87543-10615.jpg'
    ]);
  });

  it('should load product on init when id is present', () => {
    mockActivatedRoute.snapshot.paramMap.get.mockReturnValue('1');

    component.ngOnInit();

    const req = httpTestingController.expectOne('http://localhost:3000/api/product?id=1');
    expect(req.request.method).toBe('GET');
    req.flush(mockProduct);

    expect(component.producto).toEqual(mockProduct);
    expect(component.stock).toBe(15);
    expect(component.data).toEqual([]);
  });

  it('should not make HTTP request when id is not present', () => {
    mockActivatedRoute.snapshot.paramMap.get.mockReturnValue(null);

    component.ngOnInit();

    httpTestingController.expectNone('http://localhost:3000/api/product');
  });

  it('should generate correct quantities for stock less than 6', () => {
    const productWithLowStock = { ...mockProduct, stock: 3 };
    mockActivatedRoute.snapshot.paramMap.get.mockReturnValue('1');

    component.ngOnInit();

    const req = httpTestingController.expectOne('http://localhost:3000/api/product?id=1');
    req.flush(productWithLowStock);

    expect(component.quantities).toEqual([
      { label: '1 unidad', value: 1 },
      { label: '2 unidades', value: 2 },
      { label: '3 unidades', value: 3 }
    ]);
  });

  it('should generate max 6 quantities for high stock', () => {
    const productWithHighStock = { ...mockProduct, stock: 20 };
    mockActivatedRoute.snapshot.paramMap.get.mockReturnValue('1');

    component.ngOnInit();

    const req = httpTestingController.expectOne('http://localhost:3000/api/product?id=1');
    req.flush(productWithHighStock);

    expect(component.quantities).toHaveLength(6);
    expect(component.quantities[0]).toEqual({ label: '1 unidad', value: 1 });
    expect(component.quantities[5]).toEqual({ label: '6 unidades', value: 6 });
  });

  it('should handle HTTP error when loading product', () => {
    mockActivatedRoute.snapshot.paramMap.get.mockReturnValue('1');

    component.ngOnInit();

    const req = httpTestingController.expectOne('http://localhost:3000/api/product?id=1');
    req.error(new ErrorEvent('Network error'));

    expect(component.producto).toBeNull();
  });

  it('should return true for inStock when product has stock', () => {
    component.producto = { ...mockProduct, stock: 5 };

    expect(component.inStock).toBe(true);
  });

  it('should return false for inStock when product has no stock', () => {
    component.producto = { ...mockProduct, stock: 0 };

    expect(component.inStock).toBe(false);
  });

  it('should return false for inStock when product is null', () => {
    component.producto = null;

    expect(component.inStock).toBe(false);
  });

  it('should add product to cart with selected quantity', () => {
    const mockProductToAdd = { id: '1', title: 'Test Product', price: 100 };
    component.selectedQuantity = { label: '3 unidades', value: 3 };
    jest.spyOn(console, 'log').mockImplementation();

    component.addProduct(mockProductToAdd);

    expect(console.log).toHaveBeenCalledWith(mockProductToAdd);
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      addToCart({ product: mockProductToAdd, quantity: 3 })
    );
  });

  it('should add product to cart with default quantity when none selected', () => {
    const mockProductToAdd = { id: '1', title: 'Test Product', price: 100 };
    component.selectedQuantity = null;
    jest.spyOn(console, 'log').mockImplementation();

    component.addProduct(mockProductToAdd);

    expect(mockStore.dispatch).toHaveBeenCalledWith(
      addToCart({ product: mockProductToAdd, quantity: 1 })
    );
  });

  it('should handle zero stock correctly', () => {
    const productWithZeroStock = { ...mockProduct, stock: 0 };
    mockActivatedRoute.snapshot.paramMap.get.mockReturnValue('1');

    component.ngOnInit();

    const req = httpTestingController.expectOne('http://localhost:3000/api/product?id=1');
    req.flush(productWithZeroStock);

    expect(component.quantities).toEqual([]);
    expect(component.stock).toBe(0);
  });

  it('should filter and map product data correctly', () => {
    const productWithExtraFields = {
      ...mockProduct,
      brand: 'Test Brand',
      weight: '1kg',
      warrantyInformation: '1 año',
      extraField: 'should not appear',
      anotherField: 'also should not appear'
    };
    mockActivatedRoute.snapshot.paramMap.get.mockReturnValue('1');

    component.ngOnInit();

    const req = httpTestingController.expectOne('http://localhost:3000/api/product?id=1');
    req.flush(productWithExtraFields);

    expect(component.data).toHaveLength(3);
    expect(component.data).toEqual([
      { campo: 'brand', valor: 'Test Brand' },
      { campo: 'weight', valor: '1kg' },
      { campo: 'warrantyInformation', valor: '1 año' }
    ]);
  });
});