import React, {useState} from 'react';

import {View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import KeyboardAvoidingContainer from '../../../components/ui/KeyboardAvoidingContainer';
import PageContainer from '../../../components/common/PageContainer';
import SafeScrollerContainer from '../../../components/common/SafeScrollerContainer';

import Button from '../../../components/ui/Button';
import Text from '../../../components/ui/Text';
import Input from '../../../components/ui/Input';
import MobileIDIconSvg from '../../../assets/images/icons/mobile-id.svg';
import {useTheme} from '../../Theme/hooks/useTheme';

const AuthMobileScreen: React.FC = () => {
  const {theme} = useTheme();
  const navigation = useNavigation();

  const [phoneValue, setPhoneValue] = useState('');

  const onPhoneInput = (val: string): void => {
    const newVal = val
      ? val.length > 1
        ? '+' + val.slice(1)
        : val !== '+'
        ? '+' + val
        : val
      : '';
    setPhoneValue(newVal);
  };

  return (
    <KeyboardAvoidingContainer>
      <SafeScrollerContainer isFlex>
        <PageContainer>
          <View style={{paddingTop: theme.layout.s4}}>
            <MobileIDIconSvg
              fill={theme.colors.textPrimary}
              width={80}
              height={80}
              style={{alignSelf: 'center', marginBottom: theme.layout.s3}}
            />
            <Text
              type="title"
              style={{textAlign: 'center', marginBottom: theme.layout.s6}}>
              Mobile ID
            </Text>
            <Text
              style={{
                fontFamily: theme.fonts.families.primary.semibold,
                textAlign: 'center',
                marginBottom: theme.layout.s4,
              }}>
              Enter your phone number
            </Text>
            <Input
              placeholder="Phone number"
              onChangeText={onPhoneInput}
              textContentType="telephoneNumber"
              keyboardType="phone-pad"
              value={phoneValue}
              style={{marginBottom: theme.layout.s3}}
            />
            <Button
              title="Continue"
              disabled={!phoneValue}
              onPress={() => navigation.navigate('AuthMobileCode')}
            />
          </View>
        </PageContainer>
      </SafeScrollerContainer>
    </KeyboardAvoidingContainer>
  );
};

export default AuthMobileScreen;
