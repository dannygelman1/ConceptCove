import { Injectable } from '@nestjs/common';
import { CreateImageInput } from './dto/create-image.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Image } from './entities/image.entity';
import { Repository } from 'typeorm/repository/Repository';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(Image)
    private imagesRepository: Repository<Image>,
  ) {}

  async create(createImageInput: CreateImageInput) {
    let image = new Image();

    image.name = createImageInput.name;
    image.extension = createImageInput.extension;
    image = await this.imagesRepository.save(image);
    return image;
  }

  findOneById(id: string): Promise<Image | null> {
    return this.imagesRepository.findOneBy({ id });
  }

  findAll(): Promise<Image[]> {
    return this.imagesRepository.find();
  }
}
