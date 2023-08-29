import { Controller, Get } from '@nestjs/common';
import { TestService } from 'src/services/test';

@Controller('test')
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Get()
  async getHello()  {
    return await this.testService.getTest();
  }
}
