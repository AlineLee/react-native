import {View, StyleSheet, Text, Button, TextInput} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {NavigationProp, RegisterScreenRouteProp} from '../types';
import {Formik} from 'formik';
import {useRegisterLotteries} from '../service/lottery';
import {useEffect} from 'react';
import * as Yup from 'yup';
import useStore from '../store/useStore';

const RegisterModal = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RegisterScreenRouteProp>();
  const {mutate, error, isPending, isSuccess} = useRegisterLotteries();
  const {registerItems} = useStore();

  const {selectedLotteryList} = route.params;
  const initialValues = {
    name: '',
  };
  const schema = Yup.object({
    name: Yup.string().min(4).required(),
  });

  const handleFormikSubmit = (values: {name: string}) => {
    mutate({name: values.name, lotteries: selectedLotteryList});
  };

  useEffect(() => {
    if (isSuccess) {
      registerItems(selectedLotteryList);
      navigation.goBack();
    }
  }, [isSuccess, navigation, registerItems, selectedLotteryList]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register to lotteries</Text>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={values => handleFormikSubmit(values)}
        validationSchema={schema}>
        {({
          handleSubmit,
          values,
          handleChange,
          errors,
          handleBlur,
          isValid,
        }) => (
          <View>
            <TextInput
              id="name"
              style={styles.input}
              placeholder="Enter your name"
              value={values.name}
              onChange={handleChange}
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
            />
            {errors.name && <Text>{errors.name}</Text>}

            <Button
              disabled={isPending || !isValid}
              title="Register"
              onPress={_ => handleSubmit()}
            />

            {error && <Text>{error.message}</Text>}
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
  },
  input: {
    marginTop: 16,
    marginBottom: 16,
    paddingVertical: 16,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    fontSize: 16,
    borderBottomColor: 'gray',
  },
});

export default RegisterModal;
