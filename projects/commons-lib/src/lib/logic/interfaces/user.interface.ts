export interface UserResponse {
    id: string;
    phone: string | null;
    first_name: string;
    last_name: string;
    email: string;
    full_name?: string;
    roles: string[];
}