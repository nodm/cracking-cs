export namespace SpecHelpers {
  export function getRandomLength (maxLength = 100): number {
    return Math.round(Math.random() * maxLength) + 1;
  }
}
