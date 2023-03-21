import { observer } from "mobx-react-lite";
import { Navigate } from "react-router-dom";
import { Preloader } from "../../components/Preloader/Preloader";
import { RoutePath, UserRole, UserStatus } from "../../constants/enums";
import { store } from "../../store";
import { CartPageContent } from "./components/CartPageContent/CartPageContent";

export const CartPage = observer(() => {
  const userState = store.getUserState();

  // Если юзер авторизован и имеет роль клиента - отображаем контент.
  if (
    userState.status === UserStatus.Authorized &&
    userState.data.role !== UserRole.Client
  ) {
    return <CartPageContent />;
  }

  // Если юзер ещё не загрузился - отображаем прелоадер
  if (userState.status === UserStatus.Loading) {
    return <Preloader />;
  }

  // По умолчанию редиректим на главную.
  return <Navigate to={RoutePath.MainPage} />;
});
