import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ImagesService } from './images.service';
import { Image } from './entities/image.entity';
import { CreateImageInput } from './dto/create-image.input';

@Resolver(() => Image)
export class ImagesResolver {
  constructor(private readonly imagesService: ImagesService) {}

  @Mutation(() => Image)
  createImage(
    @Args('createImageInput') createImageInput: CreateImageInput,
  ): Promise<Image> {
    return this.imagesService.create(createImageInput);
  }

  @Query(() => Image, { name: 'findImage', nullable: true })
  findImage(
    @Args('id', { type: () => String }) id: string,
  ): Promise<Image | null> {
    return this.imagesService.findOneById(id);
  }
}
