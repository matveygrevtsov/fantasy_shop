import { HashRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Header/components/Layout/Layout";
import { routes } from "./constants/routes";
import { CartPage } from "./pages/CartPage/CartPage";
import { CreateProductPage } from "./pages/CreateProductPage/CreateProductPage";
import { MainPage } from "./pages/MainPage/MainPage";
import { SignInPage } from "./pages/SignInPage/SignInPage";
import { SignUpPage } from "./pages/SignUpPage/SignUpPage";

function App() {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path={routes.CartPage.path} element={<CartPage />} />
          <Route path={routes.SignUpPage.path} element={<SignUpPage />} />
          <Route path={routes.SignInPage.path} element={<SignInPage />} />
          <Route path={routes.SignInPage.path} element={<SignInPage />} />
          <Route
            path={routes.CreateProductPage.path}
            element={<CreateProductPage />}
          />
          <Route path="*" element={<MainPage />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
}

export default App;
