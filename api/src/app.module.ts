import { Module } from '@nestjs/common'
import { BootstrapModule } from './bootstrap/bootstrap.module'
import { NotificationsModule } from './notifications/notifcations.module'
import { ParcelModule } from './resources/parcel/parcel.module'
import { VanModule } from './resources/van/van.module'

@Module({
  imports: [BootstrapModule, NotificationsModule, VanModule, ParcelModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
