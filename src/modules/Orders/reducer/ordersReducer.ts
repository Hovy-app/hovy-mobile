import {createSlice} from '@reduxjs/toolkit';
import moment from 'moment';

import {generateApiAction} from '../../../utils/requestUtils';

export type OrderDataType = {
  id: number;
  sum: number;
  datePayment: string;
  eventName: string;
  countsMonth: number;
  userId: number;
  firstName: string;
  lastName: string | null;
  middleName: string | null;
  contractorKey: number | null;
  contractorCaption: string | null;
  userPhone: number | string | null;
  userEmail: string | null;
  presentAddress: string | null;
  presentDateSend: string | null;
  presentNote: string | null;
};

export type OrderFiltersType = {
  eventIds?: number[] | null;
  orderId?: number | null;
  userId?: number | null;
  userEmail?: string | null;
  contractorKey?: number | null;
};

type InitialStateType = {};

const initialState: InitialStateType = {};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    getOrders: {
      reducer() {
        /** REDUCER */
      },
      prepare(offset: 0, limit: 10, filtes?: OrderFiltersType) {
        const data = generateApiAction(
          'Myqr',
          'Manager',
          'listTransactionsPresent'
        );

        data.append('offset', offset);
        data.append('limit', limit);

        filtes?.eventIds?.forEach((el) => {
          data.append('filters[transactions_invoice.journal_id][]', el);
        });

        if (filtes?.orderId)
          data.append('filters[transactions.id]', filtes.orderId);

        if (filtes?.userId)
          data.append('filters[transactions.user_id]', filtes.userId);

        if (filtes?.userEmail)
          data.append('filters[users.email]', filtes.userEmail);

        if (filtes?.contractorKey)
          data.append(
            'filters[contractors.contractor_key]',
            filtes.contractorKey
          );

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
    setOrderPresentsStatus: {
      reducer() {
        /** REDUCER */
      },
      prepare(orderId: number, value: boolean) {
        let data;

        if (value) {
          data = generateApiAction(
            'Myqr',
            'Manager',
            'createTransactionPresent'
          );

          data.append('transaction_id', orderId);
          data.append('date_send', moment().format('YYYY-MM-DD'));
          data.append('address', 'Отмечено с приложения.');
          data.append('present_note', 'Отмечено с приложения.');
        } else {
          data = generateApiAction(
            'Myqr',
            'Manager',
            'removeTransactionPresent'
          );

          data.append('transaction_id', orderId);
        }

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
  },
});

export const {getOrders, setOrderPresentsStatus} = ordersSlice.actions;

export default ordersSlice.reducer;
