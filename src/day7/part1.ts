import { getHandType } from "./utils";

export const orderedCardPart1 = [
  "A",
  "K",
  "Q",
  "J",
  "T",
  "9",
  "8",
  "7",
  "6",
  "5",
  "4",
  "3",
  "2",
];

export const formatDataPart1 = (input: string[]) => {
  return input.map((data) => {
    const [hand, bid] = data.split(" ");
    const formattedHand = hand.split("");
    return {
      hand: formattedHand,
      bid: Number(bid),
      type: getHandType(formattedHand),
    };
  });
};
