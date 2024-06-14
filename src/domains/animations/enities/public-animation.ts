type Author = {
  id: string;
  name: string;
  avatarUrl: string;
};

export type PublicAnimation = {
  id: string;
  name: string;
  lottieSource: string;
  downloadCount: number;
  tags: string[];
  user: Author;
  createdAt: Date;
  updatedAt: Date;
};

export type PublicPageInfo = {
  total: number;
  page: number;
  pageCount: number;
};

export class PublicAnimationResponse {
  items: PublicAnimation[];
  pageInfo: PublicPageInfo;
}
