import { Box } from '@mui/material';
import { Lottery } from '../../types';
import LotteryCard from './LotteryCard';

const LotteryList = ({
  lotteryList,
  setSelectedLotteryList,
}: {
  lotteryList: Lottery[];
  setSelectedLotteryList: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  const handleSelectCard = (lottery: Lottery) => {
    const lotteryId = lottery.id;

    setSelectedLotteryList((items) => {
      const index = items.findIndex((id) => id === lotteryId);
      if (index >= 0) {
        // as this is an study: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toSpliced
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
        return items.toSpliced(index, 1);
      }
      return [...items, lotteryId];
    });
  };

  return (
    <Box
      sx={{ margin: '12px' }}
      display="grid"
      gridTemplateColumns="1fr 1fr 1fr"
      gap="16px"
    >
      {lotteryList.map((lottery) => (
        <LotteryCard
          key={lottery.id}
          lottery={lottery}
          onCardSelect={handleSelectCard}
        />
      ))}
    </Box>
  );
};

export default LotteryList;
