import React, {useEffect, useState} from 'react';

import {View, SafeAreaView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import CheckBox from '@react-native-community/checkbox';

import KeyboardAvoidingContainer from '../../../components/ui/KeyboardAvoidingContainer';
import PageContainer from '../../../components/common/PageContainer';
import SafeScrollerContainer from '../../../components/common/SafeScrollerContainer';
import MenuButton from '../../../components/common/MenuButton';

import Button from '../../../components/ui/Button';
import Text from '../../../components/ui/Text';
import QueueCard from '../../../components/ui/QueueCard';
import SmartIDIconSvg from '../../../assets/images/icons/smart-id.svg';
import MobileIDIconSvg from '../../../assets/images/icons/mobile-id.svg';
import {useTheme} from '../../Theme/hooks/useTheme';

const AuthMobileScreen: React.FC = () => {
  const {theme} = useTheme();
  const navigation = useNavigation();

  const [type, setType] = useState<'default' | 'attention' | 'process'>(
    'default'
  );
  const [peopleCount, setPeopleCount] = useState(5);
  const [queueNumber] = useState(Math.floor(Math.random() * (999 - 101)) + 101);
  const [sendChecked, setSendChecked] = useState(false);
  const [receiveChecked, setReceiveChecked] = useState(false);

  useEffect(() => {
    const inter = setInterval(() => {
      setPeopleCount((old) => {
        if (old === 1) {
          setType('attention');
          clearInterval(inter);
          return old;
        }
        return old - 1;
      });
    }, 3000);

    return () => {
      clearInterval(inter);
    };
  }, []);

  useEffect(() => {
    if (type === 'attention') {
      setTimeout(() => {
        setType('process');
      }, 6000);
    }
    if (type === 'process') {
      setTimeout(() => {
        navigation.reset({
          index: 0,
          routes: [{name: 'FeedbackAfterFirst'}],
        });
      }, 5000);
    }
  }, [type, navigation]);

  return (
    <KeyboardAvoidingContainer>
      <SafeScrollerContainer isFlex>
        <PageContainer>
          <View style={{paddingTop: theme.layout.s4}}>
            <View
              style={{
                alignSelf: 'center',
                backgroundColor:
                  (peopleCount <= 3 && type === 'default') ||
                  type === 'attention'
                    ? theme.colors.uiYellow
                    : theme.colors.bgSecondary,
                paddingVertical: theme.layout.s3,
                paddingHorizontal: theme.layout.s4,
                borderRadius: 100,
                marginBottom: theme.layout.s4,
              }}>
              <Text>
                {type === 'default'
                  ? peopleCount <= 3
                    ? `${peopleCount} people in front of you.`
                    : 'We’ll notify you when it’s your turn.'
                  : type === 'attention'
                  ? `It's your turn (${queueNumber})`
                  : 'In-Progress...'}
              </Text>
            </View>
            <QueueCard
              type={type}
              label={
                type === 'default'
                  ? 'Your number is'
                  : type === 'attention'
                  ? 'Come to desk number'
                  : ' '
              }
              title="Arsenali Postkontor"
              address="Erika 14, 10416 Tallinn"
              pictureUrl="https://meetfrank.com/blog/wp-content/uploads/2019/11/omniva.png"
              style={{marginBottom: theme.layout.s5}}
              queueNumber={
                type === 'default'
                  ? queueNumber
                  : type === 'attention'
                  ? 5
                  : '📦'
              }
            />
            {type !== 'process' ? (
              <>
                {type === 'default' ? (
                  <>
                    <Button
                      title="Receive package"
                      style={{
                        marginBottom: theme.layout.s3,
                        backgroundColor: theme.colors.uiBorder,
                      }}
                      iconLeft={
                        <CheckBox
                          onTintColor={theme.colors.textPrimary}
                          onCheckColor={theme.colors.textPrimary}
                          style={{
                            width: 20,
                            height: 20,
                          }}
                          value={receiveChecked}
                        />
                      }
                      titleStyle={{color: theme.colors.textPrimary}}
                      onPress={setReceiveChecked.bind(null, !receiveChecked)}
                    />
                    <Button
                      title="Send package"
                      style={{
                        marginBottom: theme.layout.s3,
                        backgroundColor: theme.colors.uiBorder,
                      }}
                      iconLeft={
                        <CheckBox
                          onTintColor={theme.colors.textPrimary}
                          onCheckColor={theme.colors.textPrimary}
                          style={{
                            width: 20,
                            height: 20,
                          }}
                          value={sendChecked}
                        />
                      }
                      titleStyle={{color: theme.colors.textPrimary}}
                      onPress={setSendChecked.bind(null, !sendChecked)}
                    />
                  </>
                ) : null}
                <Button
                  title="Leave the venue"
                  style={{
                    marginBottom: theme.layout.s5,
                    backgroundColor: theme.colors.uiError,
                  }}
                  titleStyle={{color: theme.colors.textPrimary}}
                />
              </>
            ) : null}
            <Text
              style={{
                fontFamily: theme.fonts.families.primary.semibold,
                color: theme.colors.uiGrey,
                marginBottom: theme.layout.s3,
              }}>
              2 packages found
            </Text>
            <View
              style={{
                padding: theme.layout.s4,
                backgroundColor: theme.colors.bgSecondary,
                borderRadius: theme.radii.sm,
                marginBottom: theme.layout.s3,
              }}>
              <Text style={{fontFamily: theme.fonts.families.primary.semibold}}>
                CC961667511EE
              </Text>
              <Text type="description">China, 22-11-2020, 17:50</Text>
            </View>
            <View
              style={{
                padding: theme.layout.s4,
                backgroundColor: theme.colors.bgSecondary,
                borderRadius: theme.radii.sm,
                marginBottom: theme.layout.s3,
              }}>
              <Text style={{fontFamily: theme.fonts.families.primary.semibold}}>
                CC961667512EE
              </Text>
              <Text type="description">Netherlands, 21-11-2020, 13:30</Text>
            </View>
          </View>
        </PageContainer>
      </SafeScrollerContainer>
      <MenuButton />
    </KeyboardAvoidingContainer>
  );
};

export default AuthMobileScreen;
