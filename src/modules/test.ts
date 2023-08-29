import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TestController } from 'src/controllers/test';
import { TestRepository } from 'src/repositories/test';
import { TestService } from 'src/services/test';

@Module({
    imports:[ConfigModule],
    controllers: [TestController],
    providers: [TestService, TestRepository],
    exports: [TestService]
})
export class TestModule {}