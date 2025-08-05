import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { addToCart, ProductRandom, ProductResponse, selectCartProducts, selectCartTotalQuantity, selectUser } from '@commons-lib';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'shell';

  public totalQuantity = 0;

  public value: any = '';
  public items: any[] = [];
  public categories: any[] = [];
  public loading: boolean;
  public userMenuItems: any[] = [];

  user$ = this.store.select(selectUser);

  products$ = this.store.select(selectCartProducts);

  totalQuantity$ = this.store.select(selectCartTotalQuantity);

  constructor(private router: Router, private http: HttpClient, private store: Store) { }

  ngOnInit() {
    this.user$.subscribe((user) => {
      if (user != null) {
        this.userMenuItems = [
          { label: 'Mi cuenta', icon: 'pi pi-user', command: () => this.router.navigate(['/portal-usuario/mi-cuenta']) },
          { label: 'Cerrar sesión', icon: 'pi pi-sign-out', command: () => this.router.navigate(['/auth']) },
        ]
        if (user.role.includes('admin')) this.userMenuItems.push(
          {
            label: 'Panel de control',
            icon: 'pi pi-cog',
            items: [
              {
                label: 'Administrar usuarios',
                icon: 'pi pi-users',
                command: () => this.router.navigate(['/portal-usuario/panel-control/administracion-usuarios'])
              },
              {
                label: 'Ver reportes',
                icon: 'pi pi-chart-bar',
                command: () => this.router.navigate(['/portal-usuario/panel-control/reportes'])
              }
            ]
          }
        )
      } else {
        this.userMenuItems = [
          { label: 'Iniciar sesión', icon: 'pi pi-sign-in', command: () => this.router.navigate(['/auth']) },
        ];
      }
    })
    this.totalQuantity$.subscribe(total => {
      this.totalQuantity = total;
    });
  }

  public search(event: any) {
    const params = new HttpParams().set('title', event.query);
    this.http.get<any>(process.env['urlBase']+'search-product', { params }).subscribe({
      next: (data) => {
        this.items = data.content;
      },
      error: () => {
        this.items = [];
      }
    });
  }
  public onProductSelect(event: any) {
    const selectedProduct = event;
    this.value = selectedProduct;
    this.router.navigate(['/producto', selectedProduct.id]);
  }

  public navigateToPayment() {
    this.router.navigate(['/pago']);
  }

  public goToRandomOrder() {
    this.http.get<ProductRandom[]>(process.env['urlBase'] + 'product-random').subscribe({
      next: (data) => {
        data.forEach(item => {
          this.store.dispatch(addToCart({ product: item.product, quantity: item.quantity }));
        });
      },
      error: () => {
      }
    });
  }

}
