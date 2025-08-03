import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { clearCart, ModalInformationService, selectCartProducts } from '@commons-lib';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent{

  products$ = this.store.select(selectCartProducts);

  constructor(private store: Store, private readonly modalInformationService: ModalInformationService, private router: Router) { }


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

  public modalClose(event: boolean){
    this.modalInformationService.setConfigModal(null);
    this.store.dispatch(clearCart());
  }

  public navigateToCategories(){
    this.router.navigate(['/categorias'])
  }

}
