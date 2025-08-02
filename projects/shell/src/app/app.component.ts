import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { selectUser } from '@commons-lib';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'shell';

  public value: any = '';
  public items: any[] = [];
  public categories: any[] = [];
  public loading: boolean;
  public userMenuItems: any[] = [];

  user$ = this.store.select(selectUser);

  constructor(private router: Router, private http: HttpClient, private store: Store) { }

  ngOnInit() {
    this.user$.subscribe((user) => {
      if (user != null) {
        this.userMenuItems = [
          { label: 'Mi cuenta', icon: 'pi pi-user', command: () => this.router.navigate(['/portal-usuario/mi-cuenta']) },
          { label: 'Cerrar sesión', icon: 'pi pi-sign-out', command: () => this.router.navigate(['/auth']) },
        ]
        if (user.role == 'admin') this.userMenuItems.push(
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
    });
  }

  public search(event: any) {
    this.http.get<any>('https://dummyjson.com/products/search?q=' + event.query + '&limit=6').subscribe({
      next: (data) => {
        this.items = data.products
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

}
