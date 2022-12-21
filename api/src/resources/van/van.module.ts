import { Module } from '@nestjs/common'
import { VanService } from './van.service'
import { VanResolver } from './van.resolver'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ParcelService } from '../parcel/parcel.service'
import { Van } from './entities/van.entity'
import { Parcel } from '../parcel/entities/parcel.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Van, Parcel])],
  providers: [VanResolver, VanService, ParcelService],
})
export class VanModule {}
