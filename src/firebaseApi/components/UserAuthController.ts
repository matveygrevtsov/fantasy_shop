import {
  Auth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  User,
} from "firebase/auth";
import { UserRole } from "../../constants/enums";
import { getDatabase, ref as databaseRef, child, get } from "firebase/database";
import { UserData } from "../../types";

interface Props {
  auth: Auth;
}

export class UserAuthController {
  private readonly auth: Auth;

  constructor({ auth }: Props) {
    this.auth = auth;
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
    if (!snapshot.exists()) throw new Error("Не удалось скачать данные юзера");

    return {
      role,
      ...snapshot.val(),
    };
  }
}
