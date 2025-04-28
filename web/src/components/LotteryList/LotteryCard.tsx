import { Card, CardActionArea, CardContent, Typography } from '@mui/material';
import { Lottery } from '../../types';
import { useState } from 'react';

const LotteryCard = ({
  lottery,
  onCardSelect,
}: {
  lottery: Lottery;
  onCardSelect: (lottery: Lottery) => void;
}) => {
  const [selected, setSelected] = useState(false);

  const handleSelectCard = (lottery: Lottery) => {
    setSelected(!selected);
    onCardSelect(lottery);
  };

  return (
    <Card variant="outlined">
      <CardActionArea
        onClick={() => handleSelectCard(lottery)}
        data-active={selected ? '' : undefined}
        sx={{
          height: '100%',
          '&[data-active]': {
            backgroundColor: 'action.selected',
            '&:hover': {
              backgroundColor: 'action.selectedHover',
            },
          },
        }}
      >
        <CardContent sx={{ height: '100%' }}>
          <Typography variant="h5">{lottery.name}</Typography>
          <Typography variant="body2" color="text.secondary">
            {lottery.prize}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {lottery.id}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default LotteryCard;
