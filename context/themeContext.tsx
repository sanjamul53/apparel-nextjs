import { useState, createContext, FC, ReactNode, useContext } from 'react';

type TmodeType = 'dark'| 'light';

type TColorType = {
  main: string;
  light: string;
  dark: string;
}

type TComboType = {
  bg: string;
  txt: string;
}

interface ThemeCtxValue {
  palette: {
    mode: TmodeType,
    primary: TColorType;
    secondary: TColorType;
    text: string;

    combo_white: TComboType;
    combo_white_light: TComboType;
    combo_gray_light: TComboType;
    combo_gray_bold: TComboType;

  }
}

interface IThemeCtx extends ThemeCtxValue {
  modeToggle: () => void;
}

interface IThemeContextProvider {
  children: ReactNode
}

const defaultCtxValue = (mode: TmodeType): ThemeCtxValue => {

  return {

    palette: {

      mode: 'light',

      primary: {
        main: '#fb9300',
        light: '#ffc446',
        dark: '#c26500'
      },

      secondary: {
        main: '#3cb371',
        light: '#73e6a0',
        dark: '#008245'
      },

      text: mode === 'dark' ? '#ffffff': '#000000',

      combo_white: {
        bg: '#e0e6ee',
        txt: '#5e5e5d'
      },

      combo_white_light: {
        bg: 'rgba(225, 225, 225, 0.6)',
        txt: '#5e5e5d'
      },

      combo_gray_light: {
        bg: '#f4f4f4',
        txt: '#111111'
      },

      combo_gray_bold: {
        bg: '#eef0f2',
        txt: '#111111'
      },

    }

  }

}

const ThemeContext = createContext<IThemeCtx>({
  ...defaultCtxValue('light'),
  modeToggle: () => {}
});

export const ThemeContextProvider: FC<IThemeContextProvider> = ({ children }) => {

  const [valueState, setValueState] = 
  useState<ThemeCtxValue>({...defaultCtxValue('light')});

  const modeHandler = () => {

    // get current mode
    const newMode: TmodeType = valueState.palette.mode === 'dark' ? 'light': 'dark';

    // get new theme
    const newTheme = defaultCtxValue(newMode);

    setValueState({...newTheme});

  }

  return(
    <ThemeContext.Provider
      value={{
        ...valueState,
        modeToggle: modeHandler
      }}
    >
      {children}
    </ThemeContext.Provider>
  )

}

export const useThemeCtx = () => {

  const values = useContext(ThemeContext);

  return { theme: {...values} }

}