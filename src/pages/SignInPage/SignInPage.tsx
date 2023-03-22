import { observer } from "mobx-react-lite";
import { store } from "../../store";
import { Navigate } from "react-router-dom";
import { Preloader } from "../../components/Preloader/Preloader";
import { SignInPageContent } from "./components/SignInPageContent/SignInPageContent";
import { RoutePath } from "../../types/routing";
import { UserRole, UserStatus } from "../../types/user";

export const SignInPage = observer(() => {
  const userState = store.getUserState();

  // Если юзер не авторизован - отображаем контент.
  if (userState.status === UserStatus.Unauthorized) {
    return <SignInPageContent />;
  }

  // Если юзер авторизован - редиректим с этой страницы.
  if (userState.status === UserStatus.Authorized) {
    const routeToNavigate =
      userState.data.role === UserRole.Admin
        ? RoutePath.CreateProductPage
        : RoutePath.CartPage;
    return <Navigate to={routeToNavigate} />;
  }

  // По умолчанию отображаем прелоадер.
  return <Preloader />;
});
