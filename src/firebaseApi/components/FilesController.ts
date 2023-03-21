import { v4 } from "uuid";
import {
  getStorage,
  ref as storeRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

export class FilesController {
  constructor() {}

  /**
   * Загружает картинку в хранилище firebase и возвращает соответствующий src.
   * @param image - объект, описывающий картинку.
   */
  public async uploadImage(image: File): Promise<string> {
    const imageId = v4();
    const storage = getStorage();
    const storageRef = storeRef(storage, `images/${imageId}`);
    await uploadBytes(storageRef, image);
    const src = await getDownloadURL(storageRef);
    return src;
  }

  /**
   * Загружает картинки в хранилище firebase и возвращает соответствующие src.
   * @param images - объекты, описывающие картинки.
   */
  public async uploadImages(images: File[]): Promise<string[]> {
    const promises = images.map((image) => this.uploadImage(image));
    return Promise.all(promises);
  }
}
