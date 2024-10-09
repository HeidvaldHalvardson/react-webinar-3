export const formatDate = (dateString, lang = 'ru') => {
   const date = new Date(dateString);

  const formattedData = new Intl.DateTimeFormat(lang, {
    dateStyle: 'long',
    timeStyle: 'short',
  }).format(date);

  return lang === 'ru' ? formattedData.replace('г. ', '') : formattedData;
}
