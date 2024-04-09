import { Select } from "@/shared/components";
import { useRouter } from "next/router";

export const LangSelect = () => {
  const { asPath, locale, locales, pathname, push, query } = useRouter();

  const changeLangHandler = (key: string, value: string) => {
    const locale = value;

    push({ pathname, query }, asPath, { locale });
  };

  const options = [
    {
      img: "/images/FlagUK.svg",
      title: "English",
      value: "en",
    },
    {
      img: "/images/FlagRussia.svg",
      title: "Russian",
      value: "ru",
    },
  ];

  return (
    <div>
      <Select
        defaultValue={locale}
        items={options}
        onChange={changeLangHandler}
      />
    </div>
  );
};
