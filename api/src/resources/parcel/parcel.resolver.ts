import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { ParcelService } from './parcel.service'
import { Parcel } from './entities/parcel.entity'
import { CreateParcelInput } from './dto/create-parcel.input'
import { UpdateParcelInput } from './dto/update-parcel.input'
import { ClientMessage, MessageTypes } from 'src/bootstrap/entities/ClientMessage'

@Resolver(() => Parcel)
export class ParcelResolver {
  constructor(private readonly parcelService: ParcelService) {}

  @Mutation(() => Parcel)
  createParcel(@Args('createParcelInput') createParcelInput: CreateParcelInput) {
    return this.parcelService.create(createParcelInput)
  }

  @Query(() => [Parcel], { name: 'parcels' })
  findAll() {
    return this.parcelService.findAll()
  }

  @Query(() => Parcel, { name: 'parcel' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.parcelService.findOne(id)
  }

  @Mutation(() => Parcel)
  updateParcel(
    @Args('id', { type: () => String }) id: string,
    @Args('updateParcelInput') updateParcelInput: UpdateParcelInput,
  ) {
    return this.parcelService.update(id, updateParcelInput)
  }

  @Mutation(() => ClientMessage)
  removeParcel(@Args('id', { type: () => String }) id: string) {
    return new Promise((resolve) =>
      this.parcelService
        .remove(id)
        .then(() =>
          resolve({
            type: MessageTypes.success,
            message: 'Van deleted successfully',
            statusCode: 200,
          }),
        )
        .catch(() =>
          resolve({
            type: MessageTypes.error,
            message: 'Van could not be deleted',
            statusCode: 500,
          }),
        ),
    )
  }
}
