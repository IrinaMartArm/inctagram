export const ru = {
  favorites: {
    title: "Страница",
  },
  logOut: {
    buttonNo: "Нет",
    buttonYes: "Да",
    title: "Выход",
    warning: "Вы действительно хотите выйти из своей учетной записи",
  },
  passwordRecovery: {
    back: "Назад для входа в систему",
    createTitle: "Создать новый пароль",
    emailError: "Пользователь с таким адресом электронной почты не существует",
    hidden:
      "Ссылка была отправлена по электронной почте.\n" +
      "Если вы не получили письмо, отправьте ссылку еще раз",
    rules: "Ваш пароль должен содержать от 6 до 20 символов",
    send: "Отправить ссылку",
    send2: "Отправить ссылку еще раз",
    text: "Введите свой адрес электронной почты, и мы вышлем вам дальнейшие инструкции",
    title: "Забыли пароль",
  },
  policy: {
    title: "Политика конфиденциальности",
  },
  profile: {
    followers: "Подписчики",
    following: "Following",
    general: {
      1: "Privacy Policy",
      child: "A user under 13 cannot create a\n" + "profile. <1></1>",
      fell: "Ошибка! Сервер недоступен!",
      success: "Ваши настройки сохранены!",
    },
    publications: "Публикации",
    settingsBtn: "Настройки профиля",
  },
  signIn: {
    errors: {
      email:
        "Электронная почта должна соответствовать формату\n" +
        "example@example.com",
      invalidPassword: "Пароль должен содержать",
      loginError:
        "Указан неверный адрес электронной почты или пароль. Попробуйте еще раз, пожалуйста",
      passwordMax: "Максимальное количество символов 20",
      passwordMin: "Минимальное количество символов 6",
      required: "Обязательное поле",
      unknownError: "Unknown error",
    },
    forgotPassword: "Забыли пароль",
    password: "Пароль",
    question: "У вас нет учетной записи?",
    signUp: "Зарегистрироваться",
    title: "Войти",
  },
  signUp: {
    1: "Условиями использования",
    2: "Политикой конфиденциальности",
    agree: "Я согласен с  <1></1> и <2></2>",
    back: "Вернуться к регистрации",
    checkbox: "Необходимо согласиться с условиями",
    confirm: "Пароль и подтверждение пароля должны совпадать",
    confirmed: "Ваш адрес электронной почты подтвержден",
    congratulations: "Поздравляем!",
    created: "Аккаунт создан.",
    emailMin: "Строка должна содержать не менее 1 символа",
    expired: "Срок действия ссылки для подтверждения электронной почты истек",
    formEmail:
      "Электронная почта должна соответствовать формату\n" +
      "example@example.com",
    haveSent:
      "Мы отправили ссылку для подтверждения вашего электронного письма на ",
    invalidPassword: "Пароль должен содержать",
    name: "Имя пользователя",
    password: "Пароль",
    password2: "Подтверждение пароля",
    passwordMax: "Максимальное количество символов 20",
    passwordMin: "Минимальное количество символов 6",
    question: "У вас уже есть аккаунт?",
    resend: "Повторно отправить ссылку",
    sendAgain:
      "Похоже, срок действия ссылки для подтверждения истек. Не волнуйтесь, мы можем отправить ссылку еще раз.",
    service: "Условия использования",
    signIn: "Войти",
    title: "Зарегистрироваться",
    username: "Максимальное количество символов 30",
  },
};

export type LocaleType = typeof ru;
