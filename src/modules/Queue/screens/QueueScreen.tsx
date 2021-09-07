import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';

import {View, SafeAreaView, ActivityIndicator} from 'react-native';
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
import {RootState} from '../../../redux/store';
import {ShopDataType} from '../../Auth/reducer/authReducer';
import {
  enterQueue,
  setQueueData,
  getQueueStatus,
  updateQueueData,
  QueueDataType,
} from '../reducer/queueReducer';
import {useDispatchRequest} from '@redux-requests/react';

const AuthMobileScreen: React.FC = () => {
  const {theme} = useTheme();
  const navigation = useNavigation();
  const dispatch = useDispatchRequest();

  const [type, setType] = useState<'default' | 'attention' | 'process'>(
    'default'
  );
  const [checkedList, setCheckedList] = useState<Set<number>>(new Set());
  const [isCancelled, setIsCancelled] = useState(false);
  const [isError, setIsError] = useState(false);

  const shopData = useSelector<RootState, ShopDataType | null>(
    (state) => state.authReducer.shopData
  );
  const queueData = useSelector<RootState, QueueDataType | null>(
    (state) => state.queueReducer.queueData
  );

  useEffect(() => {
    return () => {
      setIsCancelled(true);
      dispatch(setQueueData(null));
    };
  }, [dispatch]);

  useEffect(() => {
    let int: number | null = null;
    if (shopData && type !== 'attention' && !isCancelled)
      dispatch(enterQueue(shopData.id)).then(({data}) => {
        dispatch(
          setQueueData({
            myQueueNumber: data.queueNumber,
            currentQueueNumber: data.current,
            peopleLeft: data.peopleLeft,
          })
        );
        int = setInterval(() => {
          if (!isCancelled)
            dispatch(getQueueStatus(shopData.id, data.queueNumber)).then(
              ({data: updData}) => {
                if (type !== 'process' && !isCancelled)
                  dispatch(
                    setQueueData({
                      myQueueNumber: data.queueNumber,
                      currentQueueNumber: updData.current,
                      peopleLeft: updData.peopleLeft,
                    })
                  );
              }
            );
        }, 2000);
      });

    return () => {
      if (int) clearInterval(int);
    };
  }, [shopData, dispatch, type, isCancelled]);

  const check = (id: number): void => {
    setCheckedList((prev) => {
      const prevCopy = new Set(prev);
      if (prev.has(id)) prevCopy.delete(id);
      else prevCopy.add(id);
      return prevCopy;
    });
  };

  useEffect(() => {
    if (queueData && queueData.myQueueNumber === queueData.currentQueueNumber) {
      setType('attention');
      setTimeout(() => {
        setType('process');
      }, 5000);
    }
  }, [queueData]);

  // useEffect(() => {
  //   const inter = setInterval(() => {
  //     setPeopleCount((old) => {
  //       if (old === 1) {
  //         setType('attention');
  //         clearInterval(inter);
  //         return old;
  //       }
  //       return old - 1;
  //     });
  //   }, 3000);

  //   return () => {
  //     clearInterval(inter);
  //   };
  // }, []);

  useEffect(() => {
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
            {shopData && !isError && (
              <>
                {queueData ? (
                  <>
                    <View
                      style={{
                        alignSelf: 'center',
                        backgroundColor:
                          (queueData.peopleLeft <= 5 && type === 'default') ||
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
                          ? queueData.peopleLeft <= 5
                            ? `${queueData.peopleLeft} people in front of you.`
                            : 'We’ll notify you when it’s your turn.'
                          : type === 'attention'
                          ? `It's your turn (${queueData.myQueueNumber})`
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
                      title={shopData.name}
                      address={shopData.address}
                      pictureUrl={shopData.pictureUrl}
                      style={{marginBottom: theme.layout.s5}}
                      queueNumber={
                        type === 'default'
                          ? queueData.myQueueNumber
                          : type === 'attention'
                          ? 5
                          : '📦'
                      }
                    />
                  </>
                ) : (
                  <ActivityIndicator
                    size="large"
                    style={{marginBottom: theme.layout.s5}}
                  />
                )}
                {type !== 'process' ? (
                  <>
                    {type === 'default' ? (
                      <>
                        {shopData.services.map(({index, name}) => (
                          <Button
                            key={name}
                            title={name}
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
                                value={checkedList.has(index)}
                              />
                            }
                            titleStyle={{color: theme.colors.textPrimary}}
                            onPress={check.bind(null, index)}
                          />
                        ))}
                      </>
                    ) : null}
                    <Button
                      title="Leave the venue"
                      style={{
                        marginBottom: theme.layout.s5,
                        backgroundColor: theme.colors.uiError,
                      }}
                      titleStyle={{color: theme.colors.textPrimary}}
                      onPress={() => {
                        navigation.navigate('FeedbackLeaveFirst');
                      }}
                    />
                  </>
                ) : null}
                {/* <Text
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
                  <Text
                    style={{fontFamily: theme.fonts.families.primary.semibold}}>
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
                  <Text
                    style={{fontFamily: theme.fonts.families.primary.semibold}}>
                    CC961667512EE
                  </Text>
                  <Text type="description">Netherlands, 21-11-2020, 13:30</Text>
                </View> */}
              </>
            )}
            {isError && (
              <View
                style={{
                  backgroundColor: theme.colors.uiError,
                  padding: theme.layout.s4,
                  borderRadius: theme.radii.sm,
                }}>
                <Text colorType="error">Error loading data.</Text>
              </View>
            )}
          </View>
        </PageContainer>
      </SafeScrollerContainer>
      <MenuButton />
    </KeyboardAvoidingContainer>
  );
};

export default AuthMobileScreen;
