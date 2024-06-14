import { FileUpload } from "graphql-upload-ts";

export default interface IFileService {
  upload(file: Promise<FileUpload>): Promise<string>;
}
