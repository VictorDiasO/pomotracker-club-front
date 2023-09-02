
const primaryDynamicTextColors = (theme: string | undefined) => {
  return `
    ${theme === 'light' && 'text-red-100'}
    ${theme === 'lightshortbreak' && 'text-green-100'}
    ${theme === 'lightlongbreak' && 'text-blue-100'}
    ${theme === 'dark' && 'text-red-500 opacity-20'}
    ${theme === 'darkshortbreak' && 'text-green-100 text-opacity-10'}
    ${theme === 'darklongbreak' && 'text-blue-100 text-opacity-10'}
  `;
}

const secondaryDynamicTextColors = (theme: string | undefined) => {
  return `
    ${theme === 'light' && 'text-[#471515]'}
    ${theme === 'lightshortbreak' && 'text-[#14401D]'}
    ${theme === 'lightlongbreak' && 'text-[#153047)]'}
    ${theme === 'dark' && 'text-[#FFF2F2]'}
    ${theme === 'darkshortbreak' && '#F2FFF5'}
    ${theme === 'darklongbreak' && '#F2F9FF'}
  `;
}

export { primaryDynamicTextColors, secondaryDynamicTextColors };