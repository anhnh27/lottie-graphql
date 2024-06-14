import { Field, ID, Int, ObjectType } from "type-graphql";

@ObjectType()
export default class PrivateAnimationType {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  url: string;

  @Field(() => String)
  name: string;

  @Field(() => Int, { nullable: true })
  likes: number;

  @Field(() => [String], { nullable: true })
  tags: string[];

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}

@ObjectType()
export class PrivatePageInfoType {
  @Field(() => String)
  nextCursor: string;

  @Field(() => Boolean)
  hasNextPage: boolean;
}

@ObjectType()
export class Author {
  @Field(() => String)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  avatarUrl: string;
}

@ObjectType()
export class PrivateAnimationResponseType {
  @Field(() => [PrivateAnimationType])
  items: PrivateAnimationType[];

  @Field(() => PrivatePageInfoType)
  pageInfo: PrivatePageInfoType;
}

@ObjectType()
export class PublicAnimationType {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  lottieSource: string;

  @Field(() => Int)
  downloadCount: number;

  @Field(() => [String], { nullable: true })
  tags: string[];

  @Field(() => Author)
  user: Author;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}

@ObjectType()
export class PublicPageInfoType {
  @Field(() => Int)
  page: number;

  @Field(() => Int)
  pageCount: number;

  @Field(() => Int)
  total: number;
}

@ObjectType()
export class PublicAnimationResponseType {
  @Field(() => [PublicAnimationType])
  items: PublicAnimationType[];

  @Field(() => PublicPageInfoType)
  pageInfo: PublicPageInfoType;
}
