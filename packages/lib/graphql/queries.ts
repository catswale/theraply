/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTherapist = /* GraphQL */ `
  query GetTherapist($id: ID!) {
    getTherapist(id: $id) {
      id
      firstName
      lastName
      email
      phoneNumber
      clients {
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const getTherapistAndClients = /* GraphQL */ `
  query getTherapistAndClients($id: ID!) {
    getTherapist(id: $id) {
      id
      firstName
      lastName
      email
      phoneNumber
      clients {
        items {
          client {
            id,
            firstName
            lastName
          }
          id
        }      
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listTherapists = /* GraphQL */ `
  query ListTherapists(
    $filter: ModelTherapistFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTherapists(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        firstName
        lastName
        email
        phoneNumber
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getClient = /* GraphQL */ `
  query GetClient($id: ID!) {
    getClient(id: $id) {
      id
      firstName
      lastName
      email
      phoneNumber
      therapists {
        nextToken
      }
      therapistIDs
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listClients = /* GraphQL */ `
  query ListClients(
    $filter: ModelClientFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listClients(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        firstName
        lastName
        email
        phoneNumber
        therapistIDs
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getMessage = /* GraphQL */ `
  query GetMessage($id: ID!) {
    getMessage(id: $id) {
      id
      channelID
      authorID
      body
      participants
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listMessages = /* GraphQL */ `
  query ListMessages(
    $filter: ModelMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMessages(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        channelID
        authorID
        body
        participants
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const messagesByChannelId = /* GraphQL */ `
  query MessagesByChannelId(
    $channelID: ID
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    messagesByChannelID(
      channelID: $channelID
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        channelID
        authorID
        body
        participants
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
