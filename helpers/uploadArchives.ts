import path from "path";
import { v4 as uuidv4 } from "uuid";
import { UploadedFile } from "express-fileupload";

interface FileUpload {
  archive: UploadedFile;
}

/**
 * @param files
 * @param extensionAllowed
 * @param folder
 * @returns
 */
export const uploadArchive = async (
  files: FileUpload,
  extensionAllowed: string[] = ["png", "jpg", "jpeg"],
  folder: string = ""
): Promise<string> => {
  const { archive } = files;
  const nameParts = archive.name.split(".");
  const extension = nameParts[nameParts.length - 1].toLowerCase();

  // Validar si la extensión del archivo es permitida
  if (!extensionAllowed.includes(extension)) {
    throw new Error("Extension not valid");
  }

  // Generar un nombre único para el archivo
  const uniqueName = `${uuidv4()}.${extension}`;
  const uploadPath = path.join(__dirname, "../uploads", folder, uniqueName);

  // Promisificamos la función de movimiento del archivo
  await new Promise<void>((resolve, reject) => {
    archive.mv(uploadPath, (err: any) => {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });

  return `${uniqueName}`;
};
