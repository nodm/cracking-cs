export function findLongestSequence<T>(data: T[], symbol: T): [number, number | undefined] {
  let startIndex: number | undefined = undefined;
  let maxLength = 0;
  let currentSequenceLength = 0;

  for (let i = 0; i < data.length; i += 1) {
    const isLastSymbol = i === data.length - 1;
    const currentSymbol: T = data[i];

    if (currentSymbol === symbol) {
      currentSequenceLength += 1;
    }

    if (currentSequenceLength && (currentSymbol !== symbol || isLastSymbol)) {
      if (currentSequenceLength > maxLength) {
        maxLength = currentSequenceLength;
        startIndex = i - currentSequenceLength + Number(isLastSymbol && currentSymbol === symbol);
      }
      currentSequenceLength = 0;
    }
  }

  return [maxLength, startIndex];
}
