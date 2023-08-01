import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ConceptsService } from './concepts.service';
import { Concept } from './entities/concept.entity';
import { CreateConceptInput } from './dto/create-concept.input';

@Resolver(() => Concept)
export class ConceptsResolver {
  constructor(private readonly conceptsService: ConceptsService) {}

  @Mutation(() => Concept)
  createConcept(
    @Args('createConceptInput') createConceptInput: CreateConceptInput,
  ): Promise<Concept> {
    return this.conceptsService.create(createConceptInput);
  }

  @Query(() => Concept, { name: 'concept' })
  concept(@Args('id', { type: () => String }) id: string): Promise<Concept> {
    return this.conceptsService.findOne(id);
  }

  @Query(() => [Concept], { name: 'allConcepts' })
  allConcepts(): Promise<Concept[]> {
    return this.conceptsService.findAll();
  }

  @Query(() => [Concept], {
    description: 'Get all concepts for a given user email',
  })
  async conceptsByEmail(@Args('email') email: string): Promise<Concept[]> {
    return this.conceptsService.findByEmail(email);
  }
}
