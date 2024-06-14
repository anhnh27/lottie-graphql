import { injectable } from "inversify";
import { PublicAnimationResponse } from "../enities/public-animation";
import IPublicAnimationRepository from "../interaces/IPublicAnimationRepository";

@injectable()
export default class PublicAnimationRepository
  implements IPublicAnimationRepository
{
  async get(query: string, page: number): Promise<PublicAnimationResponse> {
    try {
      const response = await fetch(
        `https://lottiefiles.com/api/search/get-animations?query=${query}&type=all&aep=false&sort=popular&page=${page}`
      );

      const {
        data: { data, pagination },
      } = await response.json();

      return {
        items: data.map(
          ({ id, name, lottieSource, tags, downloadCount, user }) => ({
            id,
            name,
            lottieSource,
            tags,
            downloadCount,
            user: {
              id: user.id,
              name: user.name,
              avatarUrl: user.avatarUrl,
            },
          })
        ),
        pageInfo: {
          page: pagination.page,
          pageCount: pagination.pageCount,
          total: pagination.total,
        },
      };
    } catch (error) {
      throw new Error("Failed to get animations");
    }
  }
}
