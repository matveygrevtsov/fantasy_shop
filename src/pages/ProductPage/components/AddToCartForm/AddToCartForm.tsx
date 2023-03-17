import { AddToCartFormStatus, useAddToCartForm } from "./useAddToCartForm";
import { observer } from "mobx-react-lite";
import { Preloader } from "../../../../components/Preloader/Preloader";
import cn from "classnames";

import s from "./AddToCartForm.module.css";

interface Props {
  onSubmit: (amount: number) => Promise<void>;
  className?: string;
}

export const AddToCartForm = observer(({ onSubmit, className }: Props) => {
  const { state, register, formState, submit, handleClick } =
    useAddToCartForm(onSubmit);

  if (state === AddToCartFormStatus.Loading) {
    return <Preloader />;
  }

  return (
    <div onClick={handleClick}>
      <form onSubmit={submit} className={cn(s.root, className)}>
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
          Добавить в корзину
        </button>
      </form>
      {state === AddToCartFormStatus.Error && (
        <span className={s.error}>
          Не удалось добавить товар в корзину. Повторите попытку позже.
        </span>
      )}
      {state === AddToCartFormStatus.Success && (
        <span className={s.success}>Товар успешно добавлен в корзину.</span>
      )}
    </div>
  );
});
