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
  ProductsSearchForm: {
    searchProductPlaceholder: "Введите название продукта",
    searchProductsParamsTitle: "Фильтры",
    ProductCategorySelect: {
      title: "Категория",
      placeholder: "Выбрать категории",
      options: [
        {
          value: ProductCategory.Goblins,
          label: "Гоблины",
        },
        {
          value: ProductCategory.Orks,
          label: "Орки",
        },
        {
          value: ProductCategory.Dwarfs,
          label: "Гномы",
        },
      ],
    },
    ProductSortTypeSelect: {
      title: "Сортировка",
      options: [
        {
          value: ProductsSortType.AscendingOrderPrice,
          label: "По возрастанию цены",
        },
        {
          value: ProductsSortType.DescendingOrderPrice,
          label: "По убыванию цены",
        },
      ],
    },
  },
};
