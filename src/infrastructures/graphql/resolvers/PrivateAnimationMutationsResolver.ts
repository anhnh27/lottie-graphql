import { INTERFACE_TYPE } from "@/config/interface-type";
import { IAnimationInteractor } from "@/domains/animations/interaces/IAnimationInteractor";
import IPrivateAnimationMutationsResolver from "@/domains/animations/interaces/IPrivateAnimationMutationsResolver";
import { inject, injectable } from "inversify";
import { Args, Mutation } from "type-graphql";
import {
  CreateAnimationArgsType,
  UpdateAnimationArgsType,
} from "../types/argsType";
import PrivateAnimationType from "../types/typeDefs";

@injectable()
export default class PrivateAnimationMutationsResolver
  implements IPrivateAnimationMutationsResolver
{
  private animationInteractor: IAnimationInteractor;

  constructor(
    @inject(INTERFACE_TYPE.AnimationInteractor)
    animationInteractor: IAnimationInteractor
  ) {
    this.animationInteractor = animationInteractor;
  }

  @Mutation(() => String)
  async createAnimation(
    @Args(() => CreateAnimationArgsType)
    { name, tags, likes, file }: CreateAnimationArgsType
  ) {
    return await this.animationInteractor.createAnimation(
      name,
      tags,
      likes,
      file
    );
  }

  @Mutation(() => PrivateAnimationType)
  async updateAnimation(
    @Args(() => UpdateAnimationArgsType)
    { id, name, tags, likes, file }: UpdateAnimationArgsType
  ) {
    return await this.animationInteractor.updateAnimation(
      id,
      name,
      tags,
      likes,
      file
    );
  }
}
