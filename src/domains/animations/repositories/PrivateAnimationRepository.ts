import { INTERFACE_TYPE } from "@/config/interface-type";
import Database from "@/infrastructures/database/Database";
import AnimationModel from "@/infrastructures/database/mongoose/schema";
import IFileService from "@/infrastructures/file-service/IFileService";
import { FileUpload } from "graphql-upload-ts";
import { inject, injectable } from "inversify";
import {
  PrivateAnimation,
  PrivateAnimationResponse,
} from "../enities/private-animation";
import IPrivateAnimationRepository from "../interaces/IPrivateAnimationRepository";

@injectable()
export default class PrivateAnimationRepository
  implements IPrivateAnimationRepository
{
  private database: Database;
  private fileService: IFileService;

  constructor(
    @inject(INTERFACE_TYPE.Database) database: Database,
    @inject(INTERFACE_TYPE.FileService) fileService: IFileService
  ) {
    this.database = database;
    this.fileService = fileService;
  }

  async create(
    name: string,
    tags: string[],
    likes: number,
    file: Promise<FileUpload>
  ): Promise<string> {
    try {
      const url = await this.fileService.upload(file);
      const res = await this.database.create<PrivateAnimation>(AnimationModel, {
        name,
        tags,
        likes,
        url,
      });

      return res.id;
    } catch (error) {
      throw new Error("Failed to create animation: " + error.message);
    }
  }

  async update(
    id: string,
    name?: string,
    tags?: string[],
    likes?: number,
    file?: Promise<FileUpload>
  ): Promise<PrivateAnimation> {
    const data = {
      id,
      ...(file && { url: await this.fileService.upload(file) }),
      ...(name && { name }),
      ...(tags && { tags }),
      ...(likes && { likes }),
    };

    return await this.database.update<PrivateAnimation>(
      AnimationModel,
      id,
      data
    );
  }

  async get(
    keyword: string,
    nextCursor: string,
    limit: number
  ): Promise<PrivateAnimationResponse> {
    return await this.database.get<PrivateAnimation>(
      AnimationModel,
      keyword,
      nextCursor,
      limit
    );
  }

  async getById(id: string): Promise<PrivateAnimation> {
    return await this.database.getById<PrivateAnimation>(AnimationModel, id);
  }
}
