import { ProductPrice } from "../../../../components/ProductPrice/ProductPrice";
import { Product } from "../../../../types/product";
import cn from "classnames";

import s from "./ProductCardInCart.module.css";

interface Props {
  product: Product;
  className?: string;
}

export const ProductCardInCart: React.FC<Props> = ({ product, className }) => {
  return (
    <div className={cn(s.root, className)}>
      <img
        alt={product.name}
        src={product.images[0]?.src}
        className={s.image}
      />
      <span>{product.name}</span>
      <ProductPrice price={product.price} />
      <span>X{product.amount}</span>
    </div>
  );
};
