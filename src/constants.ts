export const baseUrl = process.env.PUBLIC_URL;

export const routes = {
  MainPage: {
    path: `${baseUrl}/`,
    title: "Главная",
  },
  CartPage: {
    path: `${baseUrl}/cart`,
    title: "Корзина",
  },
};
