import { Module } from '@nestjs/common';
import { VendorModule } from './vendor/vendor.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,
    VendorModule,
    // other modules
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
