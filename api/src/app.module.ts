import { Module } from '@nestjs/common'
import { BootstrapModule } from './bootstrap/bootstrap.module'
import { NotificationsModule } from './notifications/notifcations.module'
import { PackageModule } from './resources/package/package.module'
import { VanModule } from './resources/van/van.module'

@Module({
  imports: [BootstrapModule, NotificationsModule, VanModule, PackageModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
