import { HashRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout/Layout";
import { CartPage } from "./pages/CartPage/CartPage";
import { CreateProductPage } from "./pages/CreateProductPage/CreateProductPage";
import { EditProductPage } from "./pages/EditProductPage/EditProductPage";
import { MainPage } from "./pages/MainPage/MainPage";
import { ProductPage } from "./pages/ProductPage/ProductPage";
import { SignInPage } from "./pages/SignInPage/SignInPage";
import { SignUpPage } from "./pages/SignUpPage/SignUpPage";
import { RoutePath } from "./types/routing";

function App() {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path={RoutePath.CartPage} element={<CartPage />} />
          <Route path={RoutePath.SignUpPage} element={<SignUpPage />} />
          <Route path={RoutePath.SignInPage} element={<SignInPage />} />
          <Route
            path={RoutePath.CreateProductPage}
            element={<CreateProductPage />}
          />
          <Route path={RoutePath.ProductPage} element={<ProductPage />} />
          <Route
            path={RoutePath.EditProductPage}
            element={<EditProductPage />}
          />
          <Route path="*" element={<MainPage />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
}

export default App;
