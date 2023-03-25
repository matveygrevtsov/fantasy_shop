import { makeAutoObservable } from "mobx";
import { UserRole, UserState, UserStatus } from "./types/user";

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
    console.log(userState);
  }

  /**
   * Добавляет товар в корзину.
   * @param productId Айдишник продукта.
   * @param amount Количество такого продукта.
   */
  public addProduct(productId: string, amount: number) {
    const { userState } = this;
    if (
      userState.status === UserStatus.Authorized &&
      userState.data.role === UserRole.Client
    ) {
      const { cart } = userState.data.clientData;
      cart[productId] = amount;
    }
  }
}

export const store = new Store();
