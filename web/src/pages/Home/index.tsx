import { useState } from 'react';
import NewLotteryModal from '../../components/NewLotteryModal';
import { Button, Box, Snackbar } from '@mui/material';
import { Lottery } from '../../types';

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [message, setMessage] = useState('');

  const handleCloseModal = (lottery?: Lottery) => {
    setShowModal(false);
    if (lottery) {
      setMessage(lottery.name);
      setShowNotification(true);
    }
  };

  const handleAddLottery = () => setShowModal(!showModal);

  return (
    <Box>
      <Box position="fixed" bottom="0" right="0" margin="16px">
        <Button variant="contained" onClick={handleAddLottery}>
          + ADD LOTTERY
        </Button>
      </Box>
      <NewLotteryModal open={showModal} onClose={handleCloseModal} />
      <Snackbar open={showNotification} message={`Saved: ${message}`} />
    </Box>
  );
};

export default Home;
