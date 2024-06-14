import { INTERFACE_TYPE } from "@/config/interface-type";
import { IAnimationInteractor } from "@/domains/animations/interaces/IAnimationInteractor";
import IPublicAnimationQueriesResolver from "@/domains/animations/interaces/IPublicAnimationQueriesResolver";
import { inject, injectable } from "inversify";
import { Args, Query } from "type-graphql";
import { GetPublicAnimationsArgsType } from "../types/argsType";
import { PublicAnimationResponseType } from "../types/typeDefs";

@injectable()
export default class PublicAnimationQueriesResolver
  implements IPublicAnimationQueriesResolver
{
  private animationInteractor: IAnimationInteractor;

  constructor(
    @inject(INTERFACE_TYPE.AnimationInteractor)
    animationInteractor: IAnimationInteractor
  ) {
    this.animationInteractor = animationInteractor;
  }

  @Query(() => PublicAnimationResponseType)
  async getPublicAnimations(
    @Args(() => GetPublicAnimationsArgsType)
    { query, page }: GetPublicAnimationsArgsType
  ) {
    return await this.animationInteractor.getPublicAnimations(query, page);
  }
}
