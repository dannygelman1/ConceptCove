import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConceptsModule } from './concepts/concepts.module';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApolloDriver } from '@nestjs/apollo';

@Module({
  imports: [
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: true,
      cache: 'bounded',
      cors: {
        origin: ['https://localhost:3000'],
        methods: ['GET', 'POST', 'OPTIONS'],
        allowedHeaders: ['Accept', 'Content-Type', 'Authorization'],
        credentials: true,
        maxAge: 3600,
      },
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
