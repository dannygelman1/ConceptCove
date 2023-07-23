import { CreateUserInput } from './create-user.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field({ description: 'Name of the user' })
  name!: string;

  @Field({ description: 'Email of the user' })
  email!: string;
}
