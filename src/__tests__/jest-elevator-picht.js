// Jest 📚: https://jestjs.io/docs/getting-started
describe("Jest elevator pitch 🃏", () => {
  test("Basic assertions with Jest", () => {
    // let's say we have a `getMax`function and an expected output for a given array of numbers
    const maxNumber = 99;
    const numbers = [-1, 20, -1, 10, maxNumber, 7, 15];
    const getMax = (numbers) => Math.max(...numbers);
    // we can `expect` the return value to be `maxNumber` with the following sentence
    expect(getMax(numbers)).toBe(maxNumber);
  });
  test("Playing with some Jest matchers", () => {
    // Jest provide us with a bunch of matchers, we should pick the one that works better for us
    // Jest matchers 📚: https://jestjs.io/docs/using-matchers
    // .toBe identity check
    expect(1).toBe(1);
    const a = {};
    const b = {};
    // notice the `not` since those objects are not the same one
    expect(a).not.toBe(b);
    // toEqual equality check
    expect(a).toEqual(b);
    a["one"] = 1;
    expect(a).not.toEqual(b);
    b["one"] = 1;
    expect(a).toEqual(b);
    /*
      And we can keep going with the wide list of different Jest matchers available here 📚: https://jestjs.io/docs/using-matchers
      but today we'll be focusing on `testing-library/react`, so let's jump into that
    */
  });
});