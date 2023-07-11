import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateConceptInput {
  @Field({ description: 'ID of the concept art image', nullable: true })
  image_id?: string;

  @Field({ description: 'Title of the concept art', nullable: true })
  title?: string;

  @Field({ description: 'Artist who made the concept art', nullable: true })
  artist?: string;

  @Field({ description: 'Url to the concept art', nullable: true })
  url?: string;
}
