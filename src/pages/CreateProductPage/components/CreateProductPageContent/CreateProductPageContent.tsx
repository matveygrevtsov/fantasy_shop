import { texts } from "../../../../constants/texts";
import { CreateProductForm } from "../CreateProductForm/CreateProductForm";
import {
  Status,
  useCreateProductPageContent,
} from "./useCreateProductPageContent";

import s from "./CreateProductPageContent.module.css";

export const CreateProductPageContent = () => {
  const { handleSubmit, handleStartTyping, state } =
    useCreateProductPageContent();
  const { createProductFailText, createProductSuccessText } =
    texts.CreateProductPage;

  return (
    <div className={s.root}>
      <h2 className={s.title}>{texts.CreateProductPage.title}</h2>
      <CreateProductForm
        onSubmit={handleSubmit}
        className={s.createProductForm}
        onStartTyping={handleStartTyping}
      />
      {state.status === Status.Error && (
        <span className={s.error}>{createProductFailText}</span>
      )}
      {state.status === Status.Success && (
        <span className={s.success}>{createProductSuccessText}</span>
      )}
    </div>
  );
};
