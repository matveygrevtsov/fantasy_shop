import { observer } from "mobx-react-lite";
import { Navigate } from "react-router-dom";
import { Preloader } from "../../components/Preloader/Preloader";
import { RoutePath, UserRole, UserStatus } from "../../constants/enums";
import { store } from "../../store";
import { CreateProductPageContent } from "./components/CreateProductPageContent/CreateProductPageContent";

export const CreateProductPage = observer(() => {
  const userState = store.getUserState();

  // Если юзер авторизован и имеет роль админа - отображаем контент.
  if (
    userState.status === UserStatus.Authorized &&
    userState.data.role === UserRole.Admin
  ) {
    return <CreateProductPageContent />;
  }

  // Если юзер ещё не загрузился - отображаем прелоадер.
  if (userState.status === UserStatus.Loading) {
    return <Preloader />;
  }

  // По умолчанию редиректим на главную.
  return <Navigate to={RoutePath.MainPage} />;
});
