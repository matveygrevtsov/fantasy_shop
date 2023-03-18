import { AddToCartFormStatus, useProductActions } from "./useProductActions";
import { observer } from "mobx-react-lite";
import { Preloader } from "../Preloader/Preloader";
import { texts } from "../../constants/texts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { Product } from "../../types";
import { store } from "../../store";
import { UserStatus } from "../../constants/enums";
import { Link } from "react-router-dom";

import s from "./ProductActions.module.css";

interface Props {
  product: Product;
  className?: string;
}

export const ProductActions = observer(({ product, className }: Props) => {
  const { state, register, formState, submit, handleClick } =
    useProductActions(product);
  const {
    addToCartText,
    editText,
    addToCartSuccessText,
    addToCartErrorText,
    currency,
    productIsOutOfStock,
  } = texts.ProductActions;

  if (!product.amount) {
    return <h2 className={s.productIsOutOfStock}>{productIsOutOfStock}</h2>;
  }

  if (
    state === AddToCartFormStatus.Loading ||
    store.getUserState().status === UserStatus.Loading
  ) {
    return (
      <div className={className}>
        <Preloader />
      </div>
    );
  }

  if (store.getUserState().status === UserStatus.Admin) {
    return (
      <Link to={"#"} className={s.editProductLink}>
        {editText}
      </Link>
    );
  }

  return (
    <div className={className} onClick={handleClick}>
      <h2 className={s.price}>
        {product.price}
        {currency}
      </h2>
      <form onSubmit={submit} className={s.form}>
        <input
          {...register("amount")}
          type="number"
          min="1"
          max="100"
          className={s.amountInput}
        />
        <button
          disabled={!formState.isValid}
          className={s.button}
          type="submit"
        >
          <FontAwesomeIcon icon={faCartShopping} className={s.cartIcon} />
          {addToCartText}
        </button>
      </form>
      {state === AddToCartFormStatus.Error && (
        <span className={s.error}>{addToCartErrorText}</span>
      )}
      {state === AddToCartFormStatus.Success && (
        <span className={s.success}>{addToCartSuccessText}</span>
      )}
    </div>
  );
});
