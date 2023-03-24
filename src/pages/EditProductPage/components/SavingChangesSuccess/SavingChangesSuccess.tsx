import { Link } from "react-router-dom";
import { texts } from "../../../../constants/texts";
import { EditProductFormValues } from "../../../../types/product";
import { RoutePath } from "../../../../types/routing";

import s from "./SavingChangesSuccess.module.css";

interface Props {
  productData: EditProductFormValues;
}

export const SavingChangesSuccess: React.FC<Props> = ({ productData }) => {
  const { savingChangesSuccess, viewChangesLink } = texts.EditProductPage;
  const link = `${RoutePath.ProductPage}?id=${productData.id}`;

  return (
    <div>
      <span>{savingChangesSuccess}</span>
      <Link to={link} className={s.link}>
        {viewChangesLink}
      </Link>
    </div>
  );
};
