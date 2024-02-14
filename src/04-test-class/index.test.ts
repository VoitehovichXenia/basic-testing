// Uncomment the code below and write your tests
import {
  getBankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from '.';
import lodash from 'lodash';

const initialBalance = 1000;
const sumGreaterThanBalance = initialBalance * 2;
const testBankAccount = getBankAccount(initialBalance);
const accountToTransferTo = getBankAccount(0);
const balanceIfFetchBalanceFailed = 100;

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const balance = testBankAccount.getBalance();
    expect(balance).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const cb = () => testBankAccount.withdraw(sumGreaterThanBalance);
    expect(cb).toThrowError(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const cb = () =>
      testBankAccount.transfer(sumGreaterThanBalance, accountToTransferTo);
    expect(cb).toThrow();
  });

  test('should throw error when transferring to the same account', () => {
    const cb = () => testBankAccount.transfer(1, testBankAccount);
    expect(cb).toThrowError(TransferFailedError);
  });

  test('should deposit money', () => {
    testBankAccount.deposit(initialBalance);
    const balance = testBankAccount.getBalance();
    expect(balance).toBe(initialBalance * 2);
  });

  test('should withdraw money', () => {
    const balanceBeforeWithdraw = testBankAccount.getBalance();
    const withdrawAmount = 500;
    testBankAccount.withdraw(withdrawAmount);
    const balance = testBankAccount.getBalance();
    expect(balance).toBe(balanceBeforeWithdraw - withdrawAmount);
  });

  test('should transfer money', () => {
    const testBalanceBeforeTransfer = testBankAccount.getBalance();
    const recipientBalanceBeforeTransfer = accountToTransferTo.getBalance();
    const transferAmmount = 100;
    testBankAccount.transfer(transferAmmount, accountToTransferTo);
    const testBalance = testBankAccount.getBalance();
    const recipientBalance = accountToTransferTo.getBalance();
    const expectedTestBalance = testBalanceBeforeTransfer - transferAmmount;
    const expectedRecipientBalance =
      recipientBalanceBeforeTransfer + transferAmmount;

    expect(testBalance).toBe(expectedTestBalance);
    expect(recipientBalance).toBe(expectedRecipientBalance);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const spy = jest.spyOn(lodash, 'random');
    spy.mockReturnValue(balanceIfFetchBalanceFailed);
    spy.mockReturnValueOnce(1);
    const res = await testBankAccount.fetchBalance();
    expect(typeof res).toBe('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const spy = jest.spyOn(testBankAccount, 'fetchBalance');
    spy.mockReturnValueOnce(Promise.resolve(balanceIfFetchBalanceFailed));
    await testBankAccount.synchronizeBalance();
    const balance = testBankAccount.getBalance();
    expect(balance).toBe(balanceIfFetchBalanceFailed);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const spy = jest.spyOn(testBankAccount, 'fetchBalance');
    spy.mockReturnValueOnce(Promise.resolve(null));
    expect(testBankAccount.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
