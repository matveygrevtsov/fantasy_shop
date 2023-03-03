import { User } from "firebase/auth";
import { makeAutoObservable } from "mobx";
import { firebaseApi } from "./firebaseApi";

export enum UserStatus {
  Guest = "Guest",
  Loading = "Loading",
  Error = "Error",
  Client = "Client",
}

export type UserState =
  | {
      userStatus: UserStatus.Guest | UserStatus.Loading;
    }
  | {
      userStatus: UserStatus.Error;
      error: string;
    }
  | {
      userStatus: UserStatus.Client;
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

  public getUserState(): UserState {
    return this.userState;
  }

  public iscClient(): boolean {
    return this.userState.userStatus === UserStatus.Client;
  }

  private handleUserAuthStatusChange(user: User | null): void {
    console.log('handleUserAuthStatusChange')
    this.userState = user
      ? {
          userStatus: UserStatus.Client,
          userData: user,
        }
      : {
          userStatus: UserStatus.Error,
          error: "TODO: текст ошибки",
        };
  }
}

export const store = new Store();
