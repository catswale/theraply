/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateTherapist = /* GraphQL */ `
  subscription OnCreateTherapist($owner: String!) {
    onCreateTherapist(owner: $owner) {
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
export const onUpdateTherapist = /* GraphQL */ `
  subscription OnUpdateTherapist($owner: String!) {
    onUpdateTherapist(owner: $owner) {
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
export const onDeleteTherapist = /* GraphQL */ `
  subscription OnDeleteTherapist($owner: String!) {
    onDeleteTherapist(owner: $owner) {
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
export const onCreateTherapistClientRelationship = /* GraphQL */ `
  subscription OnCreateTherapistClientRelationship {
    onCreateTherapistClientRelationship {
      id
      therapistID
      clientID
      therapist {
        id
        firstName
        lastName
        email
        phoneNumber
        createdAt
        updatedAt
        owner
      }
      client {
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
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateTherapistClientRelationship = /* GraphQL */ `
  subscription OnUpdateTherapistClientRelationship {
    onUpdateTherapistClientRelationship {
      id
      therapistID
      clientID
      therapist {
        id
        firstName
        lastName
        email
        phoneNumber
        createdAt
        updatedAt
        owner
      }
      client {
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
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteTherapistClientRelationship = /* GraphQL */ `
  subscription OnDeleteTherapistClientRelationship {
    onDeleteTherapistClientRelationship {
      id
      therapistID
      clientID
      therapist {
        id
        firstName
        lastName
        email
        phoneNumber
        createdAt
        updatedAt
        owner
      }
      client {
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
      createdAt
      updatedAt
    }
  }
`;
export const onCreateClient = /* GraphQL */ `
  subscription OnCreateClient($owner: String!, $therapistIDs: String!) {
    onCreateClient(owner: $owner, therapistIDs: $therapistIDs) {
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
export const onUpdateClient = /* GraphQL */ `
  subscription OnUpdateClient($owner: String!, $therapistIDs: String!) {
    onUpdateClient(owner: $owner, therapistIDs: $therapistIDs) {
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
export const onDeleteClient = /* GraphQL */ `
  subscription OnDeleteClient($owner: String!, $therapistIDs: String!) {
    onDeleteClient(owner: $owner, therapistIDs: $therapistIDs) {
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
export const onCreateMessage = /* GraphQL */ `
  subscription OnCreateMessage($owner: String!) {
    onCreateMessage(owner: $owner) {
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
export const onUpdateMessage = /* GraphQL */ `
  subscription OnUpdateMessage($owner: String!) {
    onUpdateMessage(owner: $owner) {
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
export const onDeleteMessage = /* GraphQL */ `
  subscription OnDeleteMessage($owner: String!) {
    onDeleteMessage(owner: $owner) {
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
