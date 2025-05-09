import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Lottery} from '../types';
import useStore from '../store/useStore';

const LotteryCard = ({
  lottery,
  onCardSelect,
  selected,
}: {
  lottery: Lottery;
  onCardSelect: (lottery: string) => void;
  selected: boolean;
}) => {
  const {isItemRegistered} = useStore();
  const registered = isItemRegistered(lottery.id);

  const handleSelectCard = () => {
    onCardSelect(lottery.id);
  };

  return (
    <View
      style={[
        styles.container,
        {borderColor: selected || registered ? 'blue' : 'grey'},
      ]}>
      <TouchableOpacity disabled={registered} onPress={handleSelectCard}>
        <View style={styles.titleContainer}>
          <Text style={styles.name}>{lottery.name}</Text>
          {registered && <Text style={styles.text}>Registered</Text>}
        </View>
        <Text style={styles.text}>{lottery.prize}</Text>
        <Text style={styles.text}>{lottery.id}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LotteryCard;

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
    display: 'flex',
    gap: 16,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'gray',
    padding: 16,
  },
  text: {
    fontSize: 16,
  },
  titleContainer: {
    display: 'flex',
    alignContent: 'space-between',
    flexWrap: 'nowrap',
    flexDirection: 'row',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    display: 'flex',
  },
});
