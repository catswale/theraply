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
  query GetClient($id: ID!) {
    getClient(id: $id) {
      id
      firstName
      lastName
      email
      phoneNumber
      therapists {
        items {
          therapist {
            id
            firstName
            lastName
          }
          id
        }
      }
      bookings {
        items {
          id
          bookingID
          start
          end
          state          
          therapist {
            id
          }
          client {
            id
          }
        }
      }
      therapistIDs
      createdAt
      updatedAt
      owner
    }
  }
`;