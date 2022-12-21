import { Module } from '@nestjs/common'
import { ParcelService } from './parcel.service'
import { ParcelResolver } from './parcel.resolver'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Parcel } from './entities/parcel.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Parcel])],
  providers: [ParcelResolver, ParcelService],
})
export class ParcelModule {}
