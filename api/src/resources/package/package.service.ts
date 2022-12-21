import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreatePackageInput } from './dto/create-package.input'
import { UpdatePackageInput } from './dto/update-package.input'
import { Package } from './entities/package.entity'
import { ObjectId } from 'mongodb'

@Injectable()
export class PackageService {
  constructor(
    @InjectRepository(Package)
    private readonly packageRepository: Repository<Package>,
  ) {}

  create(createPackageInput: CreatePackageInput) {
    return this.packageRepository.save(createPackageInput)
  }

  findAll() {
    return this.packageRepository.find()
  }

  findOne(id: string) {
    return this.packageRepository.findOne(new ObjectId(id))
  }

  async update(id: string, updatePackageInput: UpdatePackageInput) {
    await this.packageRepository.update(id, updatePackageInput)
    return this.packageRepository.findOne(new ObjectId(id))
  }

  remove(id: string) {
    return this.packageRepository.delete(new ObjectId(id))
  }
}
