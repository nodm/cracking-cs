import { SpecHelpers } from '../spec-helpers';
import { Queue } from './queue';

function createQueue(length?: number): [ queue: Queue<number>, elementList: number[] ] {
  const queueLength = length || SpecHelpers.getRandomLength();
  const elementList = new Array(queueLength).fill(0).map(() => Math.round(Math.random() * 100));
  const queue = new Queue<number>();

  for(const element of elementList) {
    queue.enqueue(element);
  }

  return [queue, elementList];
}

describe('Test Queue implementation', () => {
  let queue: Queue<number> | null;

  afterEach(() => {
    queue = null;
  });

  it('Should be empty after creation', () => {
    queue = new Queue<number>();
    expect(queue.length).toEqual(0);
  });

  it('Should return \'undefined\' when dequeue an empty queue', () => {
    queue = new Queue<number>();
    expect(queue.dequeue()).toEqual(undefined);
  });

  it('Should return \'undefined\' when peaking from an empty queue', () => {
    queue = new Queue<number>();
    expect(queue.peak()).toEqual(undefined);
  });

  it('Should peek an element', () => {
    const [queue, elementList] = createQueue(1);
    expect(queue.peak()).toEqual(elementList[0]);
    expect(queue.length).toEqual(1);
  });

  it('Should dequeue an elements', () => {
    const [queue, elementList] = createQueue(1);
    expect(queue.dequeue()).toEqual(elementList[0]);
    expect(queue.length).toEqual(0);
  });

  it('Should be empty after dequeueing all elements', () => {
    const [queue, elementList] = createQueue();
    const dequeuedElements = [];
    while (queue.length) {
      dequeuedElements.push(queue.dequeue());
    }
    expect(dequeuedElements).toEqual(elementList);
  });

  it('Should convert a queue to String', () => {
    const [queue, elementList] = createQueue();
    expect(queue.toString()).toEqual(elementList.reverse().join(','));
  });
});
