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
