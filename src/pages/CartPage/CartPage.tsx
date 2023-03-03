import { observer } from "mobx-react-lite";
import { Navigate } from "react-router-dom";
import { Header } from "../../components/Header/Header";
import { constants } from "../../constants";
import { store, UserStatus } from "../../store";

export const CartPage = observer(() => {
  const userState = store.getUserState();

  if (userState.userStatus !== UserStatus.Client) {
    return <Navigate to={constants.routes.MainPage.path} />;
  }

  return (
    <div>
      <Header />
      <h2>CartPage</h2>
    </div>
  );
});
