import { Module } from '@nestjs/common'
import { PackageService } from './package.service'
import { PackageResolver } from './package.resolver'
import { Package } from './entities/package.entity'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [TypeOrmModule.forFeature([Package])],
  providers: [PackageResolver, PackageService],
})
export class PackageModule {}
