import { Injectable } from '@nestjs/common'
import { CreateVanInput } from './dto/create-van.input'
import { UpdateVanInput } from './dto/update-van.input'
import { InjectRepository } from '@nestjs/typeorm'
import { Van } from './entities/van.entity'
import { Repository } from 'typeorm'
import { ObjectId } from 'mongodb'

@Injectable()
export class VanService {
  constructor(
    @InjectRepository(Van)
    private readonly vanRepository: Repository<Van>,
  ) {}

  create(createVanInput: CreateVanInput) {
    return this.vanRepository.save(createVanInput)
  }

  findAll() {
    return this.vanRepository.find()
  }

  findOne(id: string) {
    return this.vanRepository.findOne(new ObjectId(id))
  }

  async addParcelToVan(vanId: string, parcelId: string) {
    const van = await this.vanRepository.findOne(new ObjectId(vanId))
    return this.vanRepository.update(new ObjectId(vanId), {
      parcelIds: [...van.parcelIds, parcelId],
    })
  }

  async update(id: string, updateVanInput: UpdateVanInput) {
    await this.vanRepository.update(id, updateVanInput)
    return this.vanRepository.findOne(new ObjectId(id))
  }

  remove(id: string) {
    return this.vanRepository.delete(new ObjectId(id))
  }
}
