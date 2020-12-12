/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTherapist = /* GraphQL */ `
  query GetTherapist($id: ID!) {
    getTherapist(id: $id) {
      id
      firstName
      lastName
      clients {
        nextToken
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
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getTherapistAndClient = /* GraphQL */ `
  query GetTherapistAndClient($id: ID!) {
    getTherapistAndClient(id: $id) {
      id
      therapistID
      clientID
      therapist {
        id
        firstName
        lastName
        createdAt
        updatedAt
        owner
      }
      client {
        id
        firstName
        lastName
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listTherapistAndClients = /* GraphQL */ `
  query ListTherapistAndClients(
    $filter: ModelTherapistAndClientFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTherapistAndClients(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        therapistID
        clientID
        createdAt
        updatedAt
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
      therapists {
        nextToken
      }
      createdAt
      updatedAt
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
        createdAt
        updatedAt
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
      createdAt
      updatedAt
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
        createdAt
        updatedAt
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
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
