import { v4 } from "uuid";
import {
  getStorage,
  ref as storeRef,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { ImageInStore } from "../../types/store";

export class FilesController {
  constructor() {}

  /**
   * Загружает картинку в хранилище firebase.
   * @param image - объект, описывающий картинку.
   */
  public async uploadImage(image: File): Promise<ImageInStore> {
    const id = v4();
    const storage = getStorage();
    const storageRef = storeRef(storage, `images/${id}`);
    await uploadBytes(storageRef, image);
    const src = await getDownloadURL(storageRef);
    return { id, src };
  }

  /**
   * Загружает картинки в хранилище firebase.
   * @param images - объекты, описывающие картинки.
   */
  public async uploadImages(images: File[]): Promise<ImageInStore[]> {
    if (images.length === 0) return [];
    const promises = images.map((image) => this.uploadImage(image));
    return Promise.all(promises);
  }

  /**
   * Удаляет картинки из хранилища firebase. Возвращает айдишники удалённых картинок.
   * @param imagesToRemove - Картинки, которые нужно удалить.
   */
  public async removeImages(imagesToRemove: ImageInStore[]): Promise<string[]> {
    const storage = getStorage();
    const refs = imagesToRemove.map(({ id }) =>
      storeRef(storage, `images/${id}`)
    );
    await Promise.all(refs.map(deleteObject)); // Удаляем картинки из стора
    return imagesToRemove.map(({ id }) => id);
  }
}
