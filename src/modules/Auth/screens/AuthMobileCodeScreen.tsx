import React, {useEffect, useState} from 'react';

import {useSelector} from 'react-redux';
import {View, ActivityIndicator} from 'react-native';
import {Route, useNavigation, useRoute} from '@react-navigation/native';

import KeyboardAvoidingContainer from '../../../components/ui/KeyboardAvoidingContainer';
import PageContainer from '../../../components/common/PageContainer';
import SafeScrollerContainer from '../../../components/common/SafeScrollerContainer';

import Text from '../../../components/ui/Text';
import MobileIDIconSvg from '../../../assets/images/icons/mobile-id.svg';
import {useTheme} from '../../Theme/hooks/useTheme';
import {useDispatchRequest} from '@redux-requests/react';
import {authMobileId} from '../reducer/authReducer';
import {RootState} from '../../../redux/store';

const AuthMobileCodeScreen: React.FC = () => {
  const {theme} = useTheme();
  const navigation = useNavigation();
  const route = useRoute<
    Route<'AuthMobileCode', {phoneNumber: string; userIsi: string}>
  >();
  const dispatch = useDispatchRequest();

  const [isError, setIsError] = useState(false);

  const qrPlaceId = useSelector<RootState, string | null>(
    (state) => state.scannerReducer.qrPlaceId
  );

  useEffect(() => {
    if (route.params.phoneNumber && qrPlaceId)
      dispatch(
        authMobileId(route.params.phoneNumber, route.params.userIsi, qrPlaceId)
      )
        .then(({error}) => {
          if (error) setIsError(true);
          else navigation.reset({index: 0, routes: [{name: 'Queue'}]});
        })
        .catch(() => setIsError(true));
  }, [dispatch, route.params, qrPlaceId, navigation]);

  return (
    <KeyboardAvoidingContainer>
      <SafeScrollerContainer isFlex>
        <PageContainer>
          <View style={{paddingTop: theme.layout.s4}}>
            {!isError && (
              <>
                <ActivityIndicator
                  size="large"
                  style={{marginBottom: theme.layout.s4}}
                  color={theme.colors.uiGrey}
                />
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
                  In order to log in using Mobiil-ID, enter the Mobiil-ID PIN1
                  into your phone after you receive an SMS with the same control
                  code you can see here.
                </Text>
              </>
            )}
            {isError && (
              <View
                style={{
                  backgroundColor: theme.colors.uiError,
                  padding: theme.layout.s4,
                  borderRadius: theme.radii.sm,
                }}>
                <Text colorType="error">Error checking your phone number.</Text>
              </View>
            )}
          </View>
        </PageContainer>
      </SafeScrollerContainer>
    </KeyboardAvoidingContainer>
  );
};

export default AuthMobileCodeScreen;
