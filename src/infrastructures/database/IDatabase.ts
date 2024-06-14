import mongoose from "mongoose";

export interface ListResponse<T> {
  items: T[];
  pageInfo: {
    hasNextPage: boolean;
    nextCursor: string | undefined;
  };
}

export default interface IDatabase {
  connect(url: string): Promise<void>;

  get<T>(
    model: mongoose.Model<T>,
    keyword: string,
    nextCursor: string,
    limit: number
  ): Promise<ListResponse<T>>;
  getById<T>(model: mongoose.Model<T>, id: string): Promise<T>;
  create<T>(model: mongoose.Model<T>, data: T): Promise<T>;
  update<T>(model: mongoose.Model<T>, id: string, data: Partial<T>): Promise<T>;
}
