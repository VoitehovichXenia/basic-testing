// Uncomment the code below and write your tests
import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const strValue = 'String value';
    const numValue = 10;
    const objValue = { a: 'resolved', b: 101 };

    expect(resolveValue(strValue)).resolves.toBe(strValue);
    expect(resolveValue(numValue)).resolves.toBe(numValue);
    expect(resolveValue(undefined)).resolves.toBeUndefined();
    expect(resolveValue(null)).resolves.toBeNull();
    expect(resolveValue(objValue)).resolves.toEqual(objValue);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const providedMessage = 'Oh, hi, Mark!';
    expect(() => throwError(providedMessage)).toThrow(providedMessage);
  });

  test('should throw error with default message if message is not provided', () => {
    expect(() => throwError()).toThrow('Oops!');
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    const customError = new MyAwesomeError();
    expect(() => throwCustomError()).toThrow(customError.message);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    const customError = new MyAwesomeError();
    expect(() => rejectCustomError()).rejects.toThrow(customError.message);
  });
});
