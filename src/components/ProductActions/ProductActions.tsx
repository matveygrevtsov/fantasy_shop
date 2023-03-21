import { observer } from "mobx-react-lite";
import { Product } from "../../types";
import { store } from "../../store";
import { UserRole, UserStatus } from "../../constants/enums";
import { AddProductToCartForm } from "../AddProductToCartForm/AddProductToCartForm";
import { EditProductLink } from "../EditProductLink/EditProductLink";

interface Props {
  product: Product;
  className?: string;
}

export const ProductActions = observer(({ product, className }: Props) => {
  const userState = store.getUserState();

  // Если юзер авторизован и имеет права администратора - отображаем ссылку на редактирование продукта.
  if (
    userState.status === UserStatus.Authorized &&
    userState.data.role === UserRole.Admin
  ) {
    return (
      <div className={className}>
        <EditProductLink product={product} />
      </div>
    );
  }

  // По умолчанию отображаем форму добавления продукта в корзину.
  return (
    <div className={className}>
      <AddProductToCartForm product={product} />
    </div>
  );
});
