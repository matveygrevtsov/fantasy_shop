import { Button } from "../../../../components/Button/Button";
import { Product } from "../../../../types";

import s from "./ProductContent.module.css";

export const ProductContent: React.FC<Product> = ({
  name,
  description,
  price,
  images,
  productCategories,
}) => {
  return (
    <div className={s.root}>
      <h1>{name}</h1>
      <div className={s.container}>
        <div>slider</div>
        <div className={s.rightColumn}>
          <Button>Добавить в корзину</Button>
        </div>
      </div>
      <h2>Описание</h2>
      <span>{description}</span>
    </div>
  );
};
