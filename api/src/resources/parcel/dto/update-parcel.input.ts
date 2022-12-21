import { CreateParcelInput } from './create-parcel.input'
import { InputType, PartialType } from '@nestjs/graphql'

@InputType()
export class UpdateParcelInput extends PartialType(CreateParcelInput) {}
