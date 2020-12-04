export type ThemeType = {
  dark: boolean;
  layout: {
    s1: number;
    s2: number;
    s3: number;
    s4: number;
    s5: number;
    s6: number;
  };
  radii: {
    sm: number;
    md: number;
  };
  border: {
    sm: number;
    md: number;
  };
  fonts: {
    families: {
      primary: {
        extraLight: string;
        light: string;
        regular: string;
        semibold: string;
        bold: string;
        black: string;
      };
      secondary: {
        extraLight: string;
        light: string;
        regular: string;
        medium: string;
        semibold: string;
        bold: string;
        black: string;
      };
    };
    sizes: {
      s1: number;
      s2: number;
      s3: number;
      s4: number;
      s5: number;
    };
  };
  colors: {
    uiPrimary: string;
    uiBlue: string;
    uiLightBlue: string;
    uiGreen: string;
    uiLightGreen: string;
    uiYellow: string;
    uiGrey: string;
    uiLightGrey: string;
    uiDisabled: string;
    uiError: string;
    uiSuccess: string;
    uiBorder: string;
    bgPrimary: string;
    bgSecondary: string;
    textPrimary: string;
    textSecondary: string;
    textInverse: string;
    textError: string;
    textSuccess: string;
    constWhite: string;
    constBlack: string;
  };
};

export const defaultTheme: ThemeType = {
  dark: false,
  layout: {
    s1: 2,
    s2: 4,
    s3: 6,
    s4: 12,
    s5: 24,
    s6: 48,
  },
  radii: {
    sm: 8,
    md: 16,
  },
  border: {
    sm: 1,
    md: 2,
  },
  fonts: {
    families: {
      primary: {
        extraLight: 'SourceSansPro-ExtraLight',
        light: 'SourceSansPro-Light',
        regular: 'SourceSansPro-Regular',
        semibold: 'SourceSansPro-SemiBold',
        bold: 'SourceSansPro-Bold',
        black: 'SourceSansPro-Black',
      },
      secondary: {
        extraLight: 'SourceCodePro-ExtraLight',
        light: 'SourceCodePro-Light',
        regular: 'SourceCodePro-Regular',
        medium: 'SourceCodePro-Medium',
        semibold: 'SourceCodePro-SemiBold',
        bold: 'SourceCodePro-Bold',
        black: 'SourceCodePro-Black',
      },
    },
    sizes: {
      s1: 12,
      s2: 16,
      s3: 24,
      s4: 28,
      s5: 60,
    },
  },
  colors: {
    uiPrimary: '#000000',
    uiBlue: '#000CCA',
    uiLightBlue: '#67ADFF',
    uiGreen: '#138200',
    uiLightGreen: '#64C741',
    uiYellow: '#FFCF4C',
    uiGrey: '#6C6C6C',
    uiLightGrey: '#C5C5C5',
    uiDisabled: '#6C6C6C',
    uiError: '#FFD2D2',
    uiSuccess: '#138200',
    uiBorder: '#CCCCCC',
    bgPrimary: '#EEEEEE',
    bgSecondary: '#FFFFFF',
    textPrimary: '#000000',
    textSecondary: '#CCCCCC',
    textInverse: '#FFFFFF',
    textError: '#BC3B3B',
    textSuccess: '#138200',
    constWhite: '#FFFFFF',
    constBlack: '#000000',
  },
};

export const darkTheme: ThemeType = defaultTheme;
