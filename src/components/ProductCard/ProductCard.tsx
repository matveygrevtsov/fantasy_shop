import cn from "classnames";
import { Product } from "../../types";
import { Link } from "react-router-dom";
import { RoutePath } from "../../constants/enums";
import { ProductActions } from "../ProductActions/ProductActions";
import TextTruncate from "react-text-truncate";

import s from "./ProductCard.module.css";

interface Props {
  info: Product;
  className?: string;
}

export const ProductCard = ({ info, className }: Props) => {
  return (
    <div className={cn(s.root, className)}>
      <Link to={`${RoutePath.ProductPage}?id=${info.id}`}>
        <div className={s.head}>
          <img alt={info.name} src={info.images[0]} className={s.image} />
        </div>
        <div className={s.body}>
          <h3 className={s.name}>{info.name}</h3>
          <div className={s.description}>
            <TextTruncate
              line={3}
              element="span"
              truncateText="…"
              text={info.description}
            />
          </div>
        </div>
      </Link>
      <ProductActions
        className={s.productActions}
        productId={info.id}
        price={info.price}
      />
    </div>
  );
};
