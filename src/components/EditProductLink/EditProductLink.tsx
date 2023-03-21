import { Link } from "react-router-dom";
import { RoutePath } from "../../constants/enums";
import { Product } from "../../types";
import cn from "classnames";
import { texts } from "../../constants/texts";

import s from "./EditProductLink.module.css";

interface Props {
  product: Product;
  className?: string;
}

export const EditProductLink: React.FC<Props> = ({ product, className }) => {
  const { editText } = texts.ProductActions;
  const path = `${RoutePath.EditProductPage}?id=${product.id}`;

  return (
    <Link to={path} className={cn(s.root, className)}>
      {editText}
    </Link>
  );
};
