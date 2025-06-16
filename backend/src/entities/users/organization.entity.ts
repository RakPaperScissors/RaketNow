import { ChildEntity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Users } from './user.entity';

@ChildEntity()
export class Organization extends Users {
    @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
    org_id: number;

    @Column({ type: 'varchar', length: 255 })
    org_name: string;

    @Column({ type: 'boolean' })
    is_verified: boolean;
}
