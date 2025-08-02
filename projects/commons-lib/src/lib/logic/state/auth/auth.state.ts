export interface User {
    id: string;
    name: string;
    email: string;
    token: string;
    role: string;
}

export interface AuthState {
    user: User | null;
}

export const initialAuthState: AuthState = {
    user: null,
};