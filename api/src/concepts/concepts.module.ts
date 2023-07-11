import { Module } from '@nestjs/common';
import { ConceptsService } from './concepts.service';
import { ConceptsResolver } from './concepts.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Concept } from './entities/concept.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Concept])],
  providers: [ConceptsResolver, ConceptsService],
  exports: [ConceptsService],
})
export class ConceptsModule {}
