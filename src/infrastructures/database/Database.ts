import { injectable } from "inversify";
import mongoose, { connect } from "mongoose";
import IDatabase, { ListResponse } from "./IDatabase";

@injectable()
export default class Database implements IDatabase {
  async connect(url: string): Promise<void> {
    try {
      await connect(url);
      console.log("Connected to database");
    } catch (error) {
      throw Error("Could not connect to MongoDB");
    }
  }

  async get<T>(
    model: mongoose.Model<T>,
    keyword: string,
    nextCursor: string,
    limit: number
  ): Promise<ListResponse<T>> {
    try {
      const query = keyword
        ? [
            {
              $or: [
                { name: { $regex: new RegExp(keyword, "i") } },
                { tags: { $regex: new RegExp(keyword, "i") } },
              ],
            },
          ]
        : [];

      const animations = nextCursor
        ? await model
            .find({
              ...(query.length > 0 && { $or: query }),
              _id: { $gt: nextCursor },
            })
            .limit(limit + 1)
        : await model
            .find({
              ...(query.length > 0 && { $or: query }),
            })
            .limit(limit + 1);

      let hasNextPage = false;
      if (animations.length === limit + 1) {
        hasNextPage = true;
        animations.pop();
      }

      return {
        items: animations,
        pageInfo: {
          hasNextPage,
          nextCursor: animations[animations.length - 1]?._id?.toString(),
        },
      };
    } catch (error) {
      throw new Error("Failed to get animations" + error.message);
    }
  }

  async getById<T>(model: mongoose.Model<T>, id: string): Promise<T> {
    try {
      const animation = await model.findById(id);
      return animation;
    } catch (error) {
      throw new Error("Failed to get animation" + error.message);
    }
  }

  async create<T>(model: mongoose.Model<T>, data: T): Promise<T> {
    try {
      const animation = new model(data);
      await animation.save();
      return animation;
    } catch (error) {
      throw new Error("Failed to create animation" + error.message);
    }
  }

  async update<T>(
    model: mongoose.Model<T>,
    id: string,
    data: Partial<T>
  ): Promise<T> {
    try {
      const animation = await model.findByIdAndUpdate(id, data, { new: true });
      if (!animation) {
        throw new Error("Animation not found");
      }
      return animation;
    } catch (error) {
      throw new Error("Failed to update animation" + error.message);
    }
  }
}
