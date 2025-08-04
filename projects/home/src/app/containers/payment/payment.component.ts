import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { clearCart, ModalInformationService, selectCartProducts, selectCartTotalPrice } from '@commons-lib';
import { Store } from '@ngrx/store';
import { combineLatest, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent {

  public disablePayment: boolean = true;

  products$ = this.store.select(selectCartProducts);
  total$ = this.store.select(selectCartTotalPrice);

  private destroy$ = new Subject<void>();

  constructor(private store: Store, private readonly modalInformationService: ModalInformationService, private router: Router, private http: HttpClient,) { }


  goPay() {

    combineLatest([this.products$, this.total$])
      .pipe(takeUntil(this.destroy$)).subscribe(([productsData, total]) => {
        const body = {
          userId: "3e183a18-715b-11f0-85c7-a20814e8f805",
          total_amount: total,
          products: productsData.reduce((acc, product) => {
            acc[product.id] = product.quantity;
            return acc;
          }, {})
        }
        this.http.post<any>(
          process.env['urlBase'] + 'create-order',
          body,
          {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
          }
        ).subscribe({
          next: (response) => {
            if (response) this.showModal();
          },
          error: (error) => {
            console.log(error)
          }
        });
      });

  }
  public showModal(): void {
    this.modalInformationService.setConfigModal({
      message: "Pago exitoso",
      showButton: true,
      buttonConfig: {
        label: "Volver a inicio",
        navigate: "/"
      }
    });
  }

  public modalClose(event: boolean) {
    this.modalInformationService.setConfigModal(null);
    this.store.dispatch(clearCart());
  }

  public navigateToCategories() {
    this.router.navigate(['/categorias'])
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }


}
