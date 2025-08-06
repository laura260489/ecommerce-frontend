import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CategoriesComponent } from './categories.component';
import { Category } from '@commons-lib';

describe('CategoriesComponent', () => {
  let component: CategoriesComponent;
  let fixture: ComponentFixture<CategoriesComponent>;
  let httpTestingController: HttpTestingController;
  let mockRouter: jest.Mocked<Router>;

  const mockCategories: Category[] = [
    { id: '1', name: 'Electrónicos', description: 'Dispositivos electrónicos', status: 'ACTIVE' },
    { id: '2', name: 'Ropa', description: 'Vestimenta y accesorios', status: 'ACTIVE' },
    { id: '3', name: 'Hogar', description: 'Artículos para el hogar', status: 'ACTIVE' }
  ];

  beforeEach(async () => {
    const routerSpy = {
      navigate: jest.fn()
    };

    await TestBed.configureTestingModule({
      declarations: [CategoriesComponent],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: Router, useValue: routerSpy }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(CategoriesComponent);
    component = fixture.componentInstance;
    httpTestingController = TestBed.inject(HttpTestingController);
    mockRouter = TestBed.inject(Router) as jest.Mocked<Router>;

    Object.defineProperty(process, 'env', {
      value: {
        urlBase: 'http://localhost:3000/api/'
      }
    });
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty categories array', () => {
    expect(component.categories).toEqual([]);
  });

  it('should load categories on init', () => {
    component.ngOnInit();

    const req = httpTestingController.expectOne('http://localhost:3000/api/list-categories');
    expect(req.request.method).toBe('GET');
    req.flush(mockCategories);

    expect(component.categories).toEqual(mockCategories);
    expect(component.categories.length).toBe(3);
  });

  it('should handle error when loading categories', () => {
    jest.spyOn(console, 'error').mockImplementation();

    component.ngOnInit();

    const req = httpTestingController.expectOne('http://localhost:3000/api/list-categories');
    req.error(new ErrorEvent('Network error'));

    expect(component.categories).toEqual([]);
  });

  it('should navigate to category when goToCategory is called', () => {
    const categorySlug = 'electronics';

    component.goToCategory(categorySlug);

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/categorias', categorySlug]);
  });

  it('should navigate to category with different slug', () => {
    const categorySlug = 'ropa';

    component.goToCategory(categorySlug);

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/categorias', categorySlug]);
  });

  it('should make HTTP request with correct URL', () => {
    component.ngOnInit();

    const req = httpTestingController.expectOne('http://localhost:3000/api/list-categories');
    expect(req.request.url).toBe('http://localhost:3000/api/list-categories');
    expect(req.request.method).toBe('GET');
    
    req.flush(mockCategories);
  });

  it('should update categories array when HTTP request succeeds', () => {
    const newCategories = [
      { id: '4', name: 'Deportes', description: 'Artículos deportivos', status: 'ACTIVE' },
      { id: '5', name: 'Libros', description: 'Libros y literatura', status: 'ACTIVE' }
    ];

    component.ngOnInit();

    const req = httpTestingController.expectOne('http://localhost:3000/api/list-categories');
    req.flush(newCategories);

    expect(component.categories).toEqual(newCategories);
    expect(component.categories.length).toBe(2);
  });

  it('should handle empty categories response', () => {
    component.ngOnInit();

    const req = httpTestingController.expectOne('http://localhost:3000/api/list-categories');
    req.flush([]);

    expect(component.categories).toEqual([]);
    expect(component.categories.length).toBe(0);
  });

  it('should call goToCategory with correct parameter when category is clicked', () => {
    jest.spyOn(component, 'goToCategory');
    const testSlug = 'test-category';

    component.goToCategory(testSlug);

    expect(component.goToCategory).toHaveBeenCalledWith(testSlug);
  });
});