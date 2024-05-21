export const ru = {
  common: {
    error: "Ошибка!",
    no: "Нет",
    yes: "Да",
  },
  deleteAvatar: {
    text: "Вы действительно хотите удалить свою фотографию профиля?",
    title: "Удалить фотографию",
  },
  favorites: {
    title: "Страница",
  },
  logOut: {
    buttonNo: "Нет",
    buttonYes: "Да",
    title: "Выход",
    warning: "Вы действительно хотите выйти из своей учетной записи",
  },
  menu: {
    create: "Создать",
    favorites: "Избранное",
    home: "Главная",
    messenger: "Сообщения",
    myProfile: "Мой профиль",
    search: "Поиск",
    statistics: "Статистика",
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
  profileSettings: {
    general: {
      addPhoto: "Добавить фото профиля",
      errors: {
        formatFile: "Формат загружаемой фотографии должен быть PNG и JPEG.",
        maxSize: "Размер фотографии должен быть меньше 10 МБ!",
      },
      savePhoto: "Сохранить",
      selectPhoto: "Выбрать с компьютера",
    },
  },
};

export type LocaleType = typeof ru;
