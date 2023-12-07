export type HandType =
  | "FiveOfAKind"
  | "FourOfAKind"
  | "FullHouse"
  | "ThreeOfAKind"
  | "TwoPair"
  | "OnePair"
  | "HighCard";

export interface Hand {
  hand: string[];
  bid: number;
  type: HandType;
}

export const orderedTyped = [
  "HighCard",
  "OnePair",
  "TwoPair",
  "ThreeOfAKind",
  "FullHouse",
  "FourOfAKind",
  "FiveOfAKind",
];

export const getHandType = (hand: string[]): HandType => {
  const distinctValues = new Set(hand);
  if (distinctValues.size === 1) {
    return "FiveOfAKind";
  }
  if (distinctValues.size === 2) {
    const firstValueCount = hand.filter((value) => value === hand[0]).length;
    if (firstValueCount === 1 || firstValueCount === 4) {
      return "FourOfAKind";
    }
    return "FullHouse";
  }
  if (distinctValues.size === 3) {
    const distinctValuesCount = [...distinctValues].map(
      (value) => hand.filter((handValue) => handValue === value).length
    );
    if (distinctValuesCount.some((count) => count === 3)) {
      return "ThreeOfAKind";
    }
    return "TwoPair";
  }
  if (distinctValues.size === 4) {
    return "OnePair";
  }
  return "HighCard";
};

export const getTotalWinning = (orderedHands: Hand[]) =>
  orderedHands.reduce(
    (winning, hand, index) => winning + hand.bid * (index + 1),
    0
  );

export const orderHands = (hands: Hand[], orderedCards: string[]) => {
  const handsByType = new Array(orderedTyped.length).fill([]);
  hands.forEach((hand) => {
    const handsByTypeIndex = orderedTyped.indexOf(hand.type);
    handsByType[handsByTypeIndex] = positionHandInAscendingOrder(
      hand,
      handsByType[handsByTypeIndex],
      orderedCards
    );
  });
  return handsByType.flat();
};

const positionHandInAscendingOrder = (
  hand: Hand,
  orderedHands: Hand[],
  orderedCards: string[]
) => {
  let index = 0;
  while (index < orderedHands.length) {
    if (!isHand1Better(hand.hand, orderedHands[index].hand, orderedCards)) {
      return [
        ...orderedHands.slice(0, index),
        hand,
        ...orderedHands.slice(index),
      ];
    }
    index++;
  }
  return [...orderedHands, hand];
};

const isHand1Better = (
  hand1: string[],
  hand2: string[],
  orderedCards: string[]
): boolean => {
  const [hand1FirstElement, ...restOfHand1] = hand1;
  const [hand2FirstElement, ...restOfHand2] = hand2;

  if (
    orderedCards.indexOf(hand1FirstElement) <
    orderedCards.indexOf(hand2FirstElement)
  ) {
    return true;
  }
  if (
    orderedCards.indexOf(hand1FirstElement) >
    orderedCards.indexOf(hand2FirstElement)
  ) {
    return false;
  }
  return isHand1Better(restOfHand1, restOfHand2, orderedCards);
};
