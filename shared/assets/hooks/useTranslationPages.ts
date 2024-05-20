import { useRouter } from "next/router";

export const useTranslationPages = () => {
  const router = useRouter();
  const { locale, route } = router;
  const t = require(`../../../locales${route}/${locale}.ts`).default;

  return { t };
};
