import { InputType, Field } from '@nestjs/graphql'

@InputType()
export class CreateParcelInput {
  @Field() // GraphQL
  customerId: string

  @Field()
  lat: number

  @Field()
  lng: number

  @Field()
  name: string

  @Field()
  weight: number

  @Field()
  address: string

  @Field({ nullable: true })
  description?: string
}
