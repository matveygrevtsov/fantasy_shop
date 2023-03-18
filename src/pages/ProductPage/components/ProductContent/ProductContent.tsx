import { ProductActions } from "../../../../components/ProductActions/ProductActions";
import { Product } from "../../../../types";

import s from "./ProductContent.module.css";

export const ProductContent: React.FC<Product> = (product) => {
  return (
    <div className={s.root}>
      <div className={s.slider}>
        <img className={s.image} src={product.images[0]} alt={product.name} />
      </div>
      <div className={s.info}>
        <h1>{product.name}</h1>
        <div className={s.description}>{product.description}</div>
        <ProductActions product={product} />
      </div>
    </div>
  );
};
