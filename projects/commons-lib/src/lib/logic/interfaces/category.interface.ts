type CategoryStatus = 'ACTIVE' | 'INACTIVE';

export interface Category {
    id: string;
    name: string;
    description: string;
    status: CategoryStatus;
}