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

