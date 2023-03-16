import { observer } from "mobx-react-lite";
import { Navigate } from "react-router-dom";
import { Preloader } from "../../components/Preloader/Preloader";
import { RoutePath, UserStatus } from "../../constants/enums";
import { store } from "../../store";

export const CartPage = observer(() => {
  const userStatus = store.getUserState().status;

  if (userStatus === UserStatus.Loading) {
    return <Preloader />;
  }

  if (userStatus !== UserStatus.Client) {
    return <Navigate to={RoutePath.MainPage} />;
  }

  return <h2>CartPage</h2>;
});
