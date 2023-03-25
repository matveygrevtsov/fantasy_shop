import { Preloader } from "../../../../components/Preloader/Preloader";
import { Status, useCartPageContent } from "./useCartPageContent";
import { Cart } from "../../../../types/user";
import { ProductsList } from "../ProductsList/ProductsList";
import { texts } from "../../../../constants/texts";

import s from "./CartPageContent.module.css";

interface Props {
  cart: Cart;
}

export const CartPageContent: React.FC<Props> = ({ cart }) => {
  const { state } = useCartPageContent(cart);
  const { title, fetchProductsDataError } = texts.CartPage;

  if (state.status === Status.Success) {
    return (
      <div className={s.root}>
        <h2 className={s.title}>{title}</h2>
        <ProductsList products={state.products} className={s.productsList} />
      </div>
    );
  }

  if (state.status === Status.Error) {
    return (
      <div className={s.root}>
        <h2>{fetchProductsDataError}</h2>
      </div>
    );
  }

  return (
    <div className={s.root}>
      <Preloader />
    </div>
  );
};
