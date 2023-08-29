import { Injectable } from "@nestjs/common";
import { InjectKnex } from "nestjs-knex";
import { User } from "src/entities/user";
import { Knex } from "knex";

@Injectable()
export class TestRepository {
    knexRepo: Knex;
//   tableName: string;
    constructor(
        @InjectKnex()
        readonly knex: Knex<User, User[]>,
    ){
        this.knexRepo = knex;
    }

    async findOne(where: Partial<User>): Promise<User>{
        try {
            return await this.queryBuilder().where(where).first("*");
        } catch (error) {
            throw error;
        }
    }

    queryBuilder<T, U>(){
        return this.knexRepo<T,U>('wf_user');
    }
}