import { observer } from "mobx-react-lite";
import { Navigate } from "react-router-dom";
import { store } from "../../store";
import { Preloader } from "../../components/Preloader/Preloader";
import { RoutePath, UserRole, UserStatus } from "../../constants/enums";
import { SignUpPageContent } from "./components/SignUpPageContent/SignUpPageContent";

export const SignUpPage = observer(() => {
  const userState = store.getUserState();

  // Если юзер не авторизован - отображаем контент
  if (userState.status === UserStatus.Unauthorized) {
    return <SignUpPageContent />;
  }

  // Если юзер авторизован - редиректим его с этой страницы
  if (userState.status === UserStatus.Authorized) {
    const routeToRedirect =
      userState.data.role === UserRole.Admin
        ? RoutePath.CreateProductPage
        : RoutePath.CartPage;
    return <Navigate to={routeToRedirect} />;
  }

  // По умолчанию отображаем прелоадер
  return <Preloader />;
});
