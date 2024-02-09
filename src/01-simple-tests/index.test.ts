// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const start = Number(new Date());
    const sum = [2 + 2, 10 + 14, 131 + 167];
    expect(simpleCalculator({ a: 2, b: 2, action: Action.Add })).toBe(sum[0]);
    expect(simpleCalculator({ a: 10, b: 14, action: Action.Add })).toBe(sum[1]);
    expect(simpleCalculator({ a: 131, b: 167, action: Action.Add })).toBe(
      sum[2],
    );
    expect(Number(new Date()) - start).toBeLessThanOrEqual(30000);
  }, 30);

  test('should subtract two numbers', () => {
    const start = Number(new Date());
    const diff = [2 - 2, 10 - 14, 131 - 167];
    expect(simpleCalculator({ a: 2, b: 2, action: Action.Subtract })).toBe(
      diff[0],
    );
    expect(simpleCalculator({ a: 10, b: 14, action: Action.Subtract })).toBe(
      diff[1],
    );
    expect(simpleCalculator({ a: 131, b: 167, action: Action.Subtract })).toBe(
      diff[2],
    );
    expect(Number(new Date()) - start).toBeLessThanOrEqual(30000);
  });

  test('should multiply two numbers', () => {
    const start = Number(new Date());
    const mult = [2 * 2, 10 * 14, 131 * 167];
    expect(simpleCalculator({ a: 2, b: 2, action: Action.Multiply })).toBe(
      mult[0],
    );
    expect(simpleCalculator({ a: 10, b: 14, action: Action.Multiply })).toBe(
      mult[1],
    );
    expect(simpleCalculator({ a: 167, b: 131, action: Action.Multiply })).toBe(
      mult[2],
    );
    expect(Number(new Date()) - start).toBeLessThanOrEqual(30000);
  });

  test('should divide two numbers', () => {
    const start = Number(new Date());
    const div = [2 / 2, 10 / 14, 131 / 167];
    expect(simpleCalculator({ a: 2, b: 2, action: Action.Divide })).toBe(
      div[0],
    );
    expect(simpleCalculator({ a: 10, b: 14, action: Action.Divide })).toBe(
      div[1],
    );
    expect(simpleCalculator({ a: 131, b: 167, action: Action.Divide })).toBe(
      div[2],
    );
    expect(Number(new Date()) - start).toBeLessThanOrEqual(30000);
  });

  test('should exponentiate two numbers', () => {
    const start = Number(new Date());
    const exp = [2 ** 2, 10 ** 14, 131 ** 167];
    expect(simpleCalculator({ a: 2, b: 2, action: Action.Exponentiate })).toBe(
      exp[0],
    );
    expect(
      simpleCalculator({ a: 10, b: 14, action: Action.Exponentiate }),
    ).toBe(exp[1]);
    expect(
      simpleCalculator({ a: 131, b: 167, action: Action.Exponentiate }),
    ).toBe(exp[2]);
    expect(Number(new Date()) - start).toBeLessThanOrEqual(30000);
  });

  test('should return null for invalid action', () => {
    const start = Number(new Date());
    const invalidActions = ['Purify', 'Purr', 'Wash'];
    expect(simpleCalculator({ a: 2, b: 2, action: invalidActions[0] })).toBe(
      null,
    );
    expect(simpleCalculator({ a: 10, b: 14, action: invalidActions[1] })).toBe(
      null,
    );
    expect(
      simpleCalculator({ a: 131, b: 167, action: invalidActions[2] }),
    ).toBe(null);
    expect(Number(new Date()) - start).toBeLessThanOrEqual(30000);
  });

  test('should return null for invalid arguments', () => {
    const start = Number(new Date());
    expect(simpleCalculator({ a: 'hi', b: 2, action: Action.Add })).toBe(null);
    expect(
      simpleCalculator({ a: 10, b: 'invalid', action: Action.Subtract }),
    ).toBe(null);
    expect(simpleCalculator({ a: 'hi', b: 'invalid', action: 'action' })).toBe(
      null,
    );
    expect(Number(new Date()) - start).toBeLessThanOrEqual(30000);
  });
});
