import React from 'react';

import {View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import KeyboardAvoidingContainer from '../../../components/ui/KeyboardAvoidingContainer';
import PageContainer from '../../../components/common/PageContainer';
import SafeScrollerContainer from '../../../components/common/SafeScrollerContainer';

import Button from '../../../components/ui/Button';
import Text from '../../../components/ui/Text';
import CompanyCard from '../../../components/ui/CompanyCard';
import SmartIDIconSvg from '../../../assets/images/icons/smart-id.svg';
import MobileIDIconSvg from '../../../assets/images/icons/mobile-id.svg';
import {useTheme} from '../../Theme/hooks/useTheme';

const AuthScreen: React.FC = () => {
  const {theme} = useTheme();
  const navigation = useNavigation();

  return (
    <KeyboardAvoidingContainer>
      <SafeScrollerContainer isFlex>
        <PageContainer>
          <View
            style={{
              paddingTop: theme.layout.s4,
            }}>
            <CompanyCard
              title="Arsenali Postkontor"
              address="Erika 14, 10416 Tallinn"
              pictureUrl="https://meetfrank.com/blog/wp-content/uploads/2019/11/omniva.png"
              style={{marginBottom: theme.layout.s5}}
            />
            <Text
              type="title"
              style={{textAlign: 'center', marginBottom: theme.layout.s5}}>
              Identify yourself
            </Text>
            <Button
              title="Smart ID"
              iconLeft={<SmartIDIconSvg fill={theme.colors.textInverse} />}
              style={{marginBottom: theme.layout.s3}}
            />
            <Button
              title="Mobile ID"
              iconLeft={<MobileIDIconSvg fill={theme.colors.textInverse} />}
              onPress={() => navigation.navigate('AuthMobile')}
            />
          </View>
        </PageContainer>
      </SafeScrollerContainer>
    </KeyboardAvoidingContainer>
  );
};

export default AuthScreen;
