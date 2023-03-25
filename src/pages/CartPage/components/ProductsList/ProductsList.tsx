import { ProductCardInCart } from "../ProductCardInCart/ProductCardInCart";
import { Product } from "../../../../types/product";
import cn from "classnames";

import s from "./ProductsList.module.css";

interface Props {
  products: Product[];
  className?: string;
}

export const ProductsList: React.FC<Props> = ({ products, className }) => {
  return (
    <ul className={cn(s.root, className)}>
      {products.map((product) => (
        <li key={product.id} className={s.li}>
          <ProductCardInCart product={product} />
        </li>
      ))}
    </ul>
  );
};
