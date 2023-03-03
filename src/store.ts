import { User } from "firebase/auth";
import { makeAutoObservable } from "mobx";
import { firebaseApi } from "./firebaseApi";

export enum UserStatus {
  Guest = "Guest",
  LoggedIn = "LoggedIn",
}

export type UserState =
  | {
      userStatus: UserStatus.Guest;
    }
  | {
      userStatus: UserStatus.LoggedIn;
      userData: User;
    };

class Store {
  private userState: UserState;

  constructor() {
    makeAutoObservable(this);
    this.userState = {
      userStatus: UserStatus.Guest,
    };
    firebaseApi.observeUserAuthStatus((user) =>
      this.handleUserAuthStatusChange(user)
    );
  }

  /**
   * Возвращает текущее состояние юзера.
   */
  public getUserState(): UserState {
    return this.userState;
  }

  /**
   * Обрабатывает событие изменения юзерского стейта.
   * @param user Стейт юзера.
   */
  private handleUserAuthStatusChange(user: User | null): void {
    this.userState = user
      ? {
          userStatus: UserStatus.LoggedIn,
          userData: user,
        }
      : {
          userStatus: UserStatus.Guest,
        };
  }
}

export const store = new Store();
