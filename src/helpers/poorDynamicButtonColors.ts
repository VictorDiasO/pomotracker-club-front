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

const primaryDynamicButtonBorderColors = (theme: string | undefined) => {
  let buttonBorderColor = '#FFFFFF';

  switch (theme) {
    case 'light':
      buttonBorderColor = 'border-red-400'
      break
    case 'lightshortbreak':
      buttonBorderColor = 'border-green-400'
      break
    case 'lightlongbreak':
      buttonBorderColor = 'border-blue-400'
      break
    case 'dark':
      buttonBorderColor = 'border-red-700'
      break
    case 'darkshortbreak':
      buttonBorderColor = 'border-green-700'
      break
    case 'darklongbreak':
      buttonBorderColor = 'border-blue-700'
      break
  }

  return buttonBorderColor;
}

const secondaryDynamicButtonColors = (theme: string | undefined) => {
  let buttonColor = '#FFFFFF';

  switch (theme) {
    case 'light':
      buttonColor = 'bg-red-200'
      break
    case 'lightshortbreak':
      buttonColor = 'bg-green-100'
      break
    case 'lightlongbreak':
      buttonColor = 'bg-blue-100'
      break
    case 'dark':
      buttonColor = 'bg-red-500 bg-opacity-25'
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

export { primaryDynamicButtonColors, primaryDynamicButtonBorderColors, secondaryDynamicButtonColors };