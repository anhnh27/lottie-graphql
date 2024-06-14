import { S3Client } from "@aws-sdk/client-s3";
import { Upload as S3Upload } from "@aws-sdk/lib-storage";
import { FileUpload } from "graphql-upload-ts";
import { injectable } from "inversify";
import IFileService from "./IFileService";

@injectable()
export default class FileService implements IFileService {
  async upload(file: Promise<FileUpload>): Promise<string> {
    const { createReadStream, filename, mimetype } = await file;

    const fileResponse = await new S3Upload({
      client: new S3Client({
        credentials: {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        },
        region: process.env.AWS_REGION,
      }),
      params: {
        ACL: "public-read",
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: filename.trim().replace(/\s+/g, "_"),
        Body: createReadStream(),
        ContentType: mimetype,
      },
    }).done();

    return fileResponse.Location;
  }
}
