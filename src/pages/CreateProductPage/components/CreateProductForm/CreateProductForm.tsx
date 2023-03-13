import { useCreateProductsForm } from "./useCreateProductsForm";
import { ImagesUploader } from "../../../../components/ImagesUploader/ImagesUploader";
import cn from "classnames";

import s from "./CreateProductForm.module.css";

interface Props {
  className?: string;
}

export function CreateProductForm({ className }: Props) {
  const {} = useCreateProductsForm();

  return (
    <form className={cn(s.root, className)}>
      <ImagesUploader onSelect={console.log} className={s.imagesUploader} />
    </form>
  );
}
