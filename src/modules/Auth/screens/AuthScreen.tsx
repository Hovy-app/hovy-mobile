import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {View, ActivityIndicator, Alert} from 'react-native';
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
import {RootState} from '../../../redux/store';
import {getShopData, setShopData, ShopDataType} from '../reducer/authReducer';
import {useDispatchRequest} from '@redux-requests/react';

const AuthScreen: React.FC = () => {
  const {theme} = useTheme();
  const navigation = useNavigation();
  const dispatch = useDispatchRequest();

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const qrPlaceId = useSelector<RootState, string | null>(
    (state) => state.scannerReducer.qrPlaceId
  );
  const shopData = useSelector<RootState, ShopDataType | null>(
    (state) => state.authReducer.shopData
  );

  useEffect(() => {
    if (qrPlaceId)
      dispatch(getShopData(qrPlaceId))
        .then(({data, error}) => {
          if (error) setIsError(true);
          else
            dispatch(
              setShopData({
                id: data.shop.id,
                name: data.shop.name,
                address: data.shop.address,
                pictureUrl: data.shop.logoUrl,
                services: data.services,
              })
            );
        })
        .catch(() => {
          setIsError(true);
          setIsLoading(false);
        });
  }, [qrPlaceId, dispatch]);

  useEffect(() => {
    if (shopData) setIsLoading(false);
  }, [shopData]);

  return (
    <KeyboardAvoidingContainer>
      <SafeScrollerContainer isFlex>
        <PageContainer>
          <View
            style={{
              paddingTop: theme.layout.s4,
            }}>
            {isLoading && <ActivityIndicator />}
            {shopData && (
              <>
                <CompanyCard
                  title={shopData.name}
                  address={shopData.address}
                  pictureUrl={shopData.pictureUrl}
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
                  onPress={() =>
                    Alert.alert('We still working on this feature :) ')
                  }
                />
                <Button
                  title="Mobile ID"
                  iconLeft={<MobileIDIconSvg fill={theme.colors.textInverse} />}
                  onPress={() => navigation.navigate('AuthMobile')}
                />
              </>
            )}
            {isError && (
              <View
                style={{
                  backgroundColor: theme.colors.uiError,
                  padding: theme.layout.s4,
                  borderRadius: theme.radii.sm,
                }}>
                <Text colorType="error">Error loading company data.</Text>
              </View>
            )}
          </View>
        </PageContainer>
      </SafeScrollerContainer>
    </KeyboardAvoidingContainer>
  );
};

export default AuthScreen;
