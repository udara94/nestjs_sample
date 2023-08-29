import * as path from 'path';
import * as dotenv from 'dotenv';
import { APP_ENV } from './enums';

if (process.env.NODE_ENV === APP_ENV.LOCAL) {
  dotenv.config({ path: path.join(__dirname, '../.env') });
}

const BASE_PATH = path.join(__dirname, '../src/db');
console.log(BASE_PATH)
module.exports = {
  local: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
    migrations: {
      directory: path.join(BASE_PATH, 'migrations'),
      extension: 'ts',
      loadExtensions: ['.ts'],
      stub: path.join(BASE_PATH, 'stubs/migration_template.ts'),
    },
    seeds: {},
  },
};
