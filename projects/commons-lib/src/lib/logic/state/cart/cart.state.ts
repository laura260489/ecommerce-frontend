export interface Product {
    id: number;
    title: string;
    price: number;
}

export interface CartProduct extends Product {
    quantity: number;
}

export interface CartState {
    products: CartProduct[];
}

const savedProducts = sessionStorage.getItem('cartProducts');

export const initialCartState: CartState = {
    products: savedProducts ? JSON.parse(savedProducts) : [],
};
