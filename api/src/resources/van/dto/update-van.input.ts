import { CreateVanInput } from './create-van.input'
import { InputType, Field, PartialType } from '@nestjs/graphql'

@InputType()
export class UpdateVanInput extends PartialType(CreateVanInput) {
  @Field(() => [String])
  parcelIds: string[]
}
