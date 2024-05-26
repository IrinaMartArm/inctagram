import { en } from "locales/en";
import { ru } from "locales/ru";
import { useRouter } from "next/router";

export const useTranslation = () => {
  const router = useRouter();

  return { locale: router.locale, t: router.locale === "en" ? en : ru };
};
