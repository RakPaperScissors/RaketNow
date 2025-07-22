import { Entity, Column, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Raketista } from '../../raketista/entities/raketista.entity';
import { Raket } from '../../rakets/entities/raket.entity';

@Entity()
export class RaketApplication {
  @PrimaryGeneratedColumn()
  applicationId: number;

  @ManyToOne(() => Raketista, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'raketistaId', referencedColumnName: 'uid' })
  raketista: Raketista;

  @ManyToOne(() => Raket, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'raketId', referencedColumnName: 'raketId' })
  raket: Raket;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0, nullable: true})
  priceProposal: number;

  @Column({ type: 'varchar', length: 20, default: 'PENDING' })
  status: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dateCreated: Date;
}