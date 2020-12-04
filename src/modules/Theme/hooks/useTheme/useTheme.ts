import {useContext} from 'react';

import {ThemeContext, ThemeContextType} from '../../context';

export type UseThemeType = ThemeContextType;

export const useTheme = (): UseThemeType => useContext(ThemeContext);
