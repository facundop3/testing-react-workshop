# [Jest](https://jestjs.io) elevator pitch 🃏

Let's get started with a really really basic Jest intro, jest is a powerful open-source javascript testing framework.

## Some examples from its [Getting Started](https://jestjs.io/docs/getting-started):

Let's say we have the following code on  a `sum.js` and we need to test `sum` function:
```js
function sum(a, b) {
  return a + b;
}
module.exports = sum;
```

Then, we create a `sum.test.js` import the sum function and expect an output from a given input:

```js
const sum = require('./sum');
test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
```

Pretty self explanatory, right ?

# [⬅️ Back](/README.md) - [Next ➡️](ui-based-assertions.md)

