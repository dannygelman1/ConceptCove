import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateImageInput {
  @Field({ description: 'Name of the image' })
  name!: string;

  @Field({ description: 'Extension of the image' })
  extension!: string;
}
