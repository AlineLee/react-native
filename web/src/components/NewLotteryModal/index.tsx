import { Box, Input, Typography, Modal, Button } from '@mui/material';
import { Formik, FormikHelpers } from 'formik';
import { createLottery } from '../../service/lottery';
import { useState } from 'react';
import { Lottery } from '../../types';
import { object, string } from 'yup';

const NewLotteryModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: (lottery?: Lottery) => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = (lottery?: Lottery) => {
    onClose(lottery);
  };

  const initialValues = {
    name: '',
    prize: '',
  };

  const validationSchema = object({
    name: string().min(3, 'Min 3 letters').required('The name is required'),
    prize: string().min(3, 'Min 3 letters').required('The prize is required'),
  });

  const handleSubmit = (
    values: { name: string; prize: string },
    actions: FormikHelpers<{ name: string; prize: string }>,
  ) => {
    setIsLoading(true);
    createLottery({ name: values.name, prize: values.prize })
      .then((values) => {
        handleClose(values);
        actions.resetForm();
      })
      .catch((error) => {
        // todo: let the user know the error
        console.log(error);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, actions) => handleSubmit(values, actions)}
    >
      {({ isSubmitting, handleSubmit, values, handleChange, errors }) => (
        <Modal
          open={open}
          onClose={() => handleClose()}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <form onSubmit={handleSubmit}>
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
              <Typography variant="h6">Add a new lottery</Typography>

              <Input
                id="name"
                name="name"
                placeholder="Lottery name"
                value={values.name}
                onChange={handleChange}
              />
              {errors.name && (
                <Typography variant="body1" color="red">
                  {errors.name}
                </Typography>
              )}

              <Input
                id="prize"
                name="prize"
                placeholder="Lottery prize"
                value={values.prize}
                onChange={handleChange}
              />
              {errors.prize && (
                <Typography variant="body1" color="red">
                  {errors.prize}
                </Typography>
              )}
              <Button
                loading={isLoading}
                variant="outlined"
                type="submit"
                disabled={isSubmitting}
              >
                ADD
              </Button>
            </Box>
          </form>
        </Modal>
      )}
    </Formik>
  );
};

export default NewLotteryModal;
