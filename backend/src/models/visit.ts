export interface Visit {
  id?: number;
  userId: number;
  placeId: number;
  visitDate?: Date;
  globalRating?: number;
  comment?: string;
  createdAt?: Date;
}
