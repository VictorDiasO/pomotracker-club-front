
const primaryDynamicTextColors = (theme: string | undefined) => {
  let buttonColor = '#FFFFFF';

  switch (theme) {
    case 'light':
      buttonColor = 'text-red-100'
      break
    case 'lightshortbreak':
      buttonColor = 'text-green-100'
      break
    case 'lightlongbreak':
      buttonColor = 'text-blue-100'
      break
    case 'dark':
      buttonColor = 'text-red-500 opacity-20'
      break
    case 'darkshortbreak':
      buttonColor = 'text-green-100 text-opacity-10'
      break
    case 'darklongbreak':
      buttonColor = 'text-blue-100 text-opacity-10'
      break
  }

  return buttonColor;
}

const secondaryDynamicTextColors = (theme: string | undefined) => {
  let buttonColor = '#FFFFFF';

  switch (theme) {
    case 'light':
      buttonColor = 'text-[#471515]'
      break
    case 'lightshortbreak':
      buttonColor = 'text-[#14401D]'
      break
    case 'lightlongbreak':
      buttonColor = 'text-[#153047]'
      break
    case 'dark':
      buttonColor = 'text-[#FFF2F2]'
      break
    case 'darkshortbreak':
      buttonColor = 'text-[#F2FFF5]'
      break
    case 'darklongbreak':
      buttonColor = 'text-[#F2F9FF]'
      break
  }

  return buttonColor;
}

export { primaryDynamicTextColors, secondaryDynamicTextColors };