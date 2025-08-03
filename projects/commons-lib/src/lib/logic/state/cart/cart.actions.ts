import { createAction, props } from '@ngrx/store';
import { Product } from './cart.state';


export const addToCart = createAction(
    '[Cart] Add Product',
    props<{ product: Product; quantity: number }>()
);
export const removeFromCart = createAction(
    '[Cart] Remove Product',
    props<{ productId: number }>()
);
