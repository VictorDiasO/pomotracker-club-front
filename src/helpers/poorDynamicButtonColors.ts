// Very simple and not the better solution but I will refactor this later
const primaryDynamicButtonColors = (theme: string | undefined) => {
  return `
    ${theme === 'light' && 'bg-red-100'}
    ${theme === 'lightshortbreak' && 'bg-green-100'}
    ${theme === 'lightlongbreak' && 'bg-blue-100'}
    ${theme === 'dark' && 'bg-red-700'}
    ${theme === 'darkshortbreak' && 'bg-green-700'}
    ${theme === 'darklongbreak' && 'bg-blue-700'}
  `;
}

const secondaryDynamicButtonColors = (theme: string | undefined) => {
  return `
    ${theme === 'light' && 'bg-red-100'}
    ${theme === 'lightshortbreak' && 'bg-green-100'}
    ${theme === 'lightlongbreak' && 'bg-blue-100'}
    ${theme === 'dark' && 'bg-red-500 bg-opacity-20'}
    ${theme === 'darkshortbreak' && 'bg-green-100 bg-opacity-10'}
    ${theme === 'darklongbreak' && 'bg-blue-100 bg-opacity-10'}
  `;
}

export { primaryDynamicButtonColors, secondaryDynamicButtonColors };