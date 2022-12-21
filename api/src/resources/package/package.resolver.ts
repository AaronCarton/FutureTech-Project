import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { PackageService } from './package.service'
import { Package } from './entities/package.entity'
import { CreatePackageInput } from './dto/create-package.input'
import { UpdatePackageInput } from './dto/update-package.input'
import { ClientMessage, MessageTypes } from 'src/bootstrap/entities/ClientMessage'

@Resolver(() => Package)
export class PackageResolver {
  constructor(private readonly packageService: PackageService) {}

  @Mutation(() => Package)
  createPackage(@Args('createPackageInput') createPackageInput: CreatePackageInput) {
    return this.packageService.create(createPackageInput)
  }

  @Query(() => [Package], { name: 'packages' })
  findAll() {
    return this.packageService.findAll()
  }

  @Query(() => Package, { name: 'package' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.packageService.findOne(id)
  }

  @Mutation(() => Package)
  updatePackage(
    @Args('id', { type: () => String }) id: string,
    @Args('updatePackageInput') updatePackageInput: UpdatePackageInput,
  ) {
    return this.packageService.update(id, updatePackageInput)
  }

  @Mutation(() => ClientMessage)
  removePackage(@Args('id', { type: () => String }) id: string) {
    return new Promise((resolve) =>
      this.packageService
        .remove(id)
        .then(() =>
          resolve({
            type: MessageTypes.success,
            message: 'Package deleted successfully',
            statusCode: 200,
          }),
        )
        .catch(() =>
          resolve({
            type: MessageTypes.error,
            message: 'Package could not be deleted',
            statusCode: 500,
          }),
        ),
    )
  }
}
