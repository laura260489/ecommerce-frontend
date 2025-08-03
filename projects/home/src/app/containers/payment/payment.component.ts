import { Component, OnInit } from '@angular/core';
import { selectCartProducts } from '@commons-lib';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  products$ = this.store.select(selectCartProducts);

  constructor(private store: Store) { }

  ngOnInit() {
    console.log(this.products$)
  }

}
