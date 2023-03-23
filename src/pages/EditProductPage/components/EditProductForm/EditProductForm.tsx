import cn from "classnames";
import { useEditProductForm } from "./useEditProductForm";
import { Controller } from "react-hook-form";
import Select from "react-select";
import { texts } from "../../../../constants/texts";
import { ImagesUploader } from "../../../../components/ImagesUploader/ImagesUploader";
import { Button } from "../../../../components/Button/Button";
import { EditProductFormValues, Product } from "../../../../types/product";
import { ImagesRemover } from "../../../../components/ImagesRemover/ImagesRemover";

import s from "./EditProductForm.module.css";

interface Props {
  onSubmit: (editProductFormValues: EditProductFormValues) => void;
  productDataToEdit: Product;
  className?: string;
}

export const EditProductForm: React.FC<Props> = ({
  onSubmit,
  productDataToEdit,
  className,
}) => {
  const { register, handleSubmit, control, formState, handleStartTyping } =
    useEditProductForm(productDataToEdit, onSubmit);
  const { errors } = formState;
  const { labels, submitText } = texts.EditProductPage.editProductForm;

  return (
    <form
      onClick={handleStartTyping}
      onSubmit={handleSubmit}
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

      <div className={s.formField}>
        <label className={s.label}>{labels.amount}</label>
        <input className={s.amountInput} {...register("amount")} />
        {errors.amount && (
          <span className={s.error}>{errors.amount.message}</span>
        )}
      </div>

      <div className={s.formField}>
        <label className={s.label}>{texts.ProductCategorySelect.title}</label>
        <Controller
          name="productCategories"
          control={control}
          render={({ field: { onChange } }) => {
            const { options } = texts.ProductCategorySelect;
            const defaultValue = options.filter(({ value }) =>
              productDataToEdit.productCategories.includes(value)
            );

            return (
              <Select
                defaultValue={defaultValue}
                placeholder={texts.ProductCategorySelect.title}
                onChange={(selectedOptions) =>
                  onChange(selectedOptions.map(({ value }) => value))
                }
                options={options}
                isMulti
                className={s.productCategoriesSelect}
              />
            );
          }}
        />
      </div>

      <div className={s.formField}>
        <label className={s.label}>{labels.deleteImages}</label>
        <Controller
          name="imagesToRemove"
          control={control}
          render={({ field: { onChange } }) => (
            <ImagesRemover
              images={productDataToEdit.images}
              onSelect={onChange}
              className={s.imagesRemover}
            />
          )}
        />
      </div>

      <div className={s.formField}>
        <label className={s.label}>{labels.addNewImages}</label>
        <Controller
          name="imagesToUpload"
          control={control}
          render={({ field: { onChange } }) => (
            <ImagesUploader onSelect={onChange} className={s.imagesUploader} />
          )}
        />
      </div>

      <Button disabled={!formState.isValid} className={s.submitButton}>
        {submitText}
      </Button>
    </form>
  );
};
