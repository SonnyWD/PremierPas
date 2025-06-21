import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  ssl: {
    rejectUnauthorized: false,
  },
  logging: ['query', 'error'],
  entities: process.env.NODE_ENV === 'production'
    ? ['dist/**/entities/*.js']     
    : ['src/**/entities/*.ts'],   
  migrations: process.env.NODE_ENV === 'production'
    ? ['dist/migration/*.js']      
    : ['src/migration/*.ts'],      
  synchronize: false,
});
