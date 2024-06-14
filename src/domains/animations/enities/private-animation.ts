export type PrivateAnimation = {
  id?: string;
  url: string;
  name: string;
  likes?: number;
  tags?: string[];
  createdAt?: Date;
  updatedAt?: Date;
};

export type PrivatePageInfo = {
  nextCursor: string;
  hasNextPage: boolean;
};

export type PrivateAnimationResponse = {
  items: PrivateAnimation[];
  pageInfo: PrivatePageInfo;
};
