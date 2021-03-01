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
      bio
      active
      gender
      authenticatedUserIDs
      clients {
        nextToken
      }
      createdAt
      updatedAt
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
      bio
      active
      gender
      authenticatedUserIDs
      clients {
        nextToken
      }
      createdAt
      updatedAt
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
      bio
      active
      gender
      authenticatedUserIDs
      clients {
        nextToken
      }
      createdAt
      updatedAt
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
        email
        phoneNumber
        specializations
        titles
        greeting
        bio
        active
        gender
        authenticatedUserIDs
        createdAt
        updatedAt
      }
      client {
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
      active
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
        email
        phoneNumber
        specializations
        titles
        greeting
        bio
        active
        gender
        authenticatedUserIDs
        createdAt
        updatedAt
      }
      client {
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
      active
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
        email
        phoneNumber
        specializations
        titles
        greeting
        bio
        active
        gender
        authenticatedUserIDs
        createdAt
        updatedAt
      }
      client {
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
      active
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
      therapists {
        nextToken
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
export const updateClient = /* GraphQL */ `
  mutation UpdateClient(
    $input: UpdateClientInput!
    $condition: ModelClientConditionInput
  ) {
    updateClient(input: $input, condition: $condition) {
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
      therapists {
        nextToken
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
export const deleteClient = /* GraphQL */ `
  mutation DeleteClient(
    $input: DeleteClientInput!
    $condition: ModelClientConditionInput
  ) {
    deleteClient(input: $input, condition: $condition) {
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
      therapists {
        nextToken
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
export const createNote = /* GraphQL */ `
  mutation CreateNote(
    $input: CreateNoteInput!
    $condition: ModelNoteConditionInput
  ) {
    createNote(input: $input, condition: $condition) {
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
export const updateNote = /* GraphQL */ `
  mutation UpdateNote(
    $input: UpdateNoteInput!
    $condition: ModelNoteConditionInput
  ) {
    updateNote(input: $input, condition: $condition) {
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
export const deleteNote = /* GraphQL */ `
  mutation DeleteNote(
    $input: DeleteNoteInput!
    $condition: ModelNoteConditionInput
  ) {
    deleteNote(input: $input, condition: $condition) {
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
      therapistID
      clientID
      participants
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
      therapistID
      clientID
      participants
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
      therapistID
      clientID
      participants
      createdAt
      updatedAt
    }
  }
`;
export const createBooking = /* GraphQL */ `
  mutation CreateBooking(
    $input: CreateBookingInput!
    $condition: ModelBookingConditionInput
  ) {
    createBooking(input: $input, condition: $condition) {
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
export const updateBooking = /* GraphQL */ `
  mutation UpdateBooking(
    $input: UpdateBookingInput!
    $condition: ModelBookingConditionInput
  ) {
    updateBooking(input: $input, condition: $condition) {
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
export const deleteBooking = /* GraphQL */ `
  mutation DeleteBooking(
    $input: DeleteBookingInput!
    $condition: ModelBookingConditionInput
  ) {
    deleteBooking(input: $input, condition: $condition) {
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
