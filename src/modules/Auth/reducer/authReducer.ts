import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export type ShopServiceType = {
  index: number;
  name: string;
};

export type ShopDataType = {
  id: number;
  name: string;
  address: string;
  pictureUrl: string;
  services: ShopServiceType[];
};

type InitialStateType = {
  shopData: ShopDataType | null;
};

const initialState: InitialStateType = {
  shopData: null,
  // accessToken: null,
  // refreshToken: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    getShopData: {
      reducer() {
        /* NULL */
      },
      prepare(qrPlaceId: string) {
        return {
          payload: {
            request: {
              url: `/shopInfo/${qrPlaceId}`,
              method: 'GET',
            },
          },
          meta: {
            driver: 'default',
          },
        };
      },
    },
    setShopData: {
      reducer(state, action: PayloadAction<{shopData: ShopDataType | null}>) {
        const {shopData} = action.payload;

        state.shopData = shopData;
      },
      prepare(shopData: ShopDataType | null) {
        return {
          payload: {
            request: null,
            shopData,
          },
        };
      },
    },
    authMobileId: {
      reducer() {
        /* NULL */
      },
      prepare(phone: string, qrPlaceId: string) {
        const secureString = 38211150129;

        return {
          payload: {
            request: {
              url: `/scan/${secureString}/${phone}/${qrPlaceId}`,
              method: 'GET',
            },
          },
          meta: {
            driver: 'default',
          },
        };
      },
    },
  },
});

export const {getShopData, setShopData, authMobileId} = authSlice.actions;

export default authSlice.reducer;
