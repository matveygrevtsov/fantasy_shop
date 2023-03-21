// Ссылка на документацию: https://firebase.google.com/docs/web/setup?authuser=0&hl=en
import { FirebaseApp } from "@firebase/app-types";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { firebaseConfig } from "../constants/firebase";
import { ProductsController } from "./components/ProductsController";
import { UserAuthController } from "./components/UserAuthController";

class FirebaseApi {
  public readonly userAuthController: UserAuthController;
  public readonly productsController: ProductsController;

  constructor() {
    const app = initializeApp(firebaseConfig) as FirebaseApp;
    this.userAuthController = new UserAuthController({
      auth: getAuth(app),
    });
    this.productsController = new ProductsController();
  }
}

export const firebaseApi = new FirebaseApi();
