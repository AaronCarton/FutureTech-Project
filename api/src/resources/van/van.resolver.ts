import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql'
import { VanService } from './van.service'
import { Van } from './entities/van.entity'
import { CreateVanInput } from './dto/create-van.input'
import { UpdateVanInput } from './dto/update-van.input'
import { Package } from '../package/entities/package.entity'
import { PackageService } from '../package/package.service'
import { ClientMessage, MessageTypes } from 'src/bootstrap/entities/ClientMessage'

@Resolver(() => Van)
export class VanResolver {
  constructor(
    private readonly vanService: VanService,
    private readonly packageService: PackageService,
  ) {}

  @ResolveField()
  packages(@Parent() van: Van): Promise<Package>[] {
    return van.packagesIds.map((id) => this.packageService.findOne(id))
  }

  @Mutation(() => Van)
  createVan(@Args('createVanInput') createVanInput: CreateVanInput) {
    return this.vanService.create(createVanInput)
  }

  @Query(() => [Van], { name: 'vans' })
  findAll() {
    return this.vanService.findAll()
  }

  @Query(() => Van, { name: 'van' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.vanService.findOne(id)
  }

  @Mutation(() => Van)
  updatePackagesInVan(
    @Args('id', { type: () => String }) id: string,
    @Args('packagesIds', { type: () => [String] }) packagesIds: string[],
  ) {
    return this.vanService.update(id, { packagesIds })
  }

  @Mutation(() => Van)
  updateVan(
    @Args('id', { type: () => String }) id: string,
    @Args('updateVanInput') updateVanInput: UpdateVanInput,
  ) {
    return this.vanService.update(id, updateVanInput)
  }

  @Mutation(() => ClientMessage)
  removeVan(@Args('id', { type: () => String }) id: string) {
    return new Promise((resolve) =>
      this.vanService
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
