
const secondaryDynamicTextColors = (theme: string | undefined) => {
  return `
    ${theme === 'light' && 'text-red-100'}
    ${theme === 'lightshortbreak' && 'text-green-100'}
    ${theme === 'lightlongbreak' && 'text-blue-100'}
    ${theme === 'dark' && 'text-red-500 opacity-20'}
    ${theme === 'darkshortbreak' && 'text-green-100 text-opacity-10'}
    ${theme === 'darklongbreak' && 'text-blue-100 text-opacity-10'}
  `;
}

export { secondaryDynamicTextColors };