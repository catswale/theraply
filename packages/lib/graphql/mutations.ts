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
      clients {
        nextToken
      }
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
      clients {
        nextToken
      }
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
      clients {
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const createTherapistClientRelationship = /* GraphQL */ `
  mutation CreateTherapistClientRelationship(
    $input: CreateTherapistClientRelationshipInput!
    $condition: ModelTherapistClientRelationshipConditionInput
  ) {
    createTherapistClientRelationship(input: $input, condition: $condition) {
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
        therapistIDs
        createdAt
        updatedAt
        owner
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateTherapistClientRelationship = /* GraphQL */ `
  mutation UpdateTherapistClientRelationship(
    $input: UpdateTherapistClientRelationshipInput!
    $condition: ModelTherapistClientRelationshipConditionInput
  ) {
    updateTherapistClientRelationship(input: $input, condition: $condition) {
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
        therapistIDs
        createdAt
        updatedAt
        owner
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteTherapistClientRelationship = /* GraphQL */ `
  mutation DeleteTherapistClientRelationship(
    $input: DeleteTherapistClientRelationshipInput!
    $condition: ModelTherapistClientRelationshipConditionInput
  ) {
    deleteTherapistClientRelationship(input: $input, condition: $condition) {
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
        therapistIDs
        createdAt
        updatedAt
        owner
      }
      createdAt
      updatedAt
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
export const updateClient = /* GraphQL */ `
  mutation UpdateClient(
    $input: UpdateClientInput!
    $condition: ModelClientConditionInput
  ) {
    updateClient(input: $input, condition: $condition) {
      id
      firstName
      lastName
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
export const deleteClient = /* GraphQL */ `
  mutation DeleteClient(
    $input: DeleteClientInput!
    $condition: ModelClientConditionInput
  ) {
    deleteClient(input: $input, condition: $condition) {
      id
      firstName
      lastName
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
