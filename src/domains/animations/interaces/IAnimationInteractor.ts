import { FileUpload } from "graphql-upload-ts";
import {
  PrivateAnimation,
  PrivateAnimationResponse,
} from "../enities/private-animation";
import { PublicAnimationResponse } from "../enities/public-animation";

export interface IAnimationInteractor {
  getAnimations(
    keyword: string,
    nextCursor: string,
    limit: number
  ): Promise<PrivateAnimationResponse>;
  getAnimationById(id: string): Promise<PrivateAnimation>;
  createAnimation(
    name: string,
    tags: string[],
    likes: number,
    file: Promise<FileUpload>
  ): Promise<string>;
  updateAnimation(
    id: string,
    name: string,
    tags: string[],
    likes: number,
    file: Promise<FileUpload>
  ): Promise<PrivateAnimation>;
  getPublicAnimations(
    query: string,
    page: number
  ): Promise<PublicAnimationResponse>;
}
