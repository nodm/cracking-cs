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

export function getSortedSequencesMap<T extends string>(data: T[]) {
  const sequenceMap = [];
  let sequenceSymbol: T | undefined;
  let sequenceLength = 0;
  let sequenceStartIndex = 0;

  for (let i = 0; i < data.length ; i += 1) {
    const symbol = data[i];

    if (symbol === sequenceSymbol) {
      sequenceLength += 1;
    } else {
      if (sequenceLength) {
        sequenceMap.push({
          startIndex: sequenceStartIndex,
          length: sequenceLength,
        });
      }

      sequenceSymbol = symbol;
      sequenceStartIndex = i;
      sequenceLength = 1;
    }

    const isLastSymbol = i === data.length - 1;
    if (isLastSymbol) {
      sequenceMap.push({
        startIndex: sequenceStartIndex,
        length: sequenceLength,
      });
    }
  }

  return sequenceMap
    .sort((a, b) => {
      if (data[a.startIndex] !== data[b.startIndex]) {
        return data[a.startIndex].localeCompare(data[b.startIndex]);
      } else if (a.length === b.length) {
        return a.startIndex - b.startIndex;
      } else {
        return a.length - b.length;
      }
    });
    // .map(({ startIndex, length }) => data.slice(startIndex, startIndex + length));
}
