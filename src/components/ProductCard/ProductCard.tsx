import cn from "classnames";
import { Link } from "react-router-dom";
import { ProductActions } from "../ProductActions/ProductActions";
import TextTruncate from "react-text-truncate";
import { Product } from "../../types/product";
import { RoutePath } from "../../types/routing";

import s from "./ProductCard.module.css";

interface Props {
  product: Product;
  className?: string;
}

export const ProductCard = ({ product, className }: Props) => {
  return (
    <div className={cn(s.root, className)}>
      <Link to={`${RoutePath.ProductPage}?id=${product.id}`}>
        <div className={s.head}>
          <img alt={product.name} src={product.images[0]} className={s.image} />
        </div>
        <div className={s.body}>
          <h3 className={s.name}>{product.name}</h3>
          <div className={s.description}>
            <TextTruncate
              line={3}
              element="span"
              truncateText="…"
              text={product.description}
            />
          </div>
        </div>
      </Link>
      <ProductActions product={product} className={s.productActions} />
    </div>
  );
};
