import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<User> {
    return this.usersService.create(createUserInput);
  }

  @Query(() => User, { name: 'findUser' })
  findUser(
    @Args('email', { type: () => String }) email: string,
    @Args('firebase_id', { type: () => String }) firebase_id: string,
  ): Promise<User | null> {
    return this.usersService.findOneByEmailAndFirebaseId(email, firebase_id);
  }
}
