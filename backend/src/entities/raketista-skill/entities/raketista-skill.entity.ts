import { Entity, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Raketista } from '../../raketista/entities/raketista.entity';
import { Skills } from '../../skills/entities/skill.entity';

@Entity()
export class RaketistaSkill {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Raketista, raketista => raketista.raketistaSkills, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'raketistaId', referencedColumnName: 'uid' })
  raketista: Raketista;

  @ManyToOne(() => Skills, skill => skill.raketistaSkills, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'skill_Id', referencedColumnName: 'skill_Id' })
  skill: Skills;
}