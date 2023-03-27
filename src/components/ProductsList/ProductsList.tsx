import { Product } from "../../types/product";
import { ProductCard } from "../ProductCard/ProductCard";
import { texts } from "../../constants/texts";
import cn from "classnames";

import s from "./ProductsList.module.css";

interface Props {
  products: Product[];
  className?: string;
}

export function ProductsList({ products, className }: Props) {
  const { noResultsText } = texts.ProductSearchPage;

  if (products.length === 0) {
    return (
      <div className={className}>
        <h2>{noResultsText}</h2>
      </div>
    );
  }

  return (
    <ul className={cn(s.root, className)}>
      {products.map((productInfo) => (
        <ProductCard key={productInfo.id} product={productInfo} />
      ))}
    </ul>
  );
}
