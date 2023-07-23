import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field({ description: 'Name of the user' })
  name!: string;

  @Field({ description: 'Email of the user' })
  email!: string;

  @Field({ description: 'Firebase ID of the user' })
  firebase_id!: string;
}
