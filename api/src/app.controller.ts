import { Controller, Get, Options } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Options('*')
  handleOptions() {
    // Respond to OPTIONS requests with the appropriate CORS headers
    return 'OK';
  }
}
