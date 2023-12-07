import { getHandType } from "./utils";

export const orderedCardPart2 = [
  "A",
  "K",
  "Q",
  "T",
  "9",
  "8",
  "7",
  "6",
  "5",
  "4",
  "3",
  "2",
  "J",
];

const Joker = "J";

export const formatDataPart2 = (input: string[]) => {
  return input.map((data) => {
    const [hand, bid] = data.split(" ");
    const formattedHand = hand.split("");
    return {
      hand: formattedHand,
      bid: Number(bid),
      type: getHandType(getHandWithoutJoker(formattedHand)),
    };
  });
};

const getHandWithoutJoker = (hand: string[]) => {
  if (!hand.includes(Joker)) {
    return hand;
  }
  const distinctValues = [...new Set(hand)];
  const distinctValueWithCount = distinctValues.map((value) => ({
    value,
    count: hand.filter((handValue) => handValue === value).length,
  }));
  const sortedCount = distinctValueWithCount.sort(sortValueAndCountDesc);
  let index = 0;
  while (index < sortedCount.length) {
    const valueOfHighestCount = distinctValues.find(
      (value) => value === sortedCount[index].value
    )!;
    if (valueOfHighestCount !== Joker) {
      return hand.join("").replaceAll(Joker, valueOfHighestCount).split("");
    }
    index++;
  }
  return hand;
};

interface DistinctValue {
  value: string;
  count: number;
}

const sortValueAndCountDesc = (
  distinctValue1: DistinctValue,
  distinctValue2: DistinctValue
) => {
  if (distinctValue1.count === distinctValue2.count) {
    return (
      orderedCardPart2.indexOf(distinctValue1.value) -
      orderedCardPart2.indexOf(distinctValue2.value)
    );
  }
  return distinctValue2.count - distinctValue1.count;
};
