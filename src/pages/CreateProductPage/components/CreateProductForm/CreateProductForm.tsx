import { useCreateProductsForm } from "./useCreateProductsForm";
import { ImagesUploader } from "../../../../components/ImagesUploader/ImagesUploader";
import { Product } from "../../../../types";
import { SubmitButton } from "../../../../components/Header/components/SubmitButton/SubmitButton";
import { texts } from "../../../../constants/texts";
import { Controller } from "react-hook-form";
import cn from "classnames";

import s from "./CreateProductForm.module.css";

interface Props {
  onSubmit: (product: Product) => void;
  onStartTyping: () => void;
  className?: string;
}

export function CreateProductForm({
  onSubmit,
  onStartTyping,
  className,
}: Props) {
  const { register, control, submit, formState } =
    useCreateProductsForm(onSubmit);
  const { labels, submitButtonText } =
    texts.CreateProductPage.CreateProductForm;
  const { errors } = formState;

  return (
    <form
      onClick={onStartTyping}
      onSubmit={submit}
      className={cn(s.root, className)}
    >
      <label className={s.label}>{labels.name}</label>
      <input className={s.nameInput} {...register("name")} />
      {errors.name && <span className={s.error}>{errors.name.message}</span>}
      <label className={s.label}>{labels.description}</label>
      <textarea className={s.descriptionInput} {...register("description")} />
      {errors.description && (
        <span className={s.error}>{errors.description.message}</span>
      )}
      <Controller
        name="images"
        control={control}
        render={({ field: { onChange } }) => (
          <ImagesUploader onSelect={onChange} className={s.imagesUploader} />
        )}
      />
      <SubmitButton disabled={!formState.isValid} className={s.submitButton}>
        {submitButtonText}
      </SubmitButton>
    </form>
  );
}
