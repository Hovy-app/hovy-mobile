import React from 'react';

import {View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

import KeyboardAvoidingContainer from '../../../components/ui/KeyboardAvoidingContainer';
import PageContainer from '../../../components/common/PageContainer';
import SafeScrollerContainer from '../../../components/common/SafeScrollerContainer';

import Button from '../../../components/ui/Button';
import Text from '../../../components/ui/Text';
import CompanyCard from '../../../components/ui/CompanyCard';
import MenuButton from '../../../components/common/MenuButton';
import {useTheme} from '../../Theme/hooks/useTheme';
import {RootState} from '../../../redux/store';
import {ShopDataType} from '../../Auth/reducer/authReducer';

const FeedbackLeaveFirstScreen: React.FC = () => {
  const {theme} = useTheme();
  const navigation = useNavigation();

  const shopData = useSelector<RootState, ShopDataType | null>(
    (state) => state.authReducer.shopData
  );

  return (
    <KeyboardAvoidingContainer>
      <SafeScrollerContainer isFlex>
        <PageContainer>
          <View
            style={{
              paddingTop: theme.layout.s4,
            }}>
            {shopData && (
              <CompanyCard
                title={shopData.name}
                address={shopData.address}
                pictureUrl={shopData.pictureUrl}
                style={{marginBottom: theme.layout.s5}}
              />
            )}
            <Text
              type="title"
              style={{textAlign: 'center', marginBottom: theme.layout.s2}}>
              Sorry to see you go
            </Text>
            <Text
              style={{
                fontFamily: theme.fonts.families.primary.semibold,
                textAlign: 'center',
                marginBottom: theme.layout.s5,
              }}>
              Why did you decide to leave the venue?
            </Text>
            <Button
              title="Queue is too long"
              style={{marginBottom: theme.layout.s3}}
              onPress={() =>
                navigation.reset({
                  index: 0,
                  routes: [{name: 'FeedbackLeaveSecond', params: {reason: 1}}],
                })
              }
            />
            <Button
              title="Too much time to wait"
              style={{marginBottom: theme.layout.s3}}
              onPress={() =>
                navigation.reset({
                  index: 0,
                  routes: [{name: 'FeedbackLeaveSecond', params: {reason: 2}}],
                })
              }
            />
            <Button
              title="Wrong venue"
              style={{marginBottom: theme.layout.s3}}
              onPress={() =>
                navigation.reset({
                  index: 0,
                  routes: [{name: 'FeedbackLeaveSecond', params: {reason: 3}}],
                })
              }
            />
            <Button
              title="Personal reason"
              style={{marginBottom: theme.layout.s5}}
              onPress={() =>
                navigation.reset({
                  index: 0,
                  routes: [{name: 'FeedbackLeaveSecond', params: {reason: 4}}],
                })
              }
            />
            <Button
              title="Nevermind, I’m staying"
              style={{
                backgroundColor: theme.colors.uiBorder,
              }}
              titleStyle={{color: theme.colors.textPrimary}}
              onPress={() => navigation.goBack()}
            />
          </View>
        </PageContainer>
      </SafeScrollerContainer>
      <MenuButton />
    </KeyboardAvoidingContainer>
  );
};

export default FeedbackLeaveFirstScreen;
