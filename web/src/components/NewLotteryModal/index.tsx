import { Box, Button, Input, Typography, Modal } from '@mui/material';
import { useFormik } from 'formik';
import { createLottery } from '../../service/lottery';
import { useState } from 'react';
import { Lottery } from '../../types';

const NewLotteryModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: (lottery: Lottery) => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = (lottery: Lottery) => {
    onClose(lottery);
  };

  const formik = useFormik({
    validateOnChange: true,
    initialValues: {
      name: '',
      prize: '',
    },
    onSubmit: (values) => {
      setIsLoading(true);
      createLottery({ name: values.name, prize: values.prize })
        .then((values) => handleClose(values))
        .catch((error) => {
          // todo: let the user know the error
          console.log(error);
        })
        .finally(() => setIsLoading(false));
    },
  });

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <form onSubmit={formik.handleSubmit}>
        <Box
          position="absolute"
          top="50%"
          left="50%"
          padding="24px"
          bgcolor="white"
          sx={{ transform: 'translate(-50%,-50%)' }}
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
          gap="24px"
        >
          <Typography>Add a new lottery</Typography>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="Lottery name"
            onChange={formik.handleChange}
            value={formik.values.name}
            required={true}
          />
          {/* Todo allow only numbers */}
          <Input
            id="prize"
            name="prize"
            placeholder="Lottery prize"
            onChange={formik.handleChange}
            value={formik.values.prize}
            required={true}
          />
          <Button variant="outlined" type="submit">
            {/* todo: use the component with the loading */}
            {isLoading ? 'Loading...' : 'ADD'}
          </Button>
        </Box>
      </form>
    </Modal>
  );
};

export default NewLotteryModal;
