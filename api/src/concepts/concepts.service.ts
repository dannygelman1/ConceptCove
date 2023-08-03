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

  async updateTitle(id: string, title?: string): Promise<Concept> {
    await this.conceptsRepository.update({ id }, { title });
    return this.conceptsRepository.findOneBy({ id });
  }

  async updateArtist(id: string, artist?: string): Promise<Concept> {
    await this.conceptsRepository.update({ id }, { artist });
    return this.conceptsRepository.findOneBy({ id });
  }

  async updateUrl(id: string, url?: string): Promise<Concept> {
    await this.conceptsRepository.update({ id }, { url });
    return this.conceptsRepository.findOneBy({ id });
  }

  async updateImageId(id: string, image_id?: string): Promise<Concept> {
    await this.conceptsRepository.update({ id }, { image_id });
    return this.conceptsRepository.findOneBy({ id });
  }

  async updateAll(id: string, updateConceptInput): Promise<Concept> {
    await this.conceptsRepository.update(
      { id },
      {
        image_id: updateConceptInput.image_id,
        title: updateConceptInput.title,
        artist: updateConceptInput.artist,
        url: updateConceptInput.url,
      },
    );
    return this.conceptsRepository.findOneBy({ id });
  }

  async delete(id: string): Promise<string> {
    await this.conceptsRepository.delete({ id });
    return id;
  }
}
