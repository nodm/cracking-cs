type QueueElement<T> = {
  value: T;
  // previous: QueueElement<T>;
  next: QueueElement<T> | null;
};

export class Queue<T> {
  private head: QueueElement<T> | null = null;
  private tail: QueueElement<T> | null = null;
  private queueLength = 0;

  get length(): number {
    return this.queueLength;
  }

  enqueue(element: T): void {
    const queueElement = { value: element, next: null };

    if (!this.tail) {
      this.tail = this.head = queueElement;
    } else {
      this.tail.next = queueElement;
      this.tail = queueElement;
    }

    this.queueLength += 1;
  }

  dequeue(): T | undefined {
    if (!this.head) return undefined;

    const element = this.head.value;
    this.head = this.head.next;
    this.queueLength -= 1;

    return element;
  }

  peak(): T | undefined {
    if (!this.head) {
      return undefined;
    }

    return this.head.value;
  }

  toString(): string {
    const queueElementList: T[] = [];
    let queueElement: QueueElement<T> | null  = this.head;

    while(queueElement) {
      queueElementList.push(queueElement.value);
      queueElement = queueElement.next;
    }

    return queueElementList.reverse().join(',');
  }
}
