import { Status, useAddProductToCart } from "./useAddProductToCart";
import { texts } from "../../constants/texts";
import { Preloader } from "../Preloader/Preloader";
import { Product } from "../../types/product";
import { ClientData } from "../../types/user";
import { AddProductToCartForm } from "./components/AddProductToCartForm/AddProductToCartForm";
import cn from "classnames";

import s from "./AddProductToCart.module.css";

interface Props {
  product: Product;
  clientData?: ClientData;
  className?: string;
}

export const AddProductToCart: React.FC<Props> = ({
  product,
  clientData,
  className,
}) => {
  const { state, handleSubmit, handleClick } = useAddProductToCart(
    product,
    clientData
  );
  const {
    addToCartErrorText,
    addToCartSoldOutText,
    addToCartPartialSuccessText,
    addToCartSuccessText,
    currency,
  } = texts.ProductActions;
  const rootClassName = cn(s.root, className);

  if (state.status === Status.Loading) {
    return (
      <div className={rootClassName}>
        <Preloader />
      </div>
    );
  }

  return (
    <div onClick={handleClick} className={rootClassName}>
      <h2 className={s.price}>
        {product.price}
        {currency}
      </h2>
      <AddProductToCartForm
        onSubmit={handleSubmit}
        className={s.addProductToCartForm}
      />
      {state.status === Status.Error && (
        <div className={s.error}>
          {addToCartErrorText} ({state.errorMessage})
        </div>
      )}
      {state.status === Status.Success && (
        <div className={s.success}>{addToCartSuccessText}</div>
      )}
      {state.status === Status.PartialSuccess && (
        <div className={s.success}>
          {addToCartPartialSuccessText}
          {state.realAmount}
        </div>
      )}
      {state.status === Status.SoldOut && (
        <div className={s.error}>{addToCartSoldOutText}</div>
      )}
    </div>
  );
};
