import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Button,
  TextInput,
  NativeModules,
} from 'react-native';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {Lottery, NavigationProp} from '../types';
import {useGetLotteries} from '../service/lottery';
import LotteryList from '../components/LotteryList';
import {CustomButtonView} from '../components/CustomButtonTest';

export const Home = () => {
  const navigation = useNavigation<NavigationProp>();
  const {
    data: fullLotteryList,
    isLoading,
    error: getLotteriesErrors,
    refetch: refetchLotteryList,
  } = useGetLotteries();

  const {Notification} = NativeModules;

  const isFocused = useIsFocused();
  const [inputSearch, setInputSearch] = useState('');

  const [lotteryList, setLotteryList] = useState<Lottery[]>([]);
  const [selectedLotteryList, setSelectedLotteryList] = useState<string[]>([]);

  const handleAddLottery = () => {
    navigation.navigate('AddLottery');
  };

  const handleRegister = () => {
    navigation.navigate('RegisterModal', {
      selectedLotteryList,
    });
  };

  useEffect(() => {
    const list = fullLotteryList?.filter(
      lottery =>
        lottery.name.toLowerCase().search(inputSearch.toLowerCase()) !== -1,
    );
    setLotteryList(list || []);
  }, [fullLotteryList, inputSearch]);

  useEffect(() => {
    setSelectedLotteryList([]);
    refetchLotteryList();
  }, [isFocused, refetchLotteryList]);

  const handleNotification = () => {
    Notification.showNotification('React Native Message', 'New message from the react native app');
  };

  if (getLotteriesErrors) {
    return (
      <View>
        <Text>{getLotteriesErrors?.message}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.registerContainer}>
        <Button onPress={handleRegister} title="Register" />
        <Button onPress={handleNotification} title="Notif" />
        <CustomButtonView
          text="Custom"
          disabled={false}
          style={styles.customButton}
          onPress={() => console.log('CustomButton:','New click')}
        />
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Lotteries</Text>
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          value={inputSearch}
          onChange={e => setInputSearch(e.nativeEvent.text)}
          style={styles.inputSearch}
        />
      </View>
      {!isLoading && (
        <View>
          {!lotteryList.length ? (
            <Text
              style={
                styles.noResults
              }>{`No search results for "${inputSearch}"`}</Text>
          ) : (
            <LotteryList
              lotteryList={lotteryList || []}
              selectedLotteryList={selectedLotteryList}
              setSelectedLotteryList={setSelectedLotteryList}
            />
          )}
        </View>
      )}
      <View style={styles.buttonContainer}>
        <Button onPress={handleAddLottery} title="+" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    margin: 16,
  },
  registerContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  containerResults: {
    paddingBottom: 8,
  },
  buttonContainer: {
    // the button should be round, as I believe this need to be an image I will keep as a simple button for now
    display: 'flex',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    right: 0,
    gap: 8,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 16,
  },
  titleContainer: {
    display: 'flex',
    flexWrap: 'nowrap',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    paddingTop: 16,
  },
  inputSearch: {
    fontSize: 16,
    flex: 1,
  },
  noResults: {
    fontSize: 20,
  },
  searchContainer: {
    display: 'flex',
    alignContent: 'space-between',
    flexWrap: 'nowrap',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginTop: 16,
    marginBottom: 24,
    borderRadius: 5,
  },
  customButton: {
    width: 100,
    height: 50,
    backgroundColor: '#1ce1ce',
    fontSize: 16,
  },
});
