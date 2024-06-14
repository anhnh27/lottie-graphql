import { INTERFACE_TYPE } from "@/config/interface-type";
import { IAnimationInteractor } from "@/domains/animations/interaces/IAnimationInteractor";
import IPrivateAnimationQueriesResolver from "@/domains/animations/interaces/IPrivateAnimationQueriesResolver";
import { inject, injectable } from "inversify";
import { Args, Query } from "type-graphql";
import {
  GetAnimationByIdArgsType,
  GetPrivateAnimationsArgsType,
} from "../types/argsType";
import PrivateAnimation, {
  PrivateAnimationResponseType,
} from "../types/typeDefs";

@injectable()
export default class PrivateAnimationQueriesResolver
  implements IPrivateAnimationQueriesResolver
{
  private animationInteractor: IAnimationInteractor;

  constructor(
    @inject(INTERFACE_TYPE.AnimationInteractor)
    animationInteractor: IAnimationInteractor
  ) {
    this.animationInteractor = animationInteractor;
  }

  @Query(() => PrivateAnimationResponseType)
  async getAnimations(
    @Args(() => GetPrivateAnimationsArgsType)
    { keyword, nextCursor, limit }: GetPrivateAnimationsArgsType
  ) {
    return await this.animationInteractor.getAnimations(
      keyword,
      nextCursor,
      limit
    );
  }

  @Query(() => PrivateAnimation, { nullable: true })
  async getAnimationById(
    @Args(() => GetAnimationByIdArgsType) { id }: GetAnimationByIdArgsType
  ) {
    return await this.animationInteractor.getAnimationById(id);
  }
}
