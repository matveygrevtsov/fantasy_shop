import { texts } from "../../constants/texts";
import { CreateProductForm } from "./components/CreateProductForm/CreateProductForm";

import s from "./CreateProductPage.module.css";

export function CreateProductPage() {
  return (
    <div className={s.root}>
      <h2 className={s.title}>{texts.CreateProductPage.title}</h2>
      <CreateProductForm className={s.createProductForm} />
    </div>
  );
}
