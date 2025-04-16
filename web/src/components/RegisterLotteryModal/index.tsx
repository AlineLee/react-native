import { Box, Button, Input, Modal, Typography } from '@mui/material';
import { Formik, FormikHelpers } from 'formik';
import { useState } from 'react';
import { registerLotteries } from '../../service/lottery';
import { object, string } from 'yup';

const RegisterLotteryModal = ({
  selectedLotteryList,
  open,
  onClose,
}: {
  selectedLotteryList: string[];
  open: boolean;
  onClose: (status: string) => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = (status: string) => {
    onClose(status);
  };

  const handleSubmit = async (
    values: { name: string },
    actions: FormikHelpers<{ name: string }>,
  ) => {
    setIsLoading(true);
    for (const lotteryId of selectedLotteryList) {
      try {
        await registerLotteries({
          name: values.name,
          lotteryId: lotteryId,
        });
      } catch {
        handleClose('Fail');
        return;
      }
    }
    handleClose('Success');
    actions.resetForm();
    setIsLoading(false);
  };

  return (
    <Formik
      enableReinitialize
      initialValues={{ name: '' }}
      validationSchema={object({
        name: string().min(3, 'Min 3 letters').required('The name is required'),
      })}
      onSubmit={(values, actions) => handleSubmit(values, actions)}
    >
      {({ isSubmitting, handleSubmit, values, handleChange, errors }) => (
        <Modal open={open} onClose={handleClose}>
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
              <Typography>Register for a lottery</Typography>
              <Input
                id="name"
                name="name"
                placeholder="Customer name"
                value={values.name}
                onChange={handleChange}
              />
              {errors.name && (
                <Typography variant="body1" color="red">
                  {errors.name}
                </Typography>
              )}
              <Button
                loading={isLoading}
                variant="outlined"
                type="submit"
                disabled={isSubmitting}
              >
                REGISTER
              </Button>
            </Box>
          </form>
        </Modal>
      )}
    </Formik>
  );
};

export default RegisterLotteryModal;
