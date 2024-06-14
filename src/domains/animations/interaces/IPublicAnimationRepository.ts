import { PublicAnimationResponse } from "../enities/public-animation";

export default interface IPublicAnimationRepository {
  get(query: string, page: number): Promise<PublicAnimationResponse>;
}
