import { observer } from "mobx-react-lite";
import { store } from "../../store";
import { Navigate } from "react-router-dom";
import { Preloader } from "../../components/Preloader/Preloader";
import { EditProductPageContent } from "./components/EditProductPageContent/EditProductPageContent";
import { UserRole, UserStatus } from "../../types/user";
import { RoutePath } from "../../types/routing";

export const EditProductPage = observer(() => {
  const userState = store.getUserState();

  // Если юзер авторизован и имеет роль администратора - отображаем контент страницы.
  if (
    userState.status === UserStatus.Authorized &&
    userState.data.role === UserRole.Admin
  ) {
    return <EditProductPageContent />;
  }

  // Если юзер ещё не загрузился - отображаем прелоадер.
  if (userState.status === UserStatus.Loading) {
    return <Preloader />;
  }

  // По умолчанию редиректим на главную.
  return <Navigate to={RoutePath.CartPage} />;
});
