import { v4 } from "uuid";
import {
  getDatabase,
  ref as databaseRef,
  set,
  get,
  child,
} from "firebase/database";
import { FilesController } from "./FilesController";
import {
  CreateProductFormValues,
  EditProductFormValues,
  Product,
  SearchProductsParams,
} from "../../types/product";
import { ImageInStore } from "../../types/store";
import { getStorage, ref, deleteObject } from "firebase/storage";

export class ProductsController {
  private readonly filesController: FilesController;

  constructor() {
    this.filesController = new FilesController();
  }

  /**
   * Записывает данные о продукте в базу данных.
   * @param product - данные продукта из формы создания новых продуктов.
   */
  public async createProduct(product: CreateProductFormValues): Promise<void> {
    const productId = v4();
    const database = getDatabase();
    const images = await this.filesController.uploadImages(product.images);
    await set(databaseRef(database, `products/${productId}`), {
      ...product,
      images,
    });
  }

  /**
   * Скачивает данные продукта по его айдишнику из базы данных и возвращает их.
   * @param productId - айдишник продукта.
   */
  public async fetchProductData(
    productId: string
  ): Promise<Product | undefined> {
    const dbRef = databaseRef(getDatabase());
    const snapshot = await get(child(dbRef, `products/${productId}`));
    if (!snapshot.exists()) {
      return undefined;
    }
    const product = snapshot.val();
    const images = product.images || [];
    return {
      ...product,
      id: productId,
      images,
    };
  }

  /**
   * Скачивает данные продуктов по их айдишникам из базы данных и возвращает их.
   * @param productsIds - айдишники продуктов.
   */
  public async fetchProductsData(
    productsIds: string[]
  ): Promise<Array<Product | undefined>> {
    const promises = productsIds.map((productId) =>
      this.fetchProductData(productId)
    );
    return Promise.all(promises);
  }

  /**
   * Возвращает массив продуктов, соответствующих параметрам поиска.
   * @param searchProductsParams - параметры поиска продуктов.
   */
  public async getProductsBySearchParams(
    searchProductsParams?: SearchProductsParams
  ): Promise<Product[]> {
    const dbRef = databaseRef(getDatabase());
    const snapshot = await get(child(dbRef, "products"));
    if (!snapshot.exists()) {
      return [];
    }
    const products = Object.entries(snapshot.val()).map(
      ([id, productInfo]: any) => {
        const images = productInfo.images || [];

        return {
          ...productInfo,
          id,
          images,
        };
      }
    );
    return products.filter(({ amount }) => amount > 0);
  }

  /**
   * Уменьшает наличие продукта на заданное значение (в силу того, что он был добавлен в корзину какому-нибудь юзеру). Возвращает true, если amount не больше, чем количество товара в наличии и false в противном случае.
   * @param productId - айдишник продукта.
   * @param expectedAmount - количество такого товара.
   */
  public async decreaseAmount(
    productId: string,
    expectedAmount: number
  ): Promise<number> {
    const productData = await this.fetchProductData(productId);
    if (!productData) {
      throw new Error(
        "Попытка уменьшить наличие товара, который не был найден в базе данных."
      );
    }
    const realAmount = Math.min(productData.amount, expectedAmount);
    const newAmount = productData.amount - realAmount;
    const database = getDatabase();
    await set(databaseRef(database, `products/${productId}/amount`), newAmount);
    return realAmount;
  }

  /**
   * Редактирует информацию о продукте.
   * @param editProductFormValues - данные формы редактирования продукта.
   */
  public async editProduct(editProductFormValues: EditProductFormValues) {
    const productId = editProductFormValues.id;
    const idsOfRemovedImages = await this.filesController.removeImages(
      editProductFormValues.imagesToRemove
    );
    const newImages = await this.filesController.uploadImages(
      editProductFormValues.imagesToUpload
    );
    const prevData = await this.fetchProductData(productId);
    if (!prevData) {
      throw Error(`Продукт с айдишином ${productId} не найден.`);
    }
    const images = [
      ...prevData.images.filter(({ id }) => !idsOfRemovedImages.includes(id)),
      ...newImages,
    ];
    const newData: Product = {
      ...prevData,
      ...editProductFormValues,
      images,
    };
    const database = getDatabase();
    await set(databaseRef(database, `products/${productId}`), newData);
  }
}
