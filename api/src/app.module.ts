import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConceptsModule } from './concepts/concepts.module';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UsersModule } from './users/users.module';
import { ImagesModule } from './images/images.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: true,
      cache: 'bounded',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'dpg-cilgav15rnuvtgsgm680-a',
      port: 5432,
      username: 'conceptcove_user',
      password: 'bIqBW9ZyRX2TrlJ0z3fuiABp7TqCCxyq',
      database: 'conceptcove',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false,
    }),
    ConceptsModule,
    UsersModule,
    ImagesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
