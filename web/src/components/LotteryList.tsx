import { Box, Typography } from '@mui/material';
import LotteryCard from './LotteryCard';
import { Lottery } from '../types';
import { Casino } from '@mui/icons-material';

interface Props {
  lotteries: Array<Lottery>;
  selectedLotteries: Array<string>;
  onSelect: (lotteryId: string) => void;
}

export default function LotteryList({
  lotteries,
  selectedLotteries,
  onSelect,
}: Props) {
  return (
    <Box
      sx={{
        display: 'flex',
        height: '100%',
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography
        sx={{
          my: 8,
        }}
        variant="h1"
      >
        Lotteries
        <Casino sx={{ ml: 4, fontSize: 60 }} />
      </Typography>
      <Box
        sx={{
          display: 'flex',
          height: '100%',
          maxWidth: '1000px',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'flex-start',
          alignContent: 'flex-start',
        }}
      >
        {lotteries.map((lottery) => (
          <LotteryCard
            key={lottery.id}
            lottery={lottery}
            selected={selectedLotteries.includes(lottery.id)}
            onSelect={() => onSelect(lottery.id)}
          />
        ))}
      </Box>
    </Box>
  );
}
