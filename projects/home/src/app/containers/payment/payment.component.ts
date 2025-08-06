import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { clearCart, DiscountResponse, IMG_BASE, ModalInformationService, selectCartProducts, selectCartTotalPrice, selectUser, User } from '@commons-lib';
import { Store } from '@ngrx/store';
import { catchError, combineLatest, map, of, Subject, switchMap, takeUntil } from 'rxjs';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  public disablePayment: boolean = true;

  products$ = this.store.select(selectCartProducts);
  total$ = this.store.select(selectCartTotalPrice);

  public discounts: any[] = [];

  public totalPaymentDiscount: number = 0;

  public imgBase = IMG_BASE;

  public showSuccess: boolean = false;

  private destroy$ = new Subject<void>();

  private userId: string = "";

  user$ = this.store.select(selectUser);

  constructor(private store: Store, private readonly modalInformationService: ModalInformationService, private router: Router, private http: HttpClient,) { }

  
  ngOnInit(): void {
    combineLatest([this.user$, this.total$])
      .pipe(
        takeUntil(this.destroy$),
        switchMap(([user, total]) => {
          this.userId = user?.id ? user.id : this.userId;
          const isFromRandomOrder = JSON.parse(sessionStorage.getItem('isFromRandomOrder') || 'false');

          return this.http.get<DiscountResponse[]>(`${process.env["urlBase"]}active-discount`).pipe(
            map((discounts) => {
              const filtered = discounts
                .filter(discount => {
                  if (!user?.frecuent && discount.description.includes('frecuente')) {
                    return false;
                  }
                  if (!isFromRandomOrder && discount.description.includes('aleatorio')) {
                    return false;
                  }
                  return true;
                })
                .map(discount => ({
                  description: discount.description,
                  value: discount.percentage
                }));

              this.discounts = filtered;

              const totalDiscount = filtered.reduce((acc, d) => acc + d.value, 0);
              this.totalPaymentDiscount = total - (total * (totalDiscount / 100));
            }),
            catchError(err => {
              return of();
            })
          );
        })
      )
      .subscribe();
  }

  goPay() {
    combineLatest([this.products$, this.total$])
      .pipe(takeUntil(this.destroy$)).subscribe(([productsData, total]) => {
        const body = {
          userId: this.userId,
          total_amount: this.totalPaymentDiscount != 0 ? this.totalPaymentDiscount : total,
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
            if (response) {
              sessionStorage.setItem('isFromRandomOrder', 'false');
              this.showSuccess = true;
              this.showModal();
            };
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

  public navigateToLogin() {
    this.router.navigate(['/auth'])
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }


}
