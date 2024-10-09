import useServices from "./use-services";
import {useEffect, useMemo, useState} from "react";

/**
 * Хук возвращает функцию для локализации текстов, код языка и функцию его смены
 */
export default function useTranslate() {
  const { i18n: i18nService }  = useServices()
  const [data, setData] = useState(i18nService.getLang());

  useEffect(() => {
    const listener = () => {
      setData(i18nService.getLang())
    }

    i18nService.subscribe(listener);

    return () => i18nService.unsubscribe(listener);
  }, [i18nService]);

  const i18n = useMemo(
    () => ({
      // Код локали
      lang: data,
      // Функция для смены локали
      setLang: (lang) => {
        i18nService.setLang(lang);
      },
      // Функция для локализации текстов с замыканием на код языка
      t: (text, number) => i18nService.t(text, number),
    }),
    [i18nService.getLang()],
  );

  return i18n
}
