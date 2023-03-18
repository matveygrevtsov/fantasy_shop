import { AddToCartFormStatus, useProductActions } from "./useProductActions";
import { observer } from "mobx-react-lite";
import { Preloader } from "../Preloader/Preloader";
import { texts } from "../../constants/texts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

import s from "./ProductActions.module.css";

interface Props {
  productId: string;
  price: number;
  className?: string;
}

export const ProductActions = observer(
  ({ productId, price, className }: Props) => {
    const { state, register, formState, submit, handleClick } =
      useProductActions(productId);
    const {
      addToCartText,
      editText,
      addToCartSuccessText,
      addToCartErrorText,
      currency,
    } = texts.ProductActions;

    if (state === AddToCartFormStatus.Loading) {
      return (
        <div className={className}>
          <Preloader />
        </div>
      );
    }

    return (
      <div className={className} onClick={handleClick}>
        <h2 className={s.price}>
          {price}
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
  }
);
