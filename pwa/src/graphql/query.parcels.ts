import gql from 'graphql-tag'

export const PARCELS = gql`
  query {
    parcels {
      id
      name
      description
      address
      customerId
      lat
      lng
    }
  }
`
