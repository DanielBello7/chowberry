export type DTO<T> = Omit<T, 'createdAt' | 'updatedAt' | '_id'>;
