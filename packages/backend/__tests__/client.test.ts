import * as utils from '../src/utils';
import { postTherapist } from '../src/client';

describe('client actions', () => {
  const sampleTherapist = {
    id: 23,
    firstName: 'John',
    lastName: 'Doe'
  };

  const jsonFn = jest.fn();
  const resMock = {
    json: jsonFn,
    status: jest.fn().mockImplementation(() => ({ json: jsonFn }))
  };

  const mockGraphQLResponse = {
    data: {
      listTherapists: {
        items: [sampleTherapist]
      },
      createTherapistClientRelationship: {
        id: 56
      }
    }
  };

  const graphql = jest.fn().mockImplementation(async () => mockGraphQLResponse);

  jest
    .spyOn(utils, 'getHeaderData')
    .mockImplementation(() => ({
      username: 'sample_username',
      email: 'sample_email@email.com',
      firstName: 'John'
    }));

  jest
    .spyOn(utils, 'callGraphQL')
    .mockImplementation(() => graphql);


  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return a picked therapist', async () => {
    const reqMock = {
      body: {
        symptoms: ['Depression'],
        genders: ['Female'],
      }
    };

    await postTherapist(reqMock, resMock);

    expect(resMock.json).toBeCalledTimes(1);
    expect(resMock.json).toBeCalledWith({ success: true, therapist: sampleTherapist });
    expect(graphql).toBeCalledTimes(3);
  })
})
