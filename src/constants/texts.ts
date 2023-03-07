import { ProductCategory, ProductsSortType, RouteName } from "./enums";

export const texts = {
  SignUpPage: {
    title: "Зарегистрироваться",
    alreadyHasAccountText: "Уже есть аккаунт ? Авторизуйтесь.",
    SignUpForm: {
      emailInput: {
        id: "email",
        label: "Введите email",
      },
      passwordInput: {
        id: "password",
        label: "Введите пароль",
      },
      passwordRepeatInput: {
        id: "passwordRepeat",
        label: "Повторите пароль",
      },
      submitText: "Зарегистрироваться",
      checkInputsValidationTimeInterval_ms: 1000,
      invalidEmailErrorText: "Невалидный email.",
      invalidPasswordErrorText: "Невалидный пароль.",
      passwordMismatchErrorText: "Пароли не совпадают.",
    },
  },
  SignInPage: {
    title: "Авторизоваться",
    SignInForm: {
      emailInput: {
        id: "email",
        label: "Введите email",
      },
      passwordInput: {
        id: "password",
        label: "Введите пароль",
      },
      submitText: "Авторизоваться",
      checkInputsValidationTimeInterval_ms: 1000,
      invalidEmailErrorText: "Невалидный email.",
      invalidPasswordErrorText: "Невалидный пароль.",
    },
  },
  Header: {
    logoutText: "Выйти",
    routesTitles: {
      [RouteName.MainPage]: "Главная",
      [RouteName.SignUpPage]: "Регистрация",
      [RouteName.SignInPage]: "Вход",
      [RouteName.CartPage]: "Корзина",
    },
  },
  Footer: {
    copyright: "© 2023 Copyright: Fantasy Shop",
  },
  ProductCategorySelect: {
    title: "Категория",
    variants: {
      [ProductCategory.Goblins]: "Гоблины",
      [ProductCategory.Orks]: "Орки",
      [ProductCategory.Dwarfs]: "Гномы",
    },
  },
  ProductSortTypeSelect: {
    title: "Сортировка",
    variants: {
      [ProductsSortType.AscendingOrder]: "По возрастанию",
      [ProductsSortType.DescendingOrder]: "По убыванию",
    },
  },
};
