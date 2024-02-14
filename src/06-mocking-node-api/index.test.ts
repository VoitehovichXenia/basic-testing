// Uncomment the code below and write your tests
import path from 'node:path';
import fs from 'node:fs';
import fsPromises from 'node:fs/promises';
import { doStuffByInterval, doStuffByTimeout, readFileAsynchronously } from '.';

describe('doStuffByTimeout', () => {
  const timeout = 500;

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const cb = jest.fn();
    const setTimeoutSpy = jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(cb, timeout);
    expect(setTimeoutSpy).toBeCalledWith(cb, timeout);
  });

  test('should call callback only after timeout', () => {
    const cb = jest.fn();
    doStuffByTimeout(cb, timeout);

    jest.advanceTimersByTime(timeout - 1);
    expect(cb).not.toBeCalled();

    jest.advanceTimersByTime(timeout);
    expect(cb).toBeCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  const interval = 100;
  const checkTime = 1000;
  const timesToBeCalled = checkTime / interval;

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const cb = jest.fn();
    const setIntervalSpy = jest.spyOn(global, 'setInterval');
    doStuffByInterval(cb, interval);
    expect(setIntervalSpy).toBeCalledWith(cb, interval);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const cb = jest.fn();
    doStuffByInterval(cb, interval);
    jest.advanceTimersByTime(checkTime);
    expect(cb).toBeCalledTimes(timesToBeCalled);
  });
});

describe('readFileAsynchronously', () => {
  const pathToFile = './index.ts';

  test('should call join with pathToFile', async () => {
    const pathJoinSpy = jest.spyOn(path, 'join');
    readFileAsynchronously(pathToFile);
    expect(pathJoinSpy).toBeCalledTimes(1);
    expect(pathJoinSpy).toBeCalledWith(__dirname, pathToFile);
  });

  test('should return null if file does not exist', async () => {
    const existsSyncSpy = jest.spyOn(fs, 'existsSync');
    existsSyncSpy.mockReturnValueOnce(false);
    const res = await readFileAsynchronously(pathToFile);
    expect(res).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const fileContent = 'file content';
    const existsSyncSpy = jest.spyOn(fs, 'existsSync');
    existsSyncSpy.mockReturnValueOnce(true);
    const readFileSpy = jest.spyOn(fsPromises, 'readFile');
    readFileSpy.mockResolvedValue(fileContent);
    const res = await readFileAsynchronously(pathToFile);
    expect(res).toBe(fileContent);
  });
});
