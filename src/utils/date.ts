export const formatDate = (date: string): string => {
  const dateToFormat = new Date(date);
  return new Intl.DateTimeFormat("fr-FR").format(dateToFormat);
};
