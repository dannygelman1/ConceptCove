import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ConceptsService } from './concepts.service';
import { Concept } from './entities/concept.entity';
import { CreateConceptInput } from './dto/create-concept.input';
import { UpdateConceptInput } from './dto/update-concept.input';

@Resolver(() => Concept)
export class ConceptsResolver {
  constructor(private readonly conceptsService: ConceptsService) {}

  @Mutation(() => Concept)
  createConcept(
    @Args('createConceptInput') createConceptInput: CreateConceptInput,
  ): Promise<Concept> {
    return this.conceptsService.create(createConceptInput);
  }

  // @Query(() => [Concept], { name: 'concepts' })
  // findAll() {
  //   return this.conceptsService.findAll();
  // }

  @Query(() => Concept, { name: 'concept' })
  findOne(@Args('id', { type: () => String }) id: string): Promise<Concept> {
    return this.conceptsService.findOne(id);
  }

  // @Mutation(() => Concept)
  // updateConcept(
  //   @Args('updateConceptInput') updateConceptInput: UpdateConceptInput,
  // ) {
  //   return this.conceptsService.update(
  //     updateConceptInput.id,
  //     updateConceptInput,
  //   );
  // }

  // @Mutation(() => Concept)
  // removeConcept(@Args('id', { type: () => Int }) id: number) {
  //   return this.conceptsService.remove(id);
  // }
}
