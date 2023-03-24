import { texts } from "../../constants/texts";
import cn from "classnames";

import s from "./ProductPrice.module.css";

interface Props {
  price: number;
  className?: string;
}

export const ProductPrice: React.FC<Props> = ({ price, className }) => {
  const { currency } = texts.ProductActions;

  return (
    <h2 className={cn(s.root, className)}>
      {price}
      {currency}
    </h2>
  );
};
