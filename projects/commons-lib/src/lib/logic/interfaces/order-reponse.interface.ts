export interface OrderResponse {
    userId: string;
    total_amount: number;
    created_at: string; 
    updated_at: string;
    products: {
        [productId: string]: number;
    };
}