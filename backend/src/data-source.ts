import {DataSource} from 'typeorm';
import {config} from 'dotenv';
import {Skills} from './entities/skills/entities/skill.entity';

config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [Skills],
  synchronize: true, // set false later
  ssl: { rejectUnauthorized: false }, // set true later
});

// run npx ts-node src/seed/seed-skills.ts to initialize