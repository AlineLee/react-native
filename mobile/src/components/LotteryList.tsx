import {FlatList, useWindowDimensions} from 'react-native';
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
  const {width} = useWindowDimensions();

  const renderCard = ({item}: {item: Lottery}) => {
    return (
      <LotteryCard
        lottery={item}
        onCardSelect={handleSelectCard}
        selected={selectedLotteryList.includes(item.id)}
      />
    );
  };

  return (
    <FlatList
      data={lotteryList}
      renderItem={renderCard}
      keyExtractor={item => item.id}
      style={{width: width - 32}}
    />
  );
};

export default LotteryList;
