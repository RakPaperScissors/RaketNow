import {DataSource} from 'typeorm';
import {config} from 'dotenv';
import {Skills} from './entities/skills/entities/skill.entity';
import { RaketistaSkill } from './entities/raketista-skill/entities/raketista-skill.entity';
import { Users } from './entities/user/entities/user.entity';
import { Raketista } from './entities/raketista/entities/raketista.entity';
import { Conversation } from './entities/conversation/entities/conversation.entity';
import { Message } from './entities/message/entities/message.entity';

config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [Users, Raketista, Skills, RaketistaSkill, Conversation, Message],
  synchronize: true, // set false later
  ssl: { rejectUnauthorized: false }, // set true later
});

// run npx ts-node src/seed/seed-skills.ts to initialize