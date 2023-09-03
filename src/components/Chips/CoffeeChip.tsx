import { dynamicButtonColors, dynamicIconColors, dynamicTextColors } from "@/helpers";
import { Brain, Coffee } from "@phosphor-icons/react";
import { useTheme } from "next-themes"

const GetIcon = ({ theme }: { theme: string }) => {
  if (theme.includes('shortbreak') || theme.includes('longbreak')) {
    return (
      <Coffee size={32} color={dynamicIconColors.getColorBasedOnTheme(theme)} />
    );
  } else {
    return (
      <Brain size={32} color={dynamicIconColors.getColorBasedOnTheme(theme)} />
    );
  } 
}

const getThemeComponent = (theme: string, text: string, borderColor: string, bgColor: string, textColor: string) => {
  return (
    <div className={`flex py-2 px-4 border-solid rounded-full border-${borderColor} ${bgColor} border-2 text-center items-center gap-2`}>
      <GetIcon theme={theme} />
      <p className={`text-lg font-medium ${textColor}`}>{text}</p>
    </div>
  );
};

export const CoffeeChip = () => {
  let themeComponent = null;
  const {theme} = useTheme();

  switch (theme) {
    case 'light':
      themeComponent = getThemeComponent(
        theme,
        'Focus',
        'red-950',
        dynamicButtonColors.secondaryDynamicButtonColors(theme),
        dynamicTextColors.secondaryDynamicTextColors(theme)
      );
      break;
    case 'lightshortbreak':
      themeComponent = getThemeComponent(
        theme,
        'Short Break',
        'green-900',
        dynamicButtonColors.secondaryDynamicButtonColors(theme),
        dynamicTextColors.secondaryDynamicTextColors(theme)
      );
      break;
    case 'lightlongbreak':
      themeComponent = getThemeComponent(
        theme,
        'Long Break',
        'blue-900',
        dynamicButtonColors.secondaryDynamicButtonColors(theme),
        dynamicTextColors.secondaryDynamicTextColors(theme)
      );
      break;
    case 'dark':
      themeComponent = getThemeComponent(
        theme,
        'Focus',
        'FFF2F2',
        dynamicButtonColors.secondaryDynamicButtonColors(theme),
        dynamicTextColors.secondaryDynamicTextColors(theme)
      );
      break;
    case 'darkshortbreak':
      themeComponent = getThemeComponent(
        theme,
        'Short Break',
        'FFF2F2',
        dynamicButtonColors.secondaryDynamicButtonColors(theme),
        dynamicTextColors.secondaryDynamicTextColors(theme)
      );
      break;
    case 'darklongbreak':
      themeComponent = getThemeComponent(
        theme,
        'Long Break',
        'FFF2F2',
        dynamicButtonColors.secondaryDynamicButtonColors(theme),
        dynamicTextColors.secondaryDynamicTextColors(theme)
      );
      break;
  }

  return (
    <>
      {themeComponent}
    </>
  )
}
