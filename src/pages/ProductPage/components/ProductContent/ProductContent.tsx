import { Product } from "../../../../types";
import { AddToCartForm } from "../AddToCartForm/AddToCartForm";

import s from "./ProductContent.module.css";

export const ProductContent: React.FC<Product> = ({
  id,
  name,
  description,
  price,
  images,
  productCategories,
}) => {
  const handleAddProductToCart = (amount: number): Promise<void> =>
    new Promise((resolve) => setTimeout(resolve, 1000));

  return (
    <div className={s.root}>
      <div className={s.slider}>
        <img className={s.image} src={images[0]} alt={name} />
      </div>
      <div className={s.info}>
        <h1>{name}</h1>
        <span className={s.price}>{price}₽</span>
        <div className={s.description}>{description}</div>
        <AddToCartForm onSubmit={handleAddProductToCart} />
      </div>
    </div>
  );
};
