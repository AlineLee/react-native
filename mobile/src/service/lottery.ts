// import { REACT_APP_API_URL } from '@env';
const REACT_APP_API_URL = 'http://192.168.50.106:3000';

import {useMutation, useQuery} from '@tanstack/react-query';
import {Lottery} from '../types';

export const useCreateNewLottery = () => {
  return useMutation({
    mutationFn: ({name, prize}: {name: string; prize: string}) =>
      fetch(`${REACT_APP_API_URL}/lotteries`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'simple',
          name,
          prize,
        }),
      }),
  });
};

export const useGetLotteries = () =>
  useQuery<Lottery[]>({
    queryKey: ['lotteries'],
    queryFn: async () => {
      const response = await fetch(`${REACT_APP_API_URL}/lotteries`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const body = await response.json();

      return body;
    },
  });

export const useRegisterLotteries = () => {
  return useMutation({
    mutationFn: ({lotteries, name}: {lotteries: string[]; name: string}) =>
      Promise.all(
        lotteries.map(lotteryId =>
          fetch(`${REACT_APP_API_URL}/register`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              lotteryId,
              name,
            }),
          }),
        ),
      ),
  });
};
