import Database from "@/infrastructures/database/Database";
import IDatabase from "@/infrastructures/database/IDatabase";
import FileService from "@/infrastructures/file-service/FileService";
import IFileService from "@/infrastructures/file-service/IFileService";
import { Container } from "inversify";
import { IAnimationInteractor } from "../domains/animations/interaces/IAnimationInteractor";
import IPrivateAnimationRepository from "../domains/animations/interaces/IPrivateAnimationRepository";
import IPublicAnimationRepository from "../domains/animations/interaces/IPublicAnimationRepository";
import { AnimationInteractor } from "../domains/animations/interactors/AnimationInteractor";
import PrivateAnimationRepository from "../domains/animations/repositories/PrivateAnimationRepository";
import PublicAnimationRepository from "../domains/animations/repositories/PublicAnimationRepository";
import PrivateAnimationMutationsResolver from "../infrastructures/graphql/resolvers/PrivateAnimationMutationsResolver";
import PrivateAnimationQueriesResolver from "../infrastructures/graphql/resolvers/PrivateAnimationQueriesResolver";
import PublicAnimationQueriesResolver from "../infrastructures/graphql/resolvers/PublicAnimationQueriesResolver";
import { INTERFACE_TYPE } from "./interface-type";

const container = new Container();

// Interactors
container
  .bind<IAnimationInteractor>(INTERFACE_TYPE.AnimationInteractor)
  .to(AnimationInteractor);

// Database
container
  .bind<IDatabase>(INTERFACE_TYPE.Database)
  .to(Database)
  .inSingletonScope();

// File Service
container.bind<IFileService>(INTERFACE_TYPE.FileService).to(FileService);

// Repositories
container
  .bind<IPrivateAnimationRepository>(INTERFACE_TYPE.PrivateAnimationRepository)
  .to(PrivateAnimationRepository);
container
  .bind<IPublicAnimationRepository>(INTERFACE_TYPE.PublicAnimationRepository)
  .to(PublicAnimationRepository);

// Resolvers
container
  .bind<PrivateAnimationMutationsResolver>(PrivateAnimationMutationsResolver)
  .to(PrivateAnimationMutationsResolver)
  .inSingletonScope();
container
  .bind<PrivateAnimationQueriesResolver>(PrivateAnimationQueriesResolver)
  .to(PrivateAnimationQueriesResolver)
  .inSingletonScope();
container
  .bind<PublicAnimationQueriesResolver>(PublicAnimationQueriesResolver)
  .to(PublicAnimationQueriesResolver)
  .inSingletonScope();

export default container;
