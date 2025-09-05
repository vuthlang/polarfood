export interface Place {
  id?: number;
  name: string;
  postalCode?: string;
  address: string;
  city?: string;
  latitude?: number;
  longitude?: number;
  placeType?: string;
  description?: string;
  categories?: string[];
  createdAt?: string;
}