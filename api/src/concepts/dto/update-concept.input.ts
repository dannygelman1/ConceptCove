import { CreateConceptInput } from './create-concept.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateConceptInput extends PartialType(CreateConceptInput) {
  @Field(() => Int)
  id: number;
}
