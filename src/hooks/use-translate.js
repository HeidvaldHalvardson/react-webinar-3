import useServices from "./use-services";
import {useEffect, useMemo, useState} from "react";

/**
 * Хук возвращает функцию для локализации текстов, код языка и функцию его смены
 */
export default function useTranslate() {
  const { i18n }  = useServices()
  const [data, setData] = useState(i18n.getLang());

  useEffect(() => {
    const listener = () => {
      setData(i18n.getLang())
    }

    i18n.subscribe(listener);

    return () => i18n.unsubscribe(listener);
  }, [i18n]);

  return useMemo(
    () => ({
      // Код локали
      lang: data,
      // Функция для смены локали
      setLang: (lang) => {
        i18n.setLang(lang);
      },
      // Функция для локализации текстов с замыканием на код языка
      t: (text, number) => i18n.t(text, number),
    }),
    [i18n.getLang()],
  );
}
