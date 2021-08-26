export const currentDate = (): Date => {
  return new Date(new Date().setHours(0, 0, 0, 0));
};

export const dateFormatString = (date: Date): string => {
  return date.toISOString().slice(0, 10);
};

export const dateFormatDate = (date: string): Date => {
  return new Date(date);
};
