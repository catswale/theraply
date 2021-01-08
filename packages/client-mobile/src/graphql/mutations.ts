/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createTherapist = /* GraphQL */ `
  mutation CreateTherapist(
    $input: CreateTherapistInput!
    $condition: ModelTherapistConditionInput
  ) {
    createTherapist(input: $input, condition: $condition) {
      id
      firstName
      lastName
      clients
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updateTherapist = /* GraphQL */ `
  mutation UpdateTherapist(
    $input: UpdateTherapistInput!
    $condition: ModelTherapistConditionInput
  ) {
    updateTherapist(input: $input, condition: $condition) {
      id
      firstName
      lastName
      clients
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deleteTherapist = /* GraphQL */ `
  mutation DeleteTherapist(
    $input: DeleteTherapistInput!
    $condition: ModelTherapistConditionInput
  ) {
    deleteTherapist(input: $input, condition: $condition) {
      id
      firstName
      lastName
      clients
      createdAt
      updatedAt
      owner
    }
  }
`;
export const createClient = /* GraphQL */ `
  mutation CreateClient(
    $input: CreateClientInput!
    $condition: ModelClientConditionInput
  ) {
    createClient(input: $input, condition: $condition) {
      id
      firstName
      lastName
      createdAt
      updatedAt
    }
  }
`;
export const updateClient = /* GraphQL */ `
  mutation UpdateClient(
    $input: UpdateClientInput!
    $condition: ModelClientConditionInput
  ) {
    updateClient(input: $input, condition: $condition) {
      id
      firstName
      lastName
      createdAt
      updatedAt
    }
  }
`;
export const deleteClient = /* GraphQL */ `
  mutation DeleteClient(
    $input: DeleteClientInput!
    $condition: ModelClientConditionInput
  ) {
    deleteClient(input: $input, condition: $condition) {
      id
      firstName
      lastName
      createdAt
      updatedAt
    }
  }
`;
export const createMessage = /* GraphQL */ `
  mutation CreateMessage(
    $input: CreateMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    createMessage(input: $input, condition: $condition) {
      id
      channelID
      authorID
      body
      createdAt
      updatedAt
    }
  }
`;
export const updateMessage = /* GraphQL */ `
  mutation UpdateMessage(
    $input: UpdateMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    updateMessage(input: $input, condition: $condition) {
      id
      channelID
      authorID
      body
      createdAt
      updatedAt
    }
  }
`;
export const deleteMessage = /* GraphQL */ `
  mutation DeleteMessage(
    $input: DeleteMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    deleteMessage(input: $input, condition: $condition) {
      id
      channelID
      authorID
      body
      createdAt
      updatedAt
    }
  }
`;
