import gql from 'graphql-tag'

export const ADD_PARCEL_TO_VAN = gql`
  mutation addParcelToVan($vanId: String!, $parcelId: String!) {
    addParcelToVan(vanId: $vanId, parcelId: $parcelId) {
      id
    }
  }
`
