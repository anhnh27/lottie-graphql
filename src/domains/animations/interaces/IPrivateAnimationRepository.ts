import { FileUpload } from "graphql-upload-ts";
import {
  PrivateAnimation,
  PrivateAnimationResponse,
} from "../enities/private-animation";

export default interface IPrivateAnimationRepository {
  create(
    name: string,
    tags: string[],
    likes: number,
    file: Promise<FileUpload>
  ): Promise<string>;
  update(
    id: string,
    name?: string,
    tags?: string[],
    likes?: number,
    file?: Promise<FileUpload>
  ): Promise<PrivateAnimation>;
  get(
    keyword: string,
    nextCursor: string,
    limit: number
  ): Promise<PrivateAnimationResponse>;
  getById(id: string): Promise<PrivateAnimation>;
}
