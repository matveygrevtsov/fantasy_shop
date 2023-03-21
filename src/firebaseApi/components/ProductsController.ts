import {
  CreateProductFormData,
  Product,
  SearchProductsParams,
} from "../../types";
import { v4 } from "uuid";
import {
  getDatabase,
  ref as databaseRef,
  set,
  get,
  child,
} from "firebase/database";
import { FilesController } from "./FilesController";

export class ProductsController {
  private readonly filesController: FilesController;

  constructor() {
    this.filesController = new FilesController();
  }

  /**
   * Записывает данные о продукте в базу данных.
   * @param product - данные продукта из формы создания новых продуктов.
   */
  public async createProduct(product: CreateProductFormData): Promise<void> {
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
    return product;
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
      ([id, productInfo]: any) => ({
        id,
        ...productInfo,
      })
    );
    return products;
  }
}
