export interface User {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    date_joined: Date;
    is_superuser: boolean;
    last_login: Date;
    email: string;
}