import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CartState } from './cart.state';

export const selectCartState = createFeatureSelector<CartState>('cart');

export const selectCartProducts = createSelector(
    selectCartState,
    state => state.products
);

export const selectCartTotalQuantity = createSelector(
    selectCartProducts,
    (products) => products.reduce((total, prod) => total + prod.quantity, 0)
);