/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateTherapist = /* GraphQL */ `
  subscription OnCreateTherapist {
    onCreateTherapist {
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
      clients {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateTherapist = /* GraphQL */ `
  subscription OnUpdateTherapist {
    onUpdateTherapist {
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
      clients {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteTherapist = /* GraphQL */ `
  subscription OnDeleteTherapist {
    onDeleteTherapist {
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
      clients {
        nextToken
      }
      createdAt
      updatedAt
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
  subscription OnCreateMessage($clientID: String!, $therapistID: String!) {
    onCreateMessage(clientID: $clientID, therapistID: $therapistID) {
      id
      channelID
      authorID
      body
      therapistID
      clientID
      participants
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateMessage = /* GraphQL */ `
  subscription OnUpdateMessage($clientID: String!, $therapistID: String!) {
    onUpdateMessage(clientID: $clientID, therapistID: $therapistID) {
      id
      channelID
      authorID
      body
      therapistID
      clientID
      participants
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteMessage = /* GraphQL */ `
  subscription OnDeleteMessage($clientID: String!, $therapistID: String!) {
    onDeleteMessage(clientID: $clientID, therapistID: $therapistID) {
      id
      channelID
      authorID
      body
      therapistID
      clientID
      participants
      createdAt
      updatedAt
    }
  }
`;
export const onCreateBooking = /* GraphQL */ `
  subscription OnCreateBooking($participants: String!) {
    onCreateBooking(participants: $participants) {
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
export const onUpdateBooking = /* GraphQL */ `
  subscription OnUpdateBooking($participants: String!) {
    onUpdateBooking(participants: $participants) {
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
export const onDeleteBooking = /* GraphQL */ `
  subscription OnDeleteBooking($participants: String!) {
    onDeleteBooking(participants: $participants) {
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
