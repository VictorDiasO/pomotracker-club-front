// Very simple and not the better solution but I will refactor this later
const primaryDynamicButtonColors = (theme: string | undefined) => {
  let buttonColor = '#FFFFFF';

  switch (theme) {
    case 'light':
      buttonColor = 'bg-red-400'
      break
    case 'lightshortbreak':
      buttonColor = 'bg-green-400'
      break
    case 'lightlongbreak':
      buttonColor = 'bg-blue-400'
      break
    case 'dark':
      buttonColor = 'bg-red-700'
      break
    case 'darkshortbreak':
      buttonColor = 'bg-green-700'
      break
    case 'darklongbreak':
      buttonColor = 'bg-blue-700'
      break
  }

  return buttonColor;
}

const secondaryDynamicButtonColors = (theme: string | undefined) => {
  let buttonColor = '#FFFFFF';

  switch (theme) {
    case 'light':
      buttonColor = 'bg-red-100'
      break
    case 'lightshortbreak':
      buttonColor = 'bg-green-100'
      break
    case 'lightlongbreak':
      buttonColor = 'bg-blue-100'
      break
    case 'dark':
      buttonColor = 'bg-red-500 bg-opacity-20'
      break
    case 'darkshortbreak':
      buttonColor = 'bg-green-100 bg-opacity-10'
      break
    case 'darklongbreak':
      buttonColor = 'bg-blue-100 bg-opacity-10'
      break
  }

  return buttonColor;
}

export { primaryDynamicButtonColors, secondaryDynamicButtonColors };