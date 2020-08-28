import { DarkTheme } from 'react-native-paper';
import { Theme } from 'react-native-paper/lib/typescript/src/types';

export const darkTheme: Theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: '#0f0e17',
    primary: '#ff8906',
    accent: '#e53170',
    surface: '#000000',
    backdrop: '#0c0c0c',
    text: '#fffffe'
  }
};
