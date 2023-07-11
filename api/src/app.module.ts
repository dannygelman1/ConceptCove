import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConceptsModule } from './concepts/concepts.module';

@Module({
  imports: [ConceptsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
