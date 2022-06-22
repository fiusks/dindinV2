export function dateFormat(date: string) {
  return new Date(Date.parse(date)).toLocaleDateString('pt-BR', {
    timeZone: 'Europe/London',
  });
}

export function weekdayFormat(date: string) {
  const weekday = new Intl.DateTimeFormat('pt-BR', {
    weekday: 'long',
    timeZone: 'Europe/London',
  }).format(new Date(date));

  const formatedDate = weekday[0].toUpperCase() + weekday.substring(1);
  return formatedDate.replace('-feira', '');
}

export function firstLetterUppercase(param: string) {
  const formatedWord = param[0].toUpperCase() + param.substring(1);
  return formatedWord;
}
