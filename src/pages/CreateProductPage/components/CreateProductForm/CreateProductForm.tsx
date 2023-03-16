import { useCreateProductsForm } from "./useCreateProductsForm";
import { ImagesUploader } from "../../../../components/ImagesUploader/ImagesUploader";
import { Button } from "../../../../components/Button/Button";
import { texts } from "../../../../constants/texts";
import { Controller } from "react-hook-form";
import { CreateProductFormData } from "../../../../types";
import cn from "classnames";

import s from "./CreateProductForm.module.css";

interface Props {
  onSubmit: (product: CreateProductFormData) => void;
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
      <div className={s.formField}>
        <label className={s.label}>{labels.name}</label>
        <input className={s.nameInput} {...register("name")} />
        {errors.name && <span className={s.error}>{errors.name.message}</span>}
      </div>

      <div className={s.formField}>
        <label className={s.label}>{labels.description}</label>
        <textarea className={s.descriptionInput} {...register("description")} />
        {errors.description && (
          <span className={s.error}>{errors.description.message}</span>
        )}
      </div>

      <div className={s.formField}>
        <label className={s.label}>{labels.price}</label>
        <input className={s.priceInput} {...register("price")} />
        {errors.price && (
          <span className={s.error}>{errors.price.message}</span>
        )}
      </div>

      <Controller
        name="images"
        control={control}
        render={({ field: { onChange } }) => (
          <ImagesUploader onSelect={onChange} className={s.imagesUploader} />
        )}
      />
      <Button disabled={!formState.isValid} className={s.submitButton}>
        {submitButtonText}
      </Button>
    </form>
  );
}
