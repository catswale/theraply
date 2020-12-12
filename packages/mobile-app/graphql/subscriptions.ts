/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateTherapist = /* GraphQL */ `
  subscription OnCreateTherapist($owner: String!, $clients: String!) {
    onCreateTherapist(owner: $owner, clients: $clients) {
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
export const onUpdateTherapist = /* GraphQL */ `
  subscription OnUpdateTherapist($owner: String!, $clients: String!) {
    onUpdateTherapist(owner: $owner, clients: $clients) {
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
export const onDeleteTherapist = /* GraphQL */ `
  subscription OnDeleteTherapist($owner: String!, $clients: String!) {
    onDeleteTherapist(owner: $owner, clients: $clients) {
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
export const onCreateTherapistAndClient = /* GraphQL */ `
  subscription OnCreateTherapistAndClient {
    onCreateTherapistAndClient {
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
export const onUpdateTherapistAndClient = /* GraphQL */ `
  subscription OnUpdateTherapistAndClient {
    onUpdateTherapistAndClient {
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
export const onDeleteTherapistAndClient = /* GraphQL */ `
  subscription OnDeleteTherapistAndClient {
    onDeleteTherapistAndClient {
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
export const onCreateClient = /* GraphQL */ `
  subscription OnCreateClient {
    onCreateClient {
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
export const onUpdateClient = /* GraphQL */ `
  subscription OnUpdateClient {
    onUpdateClient {
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
export const onDeleteClient = /* GraphQL */ `
  subscription OnDeleteClient {
    onDeleteClient {
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
export const onCreateMessage = /* GraphQL */ `
  subscription OnCreateMessage {
    onCreateMessage {
      id
      channelID
      authorID
      body
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateMessage = /* GraphQL */ `
  subscription OnUpdateMessage {
    onUpdateMessage {
      id
      channelID
      authorID
      body
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteMessage = /* GraphQL */ `
  subscription OnDeleteMessage {
    onDeleteMessage {
      id
      channelID
      authorID
      body
      createdAt
      updatedAt
    }
  }
`;
