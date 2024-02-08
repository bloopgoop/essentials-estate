export interface Rating {
    id: number;
    user: string;
    userID: number;
    propertyID: number;
    stars: 0 | 1 | 2 | 3 | 4 | 5;
    comment: string;
    date: string;
    same_user: boolean;
}