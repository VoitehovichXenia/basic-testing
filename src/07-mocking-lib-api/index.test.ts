// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('lodash', () => {
  const originalModule = jest.requireActual<typeof import('lodash')>('lodash');
  return {
    __esModule: true,
    ...originalModule,
    throttle: jest.fn((fn) => fn),
  };
});

describe('throttledGetDataFromApi', () => {
  test('should create instance with provided base url', async () => {
    const axiosCreateSpy = jest.spyOn(axios, 'create');
    await throttledGetDataFromApi('users');
    expect(axiosCreateSpy).toBeCalled();
    expect(axiosCreateSpy).toBeCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const axiosGetSpy = jest.spyOn(axios.Axios.prototype, 'get');
    await throttledGetDataFromApi('users');
    expect(axiosGetSpy).toBeCalled();
    expect(axiosGetSpy).toBeCalledWith('users');
  });

  test('should return response data', async () => {
    const resData = { data: { a: 5, g: 'data' } };
    const axiosGetSpy = jest.spyOn(axios.Axios.prototype, 'get');
    axiosGetSpy.mockResolvedValueOnce(resData);
    const res = await throttledGetDataFromApi('users');
    expect(res).toBe(resData.data);
  });
});
