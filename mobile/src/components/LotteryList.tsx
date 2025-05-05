import {View, StyleSheet, ScrollView} from 'react-native';
import {Lottery} from '../types';
import LotteryCard from './LotteryCard';

const LotteryList = ({
  lotteryList,
  selectedLotteryList,
  setSelectedLotteryList,
}: {
  lotteryList: Lottery[];
  selectedLotteryList: string[];
  setSelectedLotteryList: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  const handleSelectCard = (lotteryId: string) => {
    setSelectedLotteryList(items => {
      const index = items.findIndex(id => id === lotteryId);
      if (index >= 0) {
        // as this is an study: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toSpliced
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
        return items.toSpliced(index, 1);
      }
      return [...items, lotteryId];
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {lotteryList?.map(lottery => (
          <LotteryCard
            key={lottery.id}
            lottery={lottery}
            selected={selectedLotteryList.includes(lottery.id)}
            onCardSelect={handleSelectCard}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default LotteryList;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    gap: 16,
  },
  scrollContainer: {
    paddingBottom: 32,
  },
  lotteryCard: {
    display: 'flex',
  },
});
