import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { texts } from "../../constants/texts";
import { Product } from "../../types/product";
import { RoutePath } from "../../types/routing";
import { ProductPrice } from "../ProductPrice/ProductPrice";

import s from "./EditProductLink.module.css";

interface Props {
  product: Product;
  className?: string;
}

export const EditProductLink: React.FC<Props> = ({ product, className }) => {
  const { editText } = texts.ProductActions;
  const path = `${RoutePath.EditProductPage}?id=${product.id}`;

  return (
    <div className={className}>
      <ProductPrice price={product.price} />
      <Link to={path} className={s.link}>
        <span>{editText}</span>
        <FontAwesomeIcon icon={faEdit} className={s.editIcon} />
      </Link>
    </div>
  );
};
