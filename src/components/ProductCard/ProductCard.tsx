import cn from "classnames";
import { observer } from "mobx-react-lite";
import { Product } from "../../types";
import { useProductCard } from "./useProductCard";
import { store } from "../../store";
import { Link } from "react-router-dom";
import { texts } from "../../constants/texts";
import { Button } from "../Button/Button";

import s from "./ProductCard.module.css";

interface Props {
  info: Product;
  className?: string;
}

export const ProductCard = observer(({ info, className }: Props) => {
  const {} = useProductCard(info);
  const { addToCartText, editText } = texts.ProductCard;

  return (
    <div className={cn(s.root, className)}>
      <div className={s.head}>
        <img alt={info.name} src={info.images[0]} className={s.image} />
      </div>
      <div className={s.body}>
        <h3 className={s.name}>{info.name}</h3>
        <div className={s.description}>{info.description}</div>
        {store.isUserAdmin() ? (
          <Link to="">{editText}</Link>
        ) : (
          <Button className={s.addToCartButton}>{addToCartText}</Button>
        )}
      </div>
    </div>
  );
});
