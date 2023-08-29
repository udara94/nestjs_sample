import { Injectable } from "@nestjs/common";
import { InjectKnex } from "nestjs-knex";
import { User } from "src/entities/user";
import { Knex } from "knex";
import { BaseRepository } from "./base";

@Injectable()
export class TestRepository extends BaseRepository<User> {
    constructor(
        @InjectKnex()
        readonly knex: Knex<User, User[]>,
    ){
        super(knex, 'wf_user')
    }
}