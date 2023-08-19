import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { ConceptsService } from './concepts.service';
import { Concept } from './entities/concept.entity';
import { CreateConceptInput } from './dto/create-concept.input';
import { UpdateConceptInput } from './dto/update-concept.input';

@Resolver(() => Concept)
export class ConceptsResolver {
  constructor(private readonly conceptsService: ConceptsService) {}

  @Mutation(() => Concept, { name: 'createConcept' })
  createConcept(
    @Args('createConceptInput') createConceptInput: CreateConceptInput,
  ): Promise<Concept> {
    return this.conceptsService.create(createConceptInput);
  }

  @Mutation(() => Concept, { name: 'updateConcept' })
  updateConcept(
    @Args('updateConceptInput') updateConceptInput: UpdateConceptInput,
  ): Promise<Concept> {
    return this.conceptsService.updateAll(
      updateConceptInput.id,
      updateConceptInput,
    );
  }

  @Mutation(() => ID)
  deleteConcept(
    @Args('id', { type: () => String }) id: string,
  ): Promise<string> {
    return this.conceptsService.delete(id);
  }

  @Query(() => [Concept], {
    description: 'Get all concepts for a given user email',
  })
  async conceptsByEmail(@Args('email') email: string): Promise<Concept[]> {
    return this.conceptsService.findByEmail(email);
  }
}
