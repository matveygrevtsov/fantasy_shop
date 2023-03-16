import { User } from "firebase/auth";
import { makeAutoObservable } from "mobx";
import { UserStatus } from "./constants/enums";
import { firebaseApi } from "./firebaseApi";

type UserState = {
  status: UserStatus;
};

class Store {
  private userState: UserState;

  constructor() {
    makeAutoObservable(this);
    this.userState = {
      status: UserStatus.Loading,
    };
    firebaseApi.observeUserAuthStatus((user) =>
      this.handleUserAuthStatusChange(user)
    );
  }

  public getUserState(): UserState {
    return this.userState;
  }

  public isUserLoggedIn(): boolean {
    const { status } = this.userState;
    return status === UserStatus.Client || status === UserStatus.Admin;
  }

  public isUserAdmin(): boolean {
    return this.userState.status === UserStatus.Admin;
  }

  private handleUserAuthStatusChange(user: User | null) {
    if (!user) {
      this.userState = {
        status: UserStatus.Guest,
      };
      return;
    }
    this.userState = {
      status: UserStatus.Loading,
    };
    firebaseApi.getUserStatus(user).then(
      (status) => {
        this.userState = {
          status,
        };
      },
      (error) => {
        this.userState = {
          status: UserStatus.Error,
        };
      }
    );
  }
}

export const store = new Store();
