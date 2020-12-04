import React from 'react';
import {StyleSheet} from 'react-native';
import FlashMessage, {
  DefaultFlash,
  Icon as MessageIcon,
} from 'react-native-flash-message';
import Icon from 'react-native-vector-icons/Feather';

import {useTheme} from '../../../Theme/hooks/useTheme';
import SafeContainer from '../../../../components/ui/SafeContainer';
import ShadowView from '../../../../components/ui/ShadowView';

const AlertContainer: React.FC = () => {
  const {theme} = useTheme();

  const generateIconName = (type: MessageIcon): string => {
    switch (type) {
      case 'danger': {
        return 'alert-triangle';
      }
      case 'info': {
        return 'alert-circle';
      }
      default: {
        return 'alert-octagon';
      }
    }
  };

  return (
    <FlashMessage
      renderFlashMessageIcon={(iconName) => (
        <Icon
          name={generateIconName(iconName)}
          color={theme.colors.white}
          size={18}
          style={{marginRight: theme.layout.sm}}
        />
      )}
      MessageComponent={(props) => (
        <SafeContainer forceInset={{vertical: 'never'}}>
          <ShadowView
            style={[
              styles.errorContainer,
              {
                shadowColor: theme.colors.black,
              },
            ]}>
            <DefaultFlash {...props} />
          </ShadowView>
        </SafeContainer>
      )}
    />
  );
};

const styles = StyleSheet.create({
  errorContainer: {
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
});

export default AlertContainer;
