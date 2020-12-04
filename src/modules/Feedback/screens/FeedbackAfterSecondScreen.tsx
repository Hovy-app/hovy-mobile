import React, {useState} from 'react';

import {View} from 'react-native';
import {Route, useNavigation, useRoute} from '@react-navigation/native';

import KeyboardAvoidingContainer from '../../../components/ui/KeyboardAvoidingContainer';
import PageContainer from '../../../components/common/PageContainer';
import SafeScrollerContainer from '../../../components/common/SafeScrollerContainer';

import Button from '../../../components/ui/Button';
import Text from '../../../components/ui/Text';
import Input from '../../../components/ui/Input';
import CompanyCard from '../../../components/ui/CompanyCard';
import MenuButton from '../../../components/common/MenuButton';
import HeartIconSvg from '../../../assets/images/icons/heart_filled.svg';
import SmileFaceIconSvg from '../../../assets/images/icons/smile-face_filled.svg';
import NeutralFaceIconSvg from '../../../assets/images/icons/neutral-face_filled.svg';
import SadFaceIconSvg from '../../../assets/images/icons/sad-face_filled.svg';
import {useTheme} from '../../Theme/hooks/useTheme';

const FeedbackAfterSecondScreen: React.FC = () => {
  const {theme} = useTheme();
  const navigation = useNavigation();
  const route = useRoute<Route<'FeedbackAfterSecond', {rating: number}>>();

  const [comment, setComment] = useState('');

  const onCommentInput = (val: string): void => {
    setComment(val);
  };

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
              style={{textAlign: 'center', marginBottom: theme.layout.s2}}>
              Thanks for your visit!
            </Text>
            <Text
              style={{
                fontFamily: theme.fonts.families.primary.semibold,
                textAlign: 'center',
                marginBottom: theme.layout.s5,
              }}>
              Please rate your experience.
            </Text>
            <View style={{alignItems: 'center', marginBottom: theme.layout.s5}}>
              {route.params?.rating === 4 ? (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <HeartIconSvg style={{marginRight: theme.layout.s3}} />
                  <Text
                    style={{fontFamily: theme.fonts.families.primary.semibold}}>
                    Love it
                  </Text>
                </View>
              ) : route.params?.rating === 3 ? (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <SmileFaceIconSvg style={{marginRight: theme.layout.s3}} />
                  <Text
                    style={{fontFamily: theme.fonts.families.primary.semibold}}>
                    Good
                  </Text>
                </View>
              ) : route.params?.rating === 2 ? (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <NeutralFaceIconSvg style={{marginRight: theme.layout.s3}} />
                  <Text
                    style={{fontFamily: theme.fonts.families.primary.semibold}}>
                    Normal
                  </Text>
                </View>
              ) : (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <SadFaceIconSvg style={{marginRight: theme.layout.s3}} />
                  <Text
                    style={{fontFamily: theme.fonts.families.primary.semibold}}>
                    Bad
                  </Text>
                </View>
              )}
            </View>
            <Input
              placeholder="Add your comment here..."
              style={{height: 110, marginBottom: theme.layout.s3}}
              multiline
              numberOfLines={5}
              value={comment}
              onChangeText={onCommentInput}
            />
            <Button
              title="Proceed and close"
              onPress={() =>
                navigation.reset({
                  index: 0,
                  routes: [{name: 'Scanner'}],
                })
              }
              disabled={!comment}
            />
          </View>
        </PageContainer>
      </SafeScrollerContainer>
      <MenuButton />
    </KeyboardAvoidingContainer>
  );
};

export default FeedbackAfterSecondScreen;
