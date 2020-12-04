import React, {useEffect} from 'react';

import {View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import KeyboardAvoidingContainer from '../../../components/ui/KeyboardAvoidingContainer';
import PageContainer from '../../../components/common/PageContainer';
import SafeScrollerContainer from '../../../components/common/SafeScrollerContainer';

import Text from '../../../components/ui/Text';
import MobileIDIconSvg from '../../../assets/images/icons/mobile-id.svg';
import {useTheme} from '../../Theme/hooks/useTheme';

const AuthMobileCodeScreen: React.FC = () => {
  const {theme} = useTheme();
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{name: 'Queue'}],
      });
    }, 5000);
  });

  return (
    <KeyboardAvoidingContainer>
      <SafeScrollerContainer isFlex>
        <PageContainer>
          <View style={{paddingTop: theme.layout.s4}}>
            <Text
              style={{
                fontFamily: theme.fonts.families.primary.semibold,
                textAlign: 'center',
                marginBottom: theme.layout.s5,
              }}>
              Your verification code:
            </Text>
            <Text
              style={{
                fontFamily: theme.fonts.families.secondary.medium,
                fontSize: theme.fonts.sizes.s5,
                textAlign: 'center',
                marginBottom: theme.layout.s5,
              }}>
              {Math.floor(Math.random() * (9999 - 1000)) + 1000}
            </Text>
            <Text
              style={{
                textAlign: 'center',
                marginBottom: theme.layout.s4,
              }}>
              Message sent to your telephone.
            </Text>
            <Text
              style={{
                fontFamily: theme.fonts.families.primary.semibold,
                textAlign: 'center',
                marginBottom: theme.layout.s4,
              }}>
              Check the code!
            </Text>
            <Text
              style={{
                textAlign: 'center',
              }}>
              In order to log in using Mobiil-ID, enter the Mobiil-ID PIN1 into
              your phone after you receive an SMS with the same control code you
              can see here.
            </Text>
          </View>
        </PageContainer>
      </SafeScrollerContainer>
    </KeyboardAvoidingContainer>
  );
};

export default AuthMobileCodeScreen;
