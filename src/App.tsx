import { BrowserRouter, Routes, Route } from "react-router-dom";
import { constants } from "./constants";
import { CartPage } from "./pages/CartPage/CartPage";
import { MainPage } from "./pages/MainPage/MainPage";
import { SignUpPage } from "./pages/SignUpPage/SignUpPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={constants.routes.CartPage.path} element={<CartPage />} />
        <Route
          path={constants.routes.SignUpPage.path}
          element={<SignUpPage />}
        />
        <Route path="*" element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
