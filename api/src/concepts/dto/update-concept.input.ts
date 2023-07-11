import { CreateConceptInput } from './create-concept.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateConceptInput extends PartialType(CreateConceptInput) {
  @Field({ description: 'ID of the concept art image', nullable: true })
  image_id?: string;

  @Field({ description: 'Title of the concept art', nullable: true })
  title?: string;

  @Field({ description: 'Artist who made the concept art', nullable: true })
  artist?: string;

  @Field({ description: 'Url to the concept art', nullable: true })
  url?: string;
}
