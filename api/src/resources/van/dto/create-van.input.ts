import { InputType, Field } from '@nestjs/graphql'

@InputType()
export class CreateVanInput {
  @Field(() => [String])
  packagesIds: string[]
}
