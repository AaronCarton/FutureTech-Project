import { Module } from '@nestjs/common'
import { VanService } from './van.service'
import { VanResolver } from './van.resolver'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PackageService } from '../package/package.service'
import { Van } from './entities/van.entity'
import { Package } from '../package/entities/package.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Van, Package])],
  providers: [VanResolver, VanService, PackageService],
})
export class VanModule {}
