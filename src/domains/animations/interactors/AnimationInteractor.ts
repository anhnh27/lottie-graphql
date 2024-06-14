import { INTERFACE_TYPE } from "@/config/interface-type";
import { FileUpload } from "graphql-upload-ts";
import { inject, injectable } from "inversify";
import { PublicAnimationResponse } from "../enities/public-animation";
import { IAnimationInteractor } from "../interaces/IAnimationInteractor";
import IAnimationRepository from "../interaces/IPrivateAnimationRepository";
import IPublicAnimationRepository from "../interaces/IPublicAnimationRepository";

@injectable()
export class AnimationInteractor implements IAnimationInteractor {
  private animationRepository: IAnimationRepository;
  private publicAnimationRepository: IPublicAnimationRepository;

  constructor(
    @inject(INTERFACE_TYPE.PrivateAnimationRepository)
    animationRepository: IAnimationRepository,
    @inject(INTERFACE_TYPE.PublicAnimationRepository)
    publicAnimationRepository: IPublicAnimationRepository
  ) {
    this.animationRepository = animationRepository;
    this.publicAnimationRepository = publicAnimationRepository;
  }

  getPublicAnimations = async (
    query: string,
    page: number
  ): Promise<PublicAnimationResponse> => {
    return await this.publicAnimationRepository.get(query, page);
  };

  getAnimations = async (
    keyword: string,
    nextCursor: string,
    limit: number
  ) => {
    return await this.animationRepository.get(keyword, nextCursor, limit);
  };

  getAnimationById = async (id: string) => {
    return await this.animationRepository.getById(id);
  };

  createAnimation = async (
    name: string,
    tags: string[],
    likes: number,
    file: Promise<FileUpload>
  ) => {
    return await this.animationRepository.create(name, tags, likes, file);
  };

  updateAnimation = async (
    id: string,
    name: string,
    tags: string[],
    likes: number,
    file: Promise<FileUpload>
  ) => {
    return await this.animationRepository.update(id, name, tags, likes, file);
  };
}
