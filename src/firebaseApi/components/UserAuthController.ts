import {
  Auth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  User,
} from "firebase/auth";
import { UserRole, UserStatus } from "../../constants/enums";
import {
  getDatabase,
  ref as databaseRef,
  child,
  get,
  set,
} from "firebase/database";
import { ClientData, UserData } from "../../types";
import { store } from "../../store";

interface Props {
  auth: Auth;
}

export class UserAuthController {
  private readonly auth: Auth;

  constructor({ auth }: Props) {
    this.auth = auth;
    onAuthStateChanged(this.auth, (user) =>
      this.handleUserAuthStatusChange(user)
    );
  }

  /**
   * Регистрирует нового юзера с указанными email и password.
   * @param email - Электронная почта.
   * @param password - Пароль.
   */
  public async signUp(email: string, password: string): Promise<void> {
    await createUserWithEmailAndPassword(this.auth, email, password);
  }

  /**
   * Выполняет вход для юзера с указанным email и password.
   * @param email - Электронная почта.
   * @param password - Пароль.
   */
  public async signIn(email: string, password: string): Promise<void> {
    await signInWithEmailAndPassword(this.auth, email, password);
  }

  /**
   * Разлогинивает юзера.
   * @param email - Электронная почта.
   * @param password - Пароль.
   */
  public async signOut(): Promise<void> {
    await this.auth.signOut();
  }

  /**
   * Подписывает указанную функцию на изменение статуса авторизации юзера.
   * @param onUserAuthStateChanged - функция, которая будет вызываться при изменении статуса авторизации юзера.
   */
  public observeUserAuthStatus(
    onUserAuthStateChanged: (user: User | null) => void
  ): void {
    onAuthStateChanged(this.auth, onUserAuthStateChanged);
  }

  /**
   * Возвращает роль юзера.
   * @param user - данные юзера.
   */
  public async getUserRole(user: User): Promise<UserRole> {
    const idTokenResult = await user.getIdTokenResult();
    const role = !!idTokenResult.claims.admin
      ? UserRole.Admin
      : UserRole.Client;
    return role;
  }

  /**
   * Скачивает дополнительные данные юзера из базы данных.
   * @param user - данные юзера.
   */
  public async fetchUserData(user: User): Promise<UserData> {
    const { uid } = user;
    const role = await this.getUserRole(user);

    if (role === UserRole.Admin) return { role };

    const dbRef = databaseRef(getDatabase());
    const snapshot = await get(child(dbRef, `users/${uid}`));
    if (snapshot.exists()) {
      return {
        role,
        uid,
        ...snapshot.val(),
      };
    }

    const clientData: ClientData = {
      cart: {},
    };

    return {
      role,
      uid,
      clientData,
    };
  }

  /**
   * Добавляет продукт в корзину.
   * @param productId - айдишник продукта.
   * @param amount - количество такого продукта, которое будет добавлено в корзину.
   */
  public async addProductToCart(
    productId: string,
    amount: number
  ): Promise<void> {
    const userState = store.getUserState();
    if (
      !(
        userState.status === UserStatus.Authorized &&
        userState.data.role === UserRole.Client
      )
    )
      return;

    const database = getDatabase();
    const { uid } = userState.data;
    const prevAmount = userState.data.clientData.cart[productId] || 0;
    await set(
      databaseRef(database, `users/${uid}/cart/${productId}`),
      prevAmount + amount
    );
    store.addProduct(productId, amount);
  }

  /**
   * Данный метод вызывается в следующих кейсах:
   * 1. Юзер нажал кнопку разлогина
   * 2. Юзер ввёл свои данные на странице "sign-in" и отправил
   * 3. Юзер ввёл свои данные на странице "sign-up" и отправил
   * 4. Юзер перезагрузил страницу
   * 5. Юзер открыл приложение в новой вкладке
   */
  private handleUserAuthStatusChange(user: User | null) {
    if (!user) {
      store.setUserState({
        status: UserStatus.Unauthorized,
      });
      return;
    }
    store.setUserState({
      status: UserStatus.Loading,
    });
    this.fetchUserData(user).then(
      (data) => {
        store.setUserState({
          status: UserStatus.Authorized,
          data,
        });
      },
      () => {
        store.setUserState({
          status: UserStatus.Unauthorized,
        });
      }
    );
  }
}
