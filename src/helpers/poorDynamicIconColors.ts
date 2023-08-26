const getColorBasedOnTheme = (theme: string | undefined): string => {
  if (theme === 'light') return '#471515';
  else if (theme === 'lightshortbreak') return '#14401D';
  else if (theme === 'lightlongbreak') return '#153047';
  return '#ddd';
}

export { getColorBasedOnTheme };