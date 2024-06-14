import { FileUpload, GraphQLUpload } from "graphql-upload-ts";
import { ArgsType, Field, Int } from "type-graphql";

@ArgsType()
export class GetPrivateAnimationsArgsType {
  @Field(() => String, { nullable: true })
  nextCursor: string;

  @Field(() => Int, { defaultValue: 10 })
  limit: number;

  @Field(() => String)
  keyword: string;
}

@ArgsType()
export class GetPublicAnimationsArgsType {
  @Field(() => Int, { defaultValue: 1 })
  page: number;

  @Field(() => String)
  query: string;
}

@ArgsType()
export class GetAnimationByIdArgsType {
  @Field(() => String)
  id: string;
}

@ArgsType()
export class CreateAnimationArgsType {
  @Field(() => String)
  name: string;

  @Field(() => [String], { nullable: true })
  tags: string[];

  @Field(() => Int, { defaultValue: 0, nullable: true })
  likes: number;

  @Field(() => GraphQLUpload)
  file: Promise<FileUpload>;
}

@ArgsType()
export class UpdateAnimationArgsType {
  @Field(() => String)
  id: string;

  @Field(() => String, { nullable: true })
  name: string;

  @Field(() => [String], { nullable: true })
  tags: string[];

  @Field(() => Int, { nullable: true })
  likes: number;

  @Field(() => GraphQLUpload, { nullable: true })
  file: Promise<FileUpload>;
}
