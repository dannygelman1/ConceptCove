import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesResolver } from './images.resolver';
import { Image } from './entities/image.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Image])],
  providers: [ImagesResolver, ImagesService],
  exports: [ImagesService],
})
export class ImagesModule {}
