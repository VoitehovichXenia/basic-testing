// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 1, b: 2, action: Action.Subtract, expected: -1 },
  { a: 2, b: 2, action: Action.Subtract, expected: 0 },
  { a: 6, b: 2, action: Action.Subtract, expected: 4 },
  { a: 1, b: 2, action: Action.Multiply, expected: 2 },
  { a: 2, b: 0, action: Action.Multiply, expected: 0 },
  { a: 6, b: 2, action: Action.Multiply, expected: 12 },
  { a: 12, b: 2, action: Action.Divide, expected: 6 },
  { a: 2, b: 2, action: Action.Divide, expected: 1 },
  { a: 6, b: 2, action: Action.Divide, expected: 3 },
  { a: 12, b: 2, action: Action.Exponentiate, expected: 144 },
  { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
  { a: 3, b: 3, action: Action.Exponentiate, expected: 27 },
  { a: 3, b: 3, action: 'Invalid action', expected: null },
  { a: 'Invalid arg 1', b: 3, action: Action.Add, expected: null },
  { a: 3, b: 'Invalid arg 2', action: Action.Add, expected: null },
  {
    a: 'Invalid arg 1',
    b: 'Invalid arg 2',
    action: 'Invalid action',
    expected: null,
  },
];

describe('simpleCalculator', () => {
  const start = Number(new Date());
  test.each(testCases)(
    'Test case: simpleCalculator({ a: $a, b: $b, action: $action })',
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
  );
  expect(Number(new Date()) - start).toBeLessThanOrEqual(30000);
});
