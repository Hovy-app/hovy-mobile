import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {generateApiAction} from '../../../utils/requestUtils';

export type UserDataType = {
  id: number;
  name: string;
  lastName: string;
  patronymic: string;
  login: string;
  email: string;
  phone: number;
  address: string | null;
  description: string | null;
  token: string;
  createDate: string;
};

type InitialStateType = {
  userData: UserDataType | null;
};

const initialState: InitialStateType = {
  userData: null,
  // accessToken: null,
  // refreshToken: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: {
      reducer() {
        /** REDUCER */
      },
      prepare(login: string, password: string) {
        const data = generateApiAction('Myqr', 'Manager', 'loginManager');

        data.append('login', login);
        data.append('password', password);

        return {
          payload: {
            request: {
              url: '/api.php',
              method: 'POST',
              data,
            },
          },
          meta: {
            driver: 'default',
          },
        };
      },
    },
    setUserData: {
      reducer(state, action: PayloadAction<{userData: UserDataType | null}>) {
        const {userData} = action.payload;

        state.userData = userData;
      },
      prepare(userData: UserDataType | null) {
        return {
          payload: {
            request: null,
            userData,
          },
        };
      },
    },
  },
});

export const {login, setUserData} = authSlice.actions;

export default authSlice.reducer;
