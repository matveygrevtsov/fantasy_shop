import { observer } from "mobx-react-lite";
import { store } from "../../store";
import { Navigate } from "react-router-dom";
import { Preloader } from "../../components/Preloader/Preloader";
import { RoutePath, UserRole, UserStatus } from "../../constants/enums";
import { SignInPageContent } from "./components/SignInPageContent/SignInPageContent";

export const SignInPage = observer(() => {
  const userState = store.getUserState();

  if (userState.status === UserStatus.Unauthorized) {
    return <SignInPageContent />;
  }

  if (userState.status === UserStatus.Authorized) {
    const routeToNavigate =
      userState.data.role === UserRole.Admin
        ? RoutePath.CreateProductPage
        : RoutePath.CartPage;
    return <Navigate to={routeToNavigate} />;
  }

  return <Preloader />;
});
