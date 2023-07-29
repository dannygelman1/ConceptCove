import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserInput: CreateUserInput) {
    let concept = new User();

    concept.name = createUserInput.name;
    concept.email = createUserInput.email;
    concept.firebase_id = createUserInput.firebase_id;
    concept = await this.usersRepository.save(concept);
    return concept;
  }

  findOneByEmailAndFirebaseId(
    email: string,
    firebase_id: string,
  ): Promise<User | null> {
    return this.usersRepository.findOneBy({ email, firebase_id });
  }
}
