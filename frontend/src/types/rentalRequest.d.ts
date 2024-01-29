export interface RentalRequest {
    id: number;
    propertyID: number;
    user: string;
    userID: number;
    date: string;
    approved: boolean;
    is_active: boolean;
}