export interface ProductResponse {
    id: string;
    title: string;
    description: string;
    price: number;
    discount_percentage: number;
    stock: number;
    status: 'ACTIVE' | 'INACTIVE' | string;
    categories: string[];
}
