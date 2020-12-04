export type ThemeType = {
  dark: boolean;
  layout: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  radii: {
    sm: number;
    md: number;
  };
  border: {
    md: number;
  };
  fonts: {
    families: {
      regular: string;
      semibold: string;
    };
    sizes: {
      xs: number;
      sm: number;
      md: number;
      lg: number;
      xl: number;
    };
  };
  colors: {
    bg: string;
    bgTransparent: string;
    primary: string;
    secondary: string;
    white: string;
    black: string;
    primaryText: string;
    secondaryText: string;
    error: string;
    primaryBorder: string;
    secondaryBorder: string;
  };
};

export const defaultTheme: ThemeType = {
  dark: false,
  layout: {
    xs: 5,
    sm: 10,
    md: 20,
    lg: 40,
    xl: 80,
  },
  radii: {
    sm: 10,
    md: 15,
  },
  border: {
    md: 2,
  },
  fonts: {
    families: {
      regular: 'OpenSans-SemiBold',
      semibold: 'OpenSans-Bold',
    },
    sizes: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 18,
      xl: 28,
    },
  },
  colors: {
    bg: '#FFFFFF',
    bgTransparent: 'rgba(255, 255, 255, 0)',
    primary: '#02C2A8',
    secondary: '#C1EECD',
    white: '#FFFFFF',
    black: '#000000',
    primaryText: '#000000',
    secondaryText: '#ABABAB',
    error: '#FA7268',
    primaryBorder: '#ABABAB',
    secondaryBorder: '#F3F2F1',
  },
};

export const darkTheme: ThemeType = {
  dark: true,
  layout: {
    xs: 5,
    sm: 10,
    md: 20,
    lg: 40,
    xl: 80,
  },
  radii: {
    sm: 10,
    md: 15,
  },
  border: {
    md: 2,
  },
  fonts: {
    families: {
      regular: 'OpenSans-SemiBold',
      semibold: 'OpenSans-Bold',
    },
    sizes: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 18,
      xl: 28,
    },
  },
  colors: {
    //#202124
    //#27282b
    //
    bg: '#202124',
    bgTransparent: 'rgba(39, 40, 43, 0)',
    primary: '#02C2A8',
    secondary: '#386C5F',
    white: '#FFFFFF',
    black: '#000000',
    primaryText: '#FFFFFF',
    secondaryText: '#35363a',
    error: '#FA7268',
    primaryBorder: '#35363a',
    secondaryBorder: '#27282b',
  },
};
