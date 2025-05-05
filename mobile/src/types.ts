import type {RouteProp} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';

export type RootStackParamList = {
  Home: undefined;
  AddLottery: undefined;
  RegisterModal: {selectedLotteryList: string[]};
};

export type NavigationProp = StackNavigationProp<
  RootStackParamList,
  'AddLottery',
  'RegisterModal'
>;

export type Lottery = {
  id: string;
  name: string;
  prize: string;
  status: 'running'; // update this
  type: 'simple';
};

export type Register = {
  lotteryId: string;
  name: string;
};

export type RegisterScreenRouteProp = RouteProp<RootStackParamList, 'RegisterModal'>;
