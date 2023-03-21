import { User } from "firebase/auth";
import { makeAutoObservable } from "mobx";
import { UserStatus } from "./constants/enums";
import { firebaseApi } from "./firebaseApi/firebaseApi";
import { UserState } from "./types";

class Store {
  private userState: UserState;

  constructor() {
    makeAutoObservable(this);
    this.userState = {
      status: UserStatus.Loading,
    };
    firebaseApi.userAuthController.observeUserAuthStatus((user) =>
      this.handleUserAuthStatusChange(user)
    );
  }

  /**
   * Возвращает стейт юзера.
   */
  public getUserState(): UserState {
    return this.userState;
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
      this.userState = {
        status: UserStatus.Unauthorized,
      };
      return;
    }
    this.userState = {
      status: UserStatus.Loading,
    };
    firebaseApi.userAuthController.fetchUserData(user).then(
      (data) => {
        this.userState = {
          status: UserStatus.Authorized,
          data,
        };
      },
      () => {
        this.userState = {
          status: UserStatus.Unauthorized,
        };
      }
    );
  }
}

export const store = new Store();
