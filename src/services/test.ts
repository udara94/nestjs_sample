import { Injectable } from "@nestjs/common";
import { User } from "src/entities/user";
import { TestRepository } from "src/repositories/test";

@Injectable()
export class TestService {

    constructor(private readonly testRepository: TestRepository){}
    async getTest(): Promise<User> {
        const user = await this.testRepository.findOne({
            id: "1",
        });
        return user;
      }
}