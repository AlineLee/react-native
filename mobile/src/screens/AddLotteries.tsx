import {Formik} from 'formik';
import React, {useEffect} from 'react';
import {View, StyleSheet, Text, Button, TextInput} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NavigationProp} from '../types';
import {useCreateNewLottery} from '../service/lottery';
import {useToast} from 'react-native-toast-notifications';
import * as Yup from 'yup';

export const AddLottery = () => {
  const navigation = useNavigation<NavigationProp>();
  const {mutate, error, isPending, isSuccess} = useCreateNewLottery();
  const toast = useToast();

  const initialValues = {
    name: '',
    prize: '',
  };
  const schema = Yup.object({
    name: Yup.string().min(4).required(),
    prize: Yup.string().min(4).required(),
  });

  const handleFormikSubmit = (values: {name: string; prize: string}) => {
    mutate({name: values.name, prize: values.prize});
  };

  useEffect(() => {
    if (isSuccess) {
      navigation.goBack();
      toast.show('Success!');
    }
  }, [isSuccess, navigation, toast]);

  return (
    <View style={styles.container}>
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
            <Text style={styles.title}>Add a new lottery</Text>

            <TextInput
              id="name"
              style={styles.input}
              placeholder="Lottery name"
              value={values.name}
              onChange={handleChange}
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
            />
            {errors.name && <Text>{errors.name}</Text>}

            <TextInput
              id="prize"
              style={styles.input}
              placeholder="Lottery prize"
              value={values.prize}
              onChange={handleChange}
              onChangeText={handleChange('prize')}
              onBlur={handleBlur('prize')}
            />
            {errors.prize && <Text>{errors.prize}</Text>}

            <Button
              disabled={isPending || !isValid}
              title="Add"
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
    margin: 16,
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
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
