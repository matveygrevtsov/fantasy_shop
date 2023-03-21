import { observer } from "mobx-react-lite";
import { Navigate } from "react-router-dom";
import { Preloader } from "../../components/Preloader/Preloader";
import { RoutePath, UserRole, UserStatus } from "../../constants/enums";
import { store } from "../../store";
import { CartPageContent } from "./components/CartPageContent/CartPageContent";

export const CartPage = observer(() => {
  const userState = store.getUserState();

  // Если юзер не авторизован - редиректим на главную.
  if (userState.status === UserStatus.Unauthorized) {
    return <Navigate to={RoutePath.MainPage} />;
  }

  // Если юзер авторизован, но не имеет роль клиента - редиректим на главную.
  if (
    userState.status === UserStatus.Authorized &&
    userState.data.role !== UserRole.Client
  ) {
    return <Navigate to={RoutePath.MainPage} />;
  }

  // Если юзер авторизован и имеет роль клиента - отображаем контент.
  if (
    userState.status === UserStatus.Authorized &&
    userState.data.role !== UserRole.Client
  ) {
    return <CartPageContent />;
  }

  // По умолчанию отображаем прелоадер.
  return <Preloader />;
});
