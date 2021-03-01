export const getTherapist = /* GraphQL */ `
  query GetTherapist($id: ID!) {
    getTherapist(id: $id) {
      id
      firstName
      lastName
      email
      phoneNumber
      clients {
        items {
          client {
            id
            firstName
            lastName
          }
          id
        }      
      }
      createdAt
      updatedAt
    }
  }
`;

export const getClient = /* GraphQL */ `
  query GetClient(
    $id: ID!, 
    $therapistId: ModelIDKeyConditionInput,
    $limitTherapist: Int
  ) {
    getClient(id: $id) {
      id
      firstName
      lastName
      email
      phoneNumber
      therapists (therapistID: $therapistId, limit: $limitTherapist) {
        items {
          therapist {
            id
            firstName
            lastName
          }
          id
        }
      }
      therapistIDs
      createdAt
      updatedAt
      owner
    }
  }
`;
