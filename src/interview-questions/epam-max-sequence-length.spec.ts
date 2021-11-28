import { SpecHelpers } from '../spec-helpers';
import { findLongestSequence, getSortedSequencesMap } from './epam-max-sequence-length';

// type Alphabet = '0' | '1';
type Alphabet = string;

describe('Find the length and start index of the longest sequence of a symbol', () => {
  let sequence: Alphabet[];

  afterEach(() => {
    sequence = [];
  });

  it('should return zero length and index on empty sequence', () => {
    sequence = [];
    expect(findLongestSequence<Alphabet>(sequence, '0')).toEqual([0, undefined]);
  });

  it('Should return the length of an array filled only with requested symbols', () => {
    sequence = new Array(SpecHelpers.getRandomLength()).fill('0');
    expect(findLongestSequence<Alphabet>(sequence, '0')).toEqual([sequence.length, 0]);
  });

  it('Should return the length and index of the first sequence(edge case)', () => {
    sequence = ['0', '1'];
    expect(findLongestSequence(sequence, '0')).toEqual([1,0]);
  });

  it('Should return the length and index of the last sequence (edge case)', () => {
    sequence = ['1', '0'];
    expect(findLongestSequence(sequence, '0')).toEqual([1, 1]);
  });

  it('Should return the index of the first sequence if more then one sequence is found', () => {
    sequence = [
      '0', '0',
      '1',
      '0',
      '1',
      '0', '0',
    ];
    expect(findLongestSequence<Alphabet>(sequence, '0')).toEqual([2, 0]);
  });

  it('Should return correct length and index for the predefined data', () => {
    sequence = [
      '0',
      '1', '1',
      '0',
      '1', '1', '1',
      '0', '0', '0', '0', '0', '0', '0',
      '1',
      '0', '0', '0', '0', '0', '0', '0', '0',
      '1',
      '0'
    ];
    expect(findLongestSequence<Alphabet>(sequence, '0')).toEqual([8, 15]);
  });

  it('Should return correct length and index for the random data', () => {
    sequence = generateSequence();
    const expectedMaxLength = alternativeFindLongestSequence(sequence);
    expect(findLongestSequence<Alphabet>(sequence, '0')[0]).toEqual(expectedMaxLength);
  });
});

describe('Sort the sequences of symbols', () => {
  let sequence: Alphabet[];

  afterEach(() => {
    sequence = [];
  });

  it('Smoke test of the ordered sequences', () => {
    sequence = generateSequence();
    const sortedSequenceMap = getSortedSequencesMap(sequence);
    const symbol = sequence.includes('1') ? '1' : '0';

    if (!sequence.length) {
      return expect(true).toEqual(true);
    }

    const [
      longestSequenceLength,
      longestSequenceStartIndex
    ] = findLongestSequence(sequence,symbol);
    const { length, startIndex } = sortedSequenceMap.pop() || {};

    expect(length).toEqual(longestSequenceLength);
    expect(startIndex).toEqual(longestSequenceStartIndex);
  });
});

function generateSequence (length?: number): Alphabet[] {
  const dataLength = length || SpecHelpers.getRandomLength();
  return new Array(dataLength).fill('0').map(() => (Math.round(Math.random()).toString() as Alphabet));
}

function alternativeFindLongestSequence (data: Alphabet[]): number {
  const d = [...data];
  return (d.join('').split('1').filter(Boolean).sort().pop() || '').length
}
