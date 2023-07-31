import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
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
    let user = new User();

    user.name = createUserInput.name;
    user.email = createUserInput.email;
    user.firebase_id = createUserInput.firebase_id;
    user = await this.usersRepository.save(user);
    return user;
  }

  findOneByEmailAndFirebaseId(
    email: string,
    firebase_id: string,
  ): Promise<User | null> {
    return this.usersRepository.findOneBy({ email, firebase_id });
  }
}
