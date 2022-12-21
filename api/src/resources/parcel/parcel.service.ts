import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateParcelInput } from './dto/create-parcel.input'
import { UpdateParcelInput } from './dto/update-parcel.input'
import { Parcel } from './entities/parcel.entity'
import { ObjectId } from 'mongodb'

@Injectable()
export class ParcelService {
  constructor(
    @InjectRepository(Parcel)
    private readonly parcelRepository: Repository<Parcel>,
  ) {}

  create(createParcelInput: CreateParcelInput) {
    return this.parcelRepository.save(createParcelInput)
  }

  findAll() {
    return this.parcelRepository.find()
  }

  findOne(id: string) {
    return this.parcelRepository.findOne(new ObjectId(id))
  }

  async update(id: string, updateParcelInput: UpdateParcelInput) {
    await this.parcelRepository.update(id, updateParcelInput)
    return this.parcelRepository.findOne(new ObjectId(id))
  }

  remove(id: string) {
    return this.parcelRepository.delete(new ObjectId(id))
  }
}
