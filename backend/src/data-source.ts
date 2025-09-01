import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { Skills } from './entities/skills/entities/skill.entity';
import { RaketistaSkill } from './entities/raketista-skill/entities/raketista-skill.entity';
import { Users } from './entities/user/entities/user.entity';
import { Raketista } from './entities/raketista/entities/raketista.entity';
import { Conversation } from './entities/conversation/entities/conversation.entity';
import { Message } from './entities/message/entities/message.entity';
import { Raket } from './entities/rakets/entities/raket.entity';
import { RaketPictures } from './entities/raket-pictures/entities/raket-picture.entity';
import { RaketApplication } from './entities/raket-application/entities/raket-application.entity';
import { Rating } from './entities/rating/entities/rating.entity';

config({ path: './backend/.env' });

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [Users, Raket, Raketista, Skills, RaketistaSkill, RaketPictures,Conversation, Message, RaketApplication, Rating],
  synchronize: true, 
  ssl: {
    rejectUnauthorized: false,
  },
});

// run npx ts-node src/seed/seed-skills.ts to initialize