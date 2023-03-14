import { observer } from "mobx-react-lite";
import { Navigate } from "react-router-dom";
import { Preloader } from "../../components/Preloader/Preloader";
import { UserStatus } from "../../constants/enums";
import { routes } from "../../constants/routes";
import { store } from "../../store";

export const CartPage = observer(() => {
  const userStatus = store.getUserState().status;

  if (userStatus === UserStatus.Loading) {
    return <Preloader />;
  }

  if (userStatus !== UserStatus.Client) {
    return <Navigate to={routes.MainPage.path} />;
  }

  return <h2>CartPage</h2>;
});
