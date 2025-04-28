import { useCallback, useEffect, useState } from 'react';
import NewLotteryModal from '../../components/NewLotteryModal';
import {
  Button,
  Box,
  Snackbar,
  Typography,
  Container,
  TextField,
  InputAdornment,
} from '@mui/material';
import { Lottery } from '../../types';
import LotteryList from '../../components/LotteryList';
import { getLotteries } from '../../service/lottery';
import RegisterLotteryModal from '../../components/RegisterLotteryModal';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';

const Home = () => {
  const [showNewLotteryModal, setShowNewLotteryModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');

  const [fullLotteryList, setFullLotteryList] = useState<Lottery[]>([]);
  const [lotteryList, setLotteryList] = useState<Lottery[]>([]);
  const [selectedLotteryList, setSelectedLotteryList] = useState<string[]>([]);

  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const loadLotteries = useCallback(
    () =>
      getLotteries()
        .then((value) => {
          setFullLotteryList(value);
        })
        .finally(() => setIsLoading(false)),
    [],
  );

  useEffect(() => {
    loadLotteries().catch(() => console.log('Error on initial loading'));
  }, [loadLotteries]);

  useEffect(() => {
    const list = fullLotteryList.filter(
      (lottery) =>
        lottery.name.toLowerCase().search(searchTerm.toLowerCase()) !== -1,
    );

    setLotteryList(list);
  }, [fullLotteryList, searchTerm]);

  const handleCloseModal = (lottery?: Lottery) => {
    setShowNewLotteryModal(false);
    if (lottery) {
      loadLotteries().catch(() => console.log('Error reloading the items'));
      setMessage(`Saved: ${lottery.name}`);
      setShowNotification(true);
    }
  };

  const handleCloseRegisterModal = (status: string) => {
    setShowRegisterModal(false);
    if (status === 'Success') {
      setMessage('Registered');
      setShowNotification(true);
    }
  };

  const handleAddLottery = () => setShowNewLotteryModal(!showNewLotteryModal);
  const handleRegister = () => setShowRegisterModal(!showRegisterModal);

  if (isLoading) {
    return <>Loading...</>;
  }

  return (
    <Container>
      <Typography variant="h3" textAlign="center" marginBottom={2}>
        Lotteries
      </Typography>
      <Box display="flex" justifyContent="center" marginBottom={4}>
        <TextField
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="start">
                  <ManageSearchIcon />
                </InputAdornment>
              ),
            },
          }}
        />
      </Box>

      {!isLoading && !lotteryList.length ? (
        <Box textAlign="center">
          <Typography>No search results for {searchTerm}</Typography>
        </Box>
      ) : (
        <LotteryList
          lotteryList={lotteryList}
          setSelectedLotteryList={setSelectedLotteryList}
        />
      )}

      <Box
        display="flex"
        position="fixed"
        bottom="0"
        right="0"
        margin="16px"
        gap={1}
      >
        <Button
          disabled={!selectedLotteryList.length}
          variant="contained"
          onClick={handleRegister}
        >
          Register
        </Button>
        <Button variant="contained" onClick={handleAddLottery}>
          + ADD LOTTERY
        </Button>
      </Box>

      <NewLotteryModal open={showNewLotteryModal} onClose={handleCloseModal} />
      <RegisterLotteryModal
        open={showRegisterModal}
        onClose={handleCloseRegisterModal}
        selectedLotteryList={selectedLotteryList}
      />

      <Snackbar
        autoHideDuration={1000}
        open={showNotification}
        message={message}
      />
    </Container>
  );
};

export default Home;
