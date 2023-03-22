import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAddProductToCartForm } from "./useAddProductToCartForm";
import { texts } from "../../../../constants/texts";

import s from "./AddProductToCartForm.module.css";

interface Props {
  onSubmit: (amount: number) => void;
  className?: string;
}

export const AddProductToCartForm: React.FC<Props> = ({
  onSubmit,
  className,
}) => {
  const { register, handleSubmit, formState } =
    useAddProductToCartForm(onSubmit);
  const { addToCartText } = texts.ProductActions;
  const validationErrorMessage = formState.errors.amount?.message;

  return (
    <div className={className}>
      <form onSubmit={handleSubmit} className={s.form}>
        <input
          {...register("amount")}
          type="number"
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
      {validationErrorMessage && (
        <div className={s.validationErrorMessage}>{validationErrorMessage}</div>
      )}
    </div>
  );
};
