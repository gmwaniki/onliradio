const stringCapitalize = (value: string): string => {
  return value
    .trim()
    .split(' ')
    .map((item) => item[0].toUpperCase() + item.substring(1))
    .join(' ');
};
