import { makeAutoObservable } from "mobx";
import { UserStatus } from "./constants/enums";
import { UserState } from "./types";

class Store {
  private userState: UserState;

  constructor() {
    makeAutoObservable(this);
    this.userState = {
      status: UserStatus.Loading,
    };
  }

  /**
   * Возвращает стейт юзера.
   */
  public getUserState(): UserState {
    return this.userState;
  }

  /**
   * Устанавливает стейт юзера.
   */
  public setUserState(userState: UserState) {
    this.userState = userState;
  }
}

export const store = new Store();
