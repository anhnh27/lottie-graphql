import "reflect-metadata";
import "dotenv/config";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import compression from "compression";
import cors from "cors";
import express, { Express } from "express";
import { graphqlUploadExpress } from "graphql-upload-ts";
import helmet from "helmet";
import http from "http";
import { inject } from "inversify";
import { buildSchema } from "type-graphql";
import { INTERFACE_TYPE } from "./config/interface-type";
import container from "./config/inversify-config";
import Database from "./infrastructures/database/Database";
import PrivateAnimationMutationsResolver from "./infrastructures/graphql/resolvers/PrivateAnimationMutationsResolver";
import PrivateAnimationQueriesResolver from "./infrastructures/graphql/resolvers/PrivateAnimationQueriesResolver";
import PublicAnimationQueriesResolver from "./infrastructures/graphql/resolvers/PublicAnimationQueriesResolver";

const PORT = process.env.PORT ?? 3000;
const MONGODB_URL = process.env.MONGODB_URL!;

class Server {
  private app: Express;
  private apolloServer: ApolloServer;
  private database: Database;
  private httpServer: http.Server;

  constructor(@inject(INTERFACE_TYPE.Database) database: Database) {
    this.app = express();
    this.httpServer = http.createServer(this.app);
    this.database = database;
  }

  private initializeMiddlewares(): void {
    this.app.use(
      cors<cors.CorsRequest>({
        origin: process.env.CLIENT_URL,
      }),
      express.json(),
      helmet({
        contentSecurityPolicy:
          process.env.NODE_ENV === "production" ? undefined : false,
      }),
      compression(),
      graphqlUploadExpress({ maxFileSize: 2 * 1024 * 1024, maxFiles: 1 }),
      expressMiddleware(this.apolloServer)
    );
  }

  private async initializeGraphQL(): Promise<void> {
    this.apolloServer = new ApolloServer({
      schema: await buildSchema({
        resolvers: [
          PrivateAnimationQueriesResolver,
          PrivateAnimationMutationsResolver,
          PublicAnimationQueriesResolver,
        ],
        container,
      }),
      plugins: [
        ApolloServerPluginDrainHttpServer({ httpServer: this.httpServer }),
      ],
    });
    await this.apolloServer.start();
  }

  private async connectToDatabase(): Promise<void> {
    await this.database.connect(MONGODB_URL);
  }

  public start(): void {
    this.connectToDatabase().then(async () => {
      await this.initializeGraphQL();
      this.initializeMiddlewares();
      this.httpServer.listen(PORT, () => {
        console.log(`🚀 Server is running on port ${PORT}`);
      });
    });
  }
}

const server = new Server(container.get<Database>(INTERFACE_TYPE.Database));
server.start();
