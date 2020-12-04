import {useCallback} from 'react';
import {
  showMessage,
  hideMessage,
  MessageOptions,
} from 'react-native-flash-message';

import {useTheme} from '../../../Theme/hooks/useTheme';

export type ShowAlertType = MessageOptions;

export type UseAlertType = {
  showAlert: (v: ShowAlertType) => void;
  hideAlert: () => void;
};

export const useAlert = (): UseAlertType => {
  const {theme} = useTheme();

  const showAlert = useCallback(
    (alertProps: ShowAlertType): void => {
      const generateBgColor = (): string => {
        switch (alertProps.type) {
          case 'danger': {
            return theme.colors.error;
          }
          case 'info': {
            return theme.colors.primary;
          }
          default: {
            return theme.colors.primaryBorder;
          }
        }
      };

      showMessage({
        ...alertProps,
        position: 'top',
        floating: true,
        style: {
          paddingLeft: theme.layout.md,
          paddingRight: theme.layout.md,
          backgroundColor: generateBgColor(),
          marginStart: theme.layout.md,
          marginEnd: theme.layout.md,
          marginLeft: theme.layout.md,
          marginRight: theme.layout.md,
          // borderRadius: theme.radii.md,
        },
        titleStyle: {
          fontFamily: theme.fonts.families.semibold,
          fontSize: theme.fonts.sizes.sm,
          color: theme.colors.white,
        },
        icon: {
          icon: alertProps.type || 'info',
          position: 'left',
        },
      });
    },
    [theme]
  );

  const hideAlert = useCallback((): void => {
    hideMessage();
  }, []);

  return {
    showAlert,
    hideAlert,
  };
};
