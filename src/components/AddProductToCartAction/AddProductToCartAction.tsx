import { Status, useAddProductToCartAction } from "./useAddProductToCartAction";
import { texts } from "../../constants/texts";
import { Preloader } from "../Preloader/Preloader";
import { AddProductToCartForm } from "../AddProductToCartForm/AddProductToCartForm";
import cn from "classnames";
import { Product } from "../../types/product";
import { ClientData } from "../../types/user";

import s from "./AddProductToCartAction.module.css";

interface Props {
  product: Product;
  clientData?: ClientData;
  className?: string;
}

export const AddProductToCartAction: React.FC<Props> = ({
  product,
  clientData,
  className,
}) => {
  const { state, handleSubmit, handleClick } = useAddProductToCartAction(
    product,
    clientData
  );
  const { addToCartSuccessText, addToCartErrorText, currency } =
    texts.ProductActions;
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
    </div>
  );
};
