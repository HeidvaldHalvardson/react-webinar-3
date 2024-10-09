export const formatDate = (dateString, language = 'ru') => {
  const date = new Date(dateString);

  const months = {
    ru: [
      "января", "февраля", "марта", "апреля", "мая", "июня",
      "июля", "августа", "сентября", "октября", "ноября", "декабря"
    ],
    en: [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ],
  };

  const day = date.getDate()
  const month = months[language][date.getMonth()]
  const year = date.getFullYear()
  const hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
  const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();

  return `${day} ${month} ${year} в ${hours}:${minutes}`;
}
