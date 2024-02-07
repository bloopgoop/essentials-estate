import PropertyPhoto from "./propertyPhoto";
/*
status: 0 = pending, 1 = approved, 2 = denied
*/

export interface Property {
  id: number;
  owner: string;
  ownerID: number;
  address: string;
  city: string;
  state: string;
  zip: string;
  rent: number;
  title: string;
  description: string;
  bedrooms: number;
  bathrooms: number;
  garage: number;
  sqft: number;
  lotsize: number;
  stars: number;
  type: string;
  photos: PropertyPhoto[];
  status: 0 | 1 | 2;
  is_rentable: boolean;
}
