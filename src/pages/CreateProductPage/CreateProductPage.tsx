import { texts } from "../../constants/texts";
import { CreateProductForm } from "./components/CreateProductForm/CreateProductForm";

import s from "./CreateProductPage.module.css";

export function CreateProductPage() {
  return (
    <div>
      <h1>{texts.CreateProductPage.title}</h1>
      <CreateProductForm />
    </div>
  );
}
