// Ссылка на документацию: https://firebase.google.com/docs/web/setup?authuser=0&hl=en
import { FirebaseApp } from "@firebase/app-types";
import { initializeApp } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore/lite";
import {
  Auth,
  getAuth,
  createUserWithEmailAndPassword,
  UserCredential,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { firebaseConfig } from "./constants/firebase";
import {
  CreateProductFormData,
  Product,
  SearchProductsParams,
  UserData,
} from "./types";
import { UserRole } from "./constants/enums";
import {
  getStorage,
  ref as storeRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import {
  getDatabase,
  ref as databaseRef,
  set,
  child,
  get,
} from "firebase/database";
import { v4 } from "uuid";

class FirebaseApi {
  private readonly firebaseApp: FirebaseApp;
  private readonly firestore: Firestore;
  private readonly auth: Auth;

  constructor() {
    this.firebaseApp = initializeApp(firebaseConfig) as FirebaseApp;
    this.firestore = getFirestore(this.firebaseApp);
    this.auth = getAuth(this.firebaseApp);
  }

  /**
   * Регистрирует нового юзера с указанными email и password.
   * @param email - Электронная почта.
   * @param password - Пароль.
   */
  public signUp(email: string, password: string): Promise<UserCredential> {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  /**
   * Выполняет вход для юзера с указанным email и password.
   * @param email - Электронная почта.
   * @param password - Пароль.
   */
  public signIn(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  /**
   * Разлогинивает юзера.
   * @param email - Электронная почта.
   * @param password - Пароль.
   */
  public async signOut() {
    await this.auth.signOut();
  }

  /**
   * Отслеживает статус юзера.
   * @param onUserAuthStateChanged - функция, которая срабатывает при любом изменении статуса авторизации юзера.
   */
  public observeUserAuthStatus(
    onUserAuthStateChanged: (user: User | null) => void
  ): void {
    onAuthStateChanged(this.auth, onUserAuthStateChanged);
  }

  /**
   * Возвращает данные продукта из базы данных.
   * @param productId - айдишник продукта.
   */
  public async getProduct(productId: string): Promise<Product | undefined> {
    const dbRef = databaseRef(getDatabase());
    const snapshot = await get(child(dbRef, `products/${productId}`));
    if (!snapshot.exists()) {
      return undefined;
    }
    const product = snapshot.val();
    return product;
  }

  /**
   * Возвращает массив продуктов, соответствующих параметрам поиска, либо undefined, если параметры поиска не заданы.
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

  /**
   * Записывает данные о продукте в базу данных.
   * @param product - информация о продукте.
   */
  public async createProduct(product: CreateProductFormData): Promise<void> {
    const productId = v4();
    const database = getDatabase();
    const images = await this.uploadImages(product.images);
    await set(databaseRef(database, `products/${productId}`), {
      ...product,
      images,
    });
  }

  /**
   * Скачивает дополнительные данные юзера из базы данных.
   * @param user - данные юзера.
   */
  public async fetchUserData(user: User): Promise<UserData> {
    const idTokenResult = await user.getIdTokenResult();
    const role = !!idTokenResult.claims.admin
      ? UserRole.Admin
      : UserRole.Client;
    return { role };
  }
}

export const firebaseApi = new FirebaseApi();
