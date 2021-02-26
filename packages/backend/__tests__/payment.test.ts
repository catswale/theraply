import * as AWS from 'aws-sdk';
import * as utils from '../src/utils';
import { paymentRegister } from '../src/payment';

describe('payment actions', () => {
  const jsonFn = jest.fn();
  const resMock: any = {
    json: jsonFn,
    status: jest.fn().mockImplementation(() => ({ json: jsonFn }))
  };

  const stripeCustomersCreate = jest.fn().mockImplementation(() => ({ id: '1234asdfghjkl' }));

  const dynamoPromise: any = {
    promise: jest.fn().mockImplementation(async () => ({
      id: 'asdfghjkl1234',
      stripeCustomerID: '434'
    }))
  }

  jest
    .spyOn(utils, 'getHeaderData')
    .mockImplementation(() => ({
      username: 'sample_username',
      email: 'sample_email@email.com',
      firstName: 'John'
    }));

  jest
    .spyOn(AWS.DynamoDB.DocumentClient.prototype, 'get')
    .mockImplementation(() => dynamoPromise);

  jest
    .spyOn(AWS.DynamoDB.DocumentClient.prototype, 'update')
    .mockImplementation(() => dynamoPromise);

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a stripe customer', async () => {
    const reqMock: any = {};

    // Mocking the stripe object with the current implementation is really difficult.
    await paymentRegister(reqMock, resMock);

    expect(resMock.json).toBeCalledTimes(1);
    expect(resMock.json).toBeCalledWith({ success: 'success' });
    expect(dynamoPromise.promise).toBeCalledTimes(1);
  })
})
