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
      bookings {
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
      bookings {
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
      bookings {
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
      bookings {
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
      bookings {
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
      bookings {
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
  subscription OnCreateMessage {
    onCreateMessage {
      id
      channelID
      authorID
      body
      participants
      participant1
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
      participants
      participant1
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
      participants
      participant1
      createdAt
      updatedAt
    }
  }
`;
export const onCreateBooking = /* GraphQL */ `
  subscription OnCreateBooking {
    onCreateBooking {
      id
      start
      end
      state
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
export const onUpdateBooking = /* GraphQL */ `
  subscription OnUpdateBooking {
    onUpdateBooking {
      id
      start
      end
      state
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
export const onDeleteBooking = /* GraphQL */ `
  subscription OnDeleteBooking {
    onDeleteBooking {
      id
      start
      end
      state
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
