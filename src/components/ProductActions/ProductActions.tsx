import { observer } from "mobx-react-lite";
import { store } from "../../store";
import { EditProductLink } from "../EditProductLink/EditProductLink";
import { AddProductToCart } from "../AddProductToCart/AddProductToCart";
import { Product } from "../../types/product";
import { UserRole, UserStatus } from "../../types/user";

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

  // По умолчанию отображаем компоненту добавления продукта в корзину.
  return (
    <div className={className}>
      <AddProductToCart
        product={product}
        clientData={
          userState.status === UserStatus.Authorized &&
          userState.data.role === UserRole.Client
            ? userState.data.clientData
            : undefined
        }
      />
    </div>
  );
});
