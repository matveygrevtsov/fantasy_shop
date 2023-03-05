import { HashRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Header/components/Layout/Layout";
import { constants } from "./constants";
import { CartPage } from "./pages/CartPage/CartPage";
import { MainPage } from "./pages/MainPage/MainPage";
import { SignInPage } from "./pages/SignInPage/SignInPage";
import { SignUpPage } from "./pages/SignUpPage/SignUpPage";

function App() {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path={constants.routes.CartPage.path} element={<CartPage />} />
          <Route
            path={constants.routes.SignUpPage.path}
            element={<SignUpPage />}
          />
          <Route
            path={constants.routes.SignInPage.path}
            element={<SignInPage />}
          />
          <Route path="*" element={<MainPage />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
}

export default App;
