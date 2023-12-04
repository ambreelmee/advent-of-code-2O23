interface Card {
  winningNumbers: number[];
  myNumbers: number[];
}

export const getAllCardsCount = (input: string[]) => {
  const allCardsCount = {} as Record<number, number>;
  input.forEach((_, index) => (allCardsCount[index + 1] = 1));
  const cards = formatInputData(input);
  cards.forEach((card, index) => {
    let count = 0;
    const currentCardValue = allCardsCount[index + 1];
    const winningNumbersCount = getWinningNumberCounts(card);
    const nextCardNumber = index + 2;
    while (count < winningNumbersCount) {
      allCardsCount[nextCardNumber + count] =
        allCardsCount[nextCardNumber + count] + 1 * currentCardValue;
      count++;
    }
  });
  return Object.values(allCardsCount).reduce(
    (sum, cardCount) => sum + cardCount,
    0
  );
};

export const getAllCardsValue = (input: string[]) => {
  const cards = formatInputData(input);
  return cards.reduce(
    (value, card) => value + getCardValue(getWinningNumberCounts(card)),
    0
  );
};

const getCardValue = (winningNumbersCount: number) => {
  if (winningNumbersCount === 0) {
    return 0;
  }
  let value = 1;
  let count = 1;
  while (count < winningNumbersCount) {
    value = value * 2;
    count++;
  }
  return value;
};

const getWinningNumberCounts = (card: Card) => {
  return card.myNumbers.filter((myNumber) =>
    card.winningNumbers.includes(myNumber)
  ).length;
};

const formatInputData = (input: string[]) =>
  input.map((game) => {
    const [winningNumbers, myNumbers] = game.split("|");
    return {
      winningNumbers: formatCardNumber(winningNumbers.split(":")[1]),
      myNumbers: formatCardNumber(myNumbers),
    };
  });

const formatCardNumber = (rawNumbers: string) =>
  rawNumbers
    .split(" ")
    .filter((item) => item !== "")
    .map((item) => Number(item));
