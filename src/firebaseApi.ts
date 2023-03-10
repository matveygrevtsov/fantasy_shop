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
import { Product, SearchProductsParams } from "./types";

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
   * @param onUserAuthStateChanged - функция, которая срабатывает при изменении статуса авторизации юзера.
   */
  public observeUserAuthStatus(
    onUserAuthStateChanged: (user: User | null) => void
  ): void {
    onAuthStateChanged(this.auth, onUserAuthStateChanged);
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
}

export const firebaseApi = new FirebaseApi();
