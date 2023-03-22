import { Cart } from "../../../../types/user";

import s from "./CartPageContent.module.css";

interface Props {
  cart: Cart;
}

export const CartPageContent: React.FC<Props> = ({ cart }) => {
  return (
    <div>
      <h2 className={s.title}>Корзина</h2>
    </div>
  );
};
