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
import { CreateProductFormData, Product, SearchProductsParams } from "./types";
import { UserStatus } from "./constants/enums";
import { getStorage, ref as storeRef, uploadBytes } from "firebase/storage";
import { getDatabase, ref as databaseRef, set } from "firebase/database";
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
   * Возвращает статус юзера.
   * @param user - данные пользователя.
   */
  public async getUserStatus(user: User | null): Promise<UserStatus> {
    if (!user) return UserStatus.Guest;
    const idTokenResult = await user.getIdTokenResult();
    return !!idTokenResult.claims.admin ? UserStatus.Admin : UserStatus.Client;
  }

  /**
   * Возвращает массив продуктов, соответствующих параметрам поиска, либо undefined, если параметры поиска не заданы.
   * @param searchProductsParams - параметры поиска продуктов.
   */
  public async getProductsBySearchParams(
    searchProductsParams?: SearchProductsParams
  ): Promise<Product[]> {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return [];
  }

  /**
   * Загружает картинку в хранилище firebase и возвращает соответствующий src.
   * @param image - объект, описывающий картинку.
   */
  public async uploadImage(image: File): Promise<string> {
    const imageId = v4();
    const storage = getStorage();
    const storageRef = storeRef(storage, `images/${imageId}`);
    const snapshot = await uploadBytes(storageRef, image);
    return snapshot.metadata.fullPath;
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
}

export const firebaseApi = new FirebaseApi();
