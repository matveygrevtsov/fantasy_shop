import { Link } from "react-router-dom";
import { texts } from "../../constants/texts";
import { Product } from "../../types/product";
import { RoutePath } from "../../types/routing";
import cn from "classnames";

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
