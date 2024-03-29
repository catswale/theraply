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
      availability {
        id
        start
        end
      }
      specializations
      titles
      greeting
      clientIDs
      bio
      active
      gender
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
        specializations
        titles
        greeting
        clientIDs
        bio
        active
        gender
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getTherapistClientRelationship = /* GraphQL */ `
  query GetTherapistClientRelationship($id: ID!) {
    getTherapistClientRelationship(id: $id) {
      id
      therapistID
      clientID
      active
      createdAt
      updatedAt
    }
  }
`;
export const listTherapistClientRelationships = /* GraphQL */ `
  query ListTherapistClientRelationships(
    $filter: ModelTherapistClientRelationshipFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTherapistClientRelationships(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        therapistID
        clientID
        active
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getClientRelationships = /* GraphQL */ `
  query GetClientRelationships(
    $clientID: ID
    $sortDirection: ModelSortDirection
    $filter: ModelTherapistClientRelationshipFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getClientRelationships(
      clientID: $clientID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        therapistID
        clientID
        active
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
      email
      phoneNumber
      dob
      symptoms {
        id
        content
        createdAt
      }
      therapistPreferences {
        id
        content
        createdAt
      }
      therapistIDs
      stripeCustomerID
      packageItems {
        id
        name
        packageName
        expiry
        createdAt
        sessions
      }
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
        dob
        therapistIDs
        stripeCustomerID
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getNote = /* GraphQL */ `
  query GetNote($id: ID!) {
    getNote(id: $id) {
      id
      title
      content
      clientID
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listNotes = /* GraphQL */ `
  query ListNotes(
    $filter: ModelNoteFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNotes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        content
        clientID
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
      body
      therapistID
      clientID
      participants
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
        body
        therapistID
        clientID
        participants
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
        body
        therapistID
        clientID
        participants
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getBooking = /* GraphQL */ `
  query GetBooking($id: ID!) {
    getBooking(id: $id) {
      id
      bookingID
      start
      end
      state
      participants
      createdAt
      updatedAt
    }
  }
`;
export const listBookings = /* GraphQL */ `
  query ListBookings(
    $filter: ModelBookingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBookings(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        bookingID
        start
        end
        state
        participants
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
