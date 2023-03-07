import { observer } from "mobx-react-lite";
import { Navigate } from "react-router-dom";
import { routes } from "../../constants/routes";
import { store, UserStatus } from "../../store";

export const CartPage = observer(() => {
  const userState = store.getUserState();

  if (userState.userStatus !== UserStatus.LoggedIn) {
    return <Navigate to={routes.MainPage.path} />;
  }

  return <h2>CartPage</h2>;
});
