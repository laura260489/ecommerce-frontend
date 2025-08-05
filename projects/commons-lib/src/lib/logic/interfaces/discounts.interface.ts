export interface DiscountResponse {
    id: string;
    percentage: number;
    description: string;
    startDate: string; 
    endDate: string; 
    status: 'ACTIVE' | 'INACTIVE';
}