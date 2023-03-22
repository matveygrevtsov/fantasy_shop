import { Product } from "../../types/product";
import { ProductCard } from "../ProductCard/ProductCard";
import cn from "classnames";

import s from "./ProductsList.module.css";

interface Props {
  products: Product[];
  className?: string;
}

export function ProductsList({ products, className }: Props) {
  return (
    <ul className={cn(s.root, className)}>
      {products.map((productInfo) => (
        <ProductCard key={productInfo.id} product={productInfo} />
      ))}
    </ul>
  );
}
