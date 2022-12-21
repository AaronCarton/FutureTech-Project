export interface Parcel {
  id: string
  customerId: string
  lat: number
  lng: number
  name: string
  weight: number
  address: string
  description?: string
  createdAt?: Date
}
