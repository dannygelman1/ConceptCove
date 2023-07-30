import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist/common/typeorm.decorators';
import { Repository } from 'typeorm/repository/Repository';
import { CreateConceptInput } from './dto/create-concept.input';
import { Concept } from './entities/concept.entity';

@Injectable()
export class ConceptsService {
  constructor(
    @InjectRepository(Concept)
    private conceptsRepository: Repository<Concept>,
  ) {}

  async create(createConceptInput: CreateConceptInput): Promise<Concept> {
    let concept = new Concept();

    concept.image_id = createConceptInput.image_id;
    concept.title = createConceptInput.title;
    concept.artist = createConceptInput.artist;
    concept.url = createConceptInput.url;
    concept.owner_id = createConceptInput.owner_id;
    concept = await this.conceptsRepository.save(concept);
    return concept;
  }

  async findOne(id: string): Promise<Concept> {
    return this.conceptsRepository.findOneBy({ id });
  }

  async findAll(): Promise<Concept[]> {
    return this.conceptsRepository.find();
  }

  async findByEmail(email: string): Promise<Concept[]> {
    const concepts = await this.conceptsRepository
      .createQueryBuilder('concept')
      .leftJoinAndSelect('concept.user', 'user')
      .where('user.email = :email', { email })
      .getMany();

    return concepts;
  }

  // async findByEmail(): Promise<Concept[]> {
  //   return this.conceptsRepository.findBy({ email });
  // }
}
