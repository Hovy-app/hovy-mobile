import {useState, useEffect, useCallback, useRef, RefObject} from 'react';
import {useDispatchRequest} from '@redux-requests/react';

import {useEvents} from '../../../../modules/Events/hooks/useEvents';
import {getOrders, OrderDataType, OrderFiltersType} from '../../reducer';
import {useErrorHandler} from '../../../Error/hooks/useErrorHandler';

export type UseOrdersType = {
  loadOrders: (
    offset: number,
    limit: number,
    filters?: OrderFiltersType
  ) => Promise<OrderDataType[] | null | void>;
  ordersData: OrderDataType[] | null;
  ordersDataRef: RefObject<OrderDataType[] | null>;
  isLoading: boolean;
};

export type OrderResponseType = {
  id: number;
  sum: number;
  date_payment: string;
  journal_name: string;
  counts_month: number;
  user_id: number;
  last_name: string | null;
  first_name: string;
  middle_name: string | null;
  contractor_key: number | null;
  contractor_caption: string | null;
  users_phones: number | string | null;
  users_emails: string | null;
  present_address: string | null;
  present_date_send: string | null;
  present_note: string | null;
};

export const isValidOrderResponseType = (
  data: unknown
): data is OrderResponseType => {
  if ((data as OrderResponseType).id) return true;
  return false;
};

export const isValidOrderType = (data: unknown): data is OrderDataType => {
  if ((data as OrderDataType).id) return true;
  return false;
};

export const isValidOrdersType = (data: unknown[]): data is OrderDataType[] => {
  if (!data.length || isValidOrderType(data[0])) return true;
  return false;
};

export const useOrders = (): UseOrdersType => {
  const dispatch = useDispatchRequest();
  const {handleError} = useErrorHandler();
  const {selectedEvents} = useEvents();
  const selectedEventsRef = useRef(selectedEvents);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [ordersData, setOrdersData] = useState<OrderDataType[] | null>(null);
  const ordersDataRef = useRef(ordersData);

  useEffect(() => {
    ordersDataRef.current = ordersData;
  }, [ordersData]);

  const loadOrders = useCallback(
    async (
      offset = 0,
      limit = 10,
      filters?: OrderFiltersType
    ): Promise<OrderDataType[] | null | void> => {
      try {
        setIsLoading(true);
        const result = await dispatch(
          getOrders(offset, limit, {
            eventIds: selectedEventsRef.current?.map((el) => el.id),
            ...filters,
          })
        );
        if (result.error) throw result.error;

        if (result.data?.code === 0) {
          const response = result.data?.data;

          const ordersDataLocal = response?.map((el: unknown) => {
            if (isValidOrderResponseType(el))
              return {
                id: el.id,
                sum: el.sum,
                datePayment: el.date_payment,
                eventName: el.journal_name,
                countsMonth: el.counts_month,
                userId: el.user_id,
                firstName: el.first_name,
                lastName: el.last_name,
                middleName: el.middle_name,
                contractorKey: el.contractor_key,
                contractorCaption: el.contractor_caption,
                userPhone: el.users_phones,
                userEmail: el.users_emails,
                presentAddress: el.present_address,
                presentDateSend: el.present_date_send,
                presentNote: el.present_note,
              };
          });

          if (isValidOrdersType(ordersDataLocal)) {
            setOrdersData((prev) => [
              ...((offset !== 0 ? prev : []) ?? []),
              ...ordersDataLocal,
            ]);
            setIsLoading(false);

            return ordersDataLocal;
          }
        }
        throw new Error();
      } catch (err) {
        setIsLoading(false);
        handleError(err);
      }
    },
    [dispatch, handleError]
  );

  return {
    loadOrders,
    ordersData,
    ordersDataRef,
    isLoading,
  };
};
