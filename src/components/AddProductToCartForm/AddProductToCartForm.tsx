import { Status, useAddProductToCartForm } from "./useAddProductToCartForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { texts } from "../../constants/texts";
import { Product } from "../../types";
import { Preloader } from "../Preloader/Preloader";
import cn from "classnames";

import s from "./AddProductToCartForm.module.css";

interface Props {
  product: Product;
  className?: string;
}

export const AddProductToCartForm: React.FC<Props> = ({
  product,
  className,
}) => {
  const { status, register, formState, submit, handleClick } =
    useAddProductToCartForm(product);
  const { addToCartText, addToCartSuccessText, addToCartErrorText, currency } =
    texts.ProductActions;
  const rootClassName = cn(s.root, className);

  if (status === Status.Loading) {
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
      {status === Status.Error && (
        <span className={s.error}>{addToCartErrorText}</span>
      )}
      {status === Status.Success && (
        <span className={s.success}>{addToCartSuccessText}</span>
      )}
    </div>
  );
};
