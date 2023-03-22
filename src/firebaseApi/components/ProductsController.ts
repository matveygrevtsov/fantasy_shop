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
  CreateProductFormData,
  Product,
  SearchProductsParams,
} from "../../types/product";

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

  /**
   * Уменьшает наличие продукта на заданное значение (в силу того, что он был добавлен в корзину какому-нибудь юзеру). Возвращает true, если amount не больше, чем количество товара в наличии и false в противном случае.
   * @param productId - айдишник продукта.
   * @param amount
   */
  public async decreaseAmount(productId: string, amount: number) {
    const productData = await this.fetchProductData(productId);
    if (!productData) {
      throw new Error(
        "Попытка уменьшить наличие товара, который не был найден в базе данных."
      );
    }
    const delta = productData.amount - amount;
    const result = delta < 0;
    const newAmount = Math.max(0, delta);
    const database = getDatabase();
    await set(databaseRef(database, `products/${productId}/amount`), newAmount);
    return result;
  }
}
