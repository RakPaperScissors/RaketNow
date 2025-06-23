import { ChildEntity, Column } from 'typeorm';
import { Users } from './../../user/entities/user.entity';

@ChildEntity()
export class Organization extends Users {
    @Column({ type: 'varchar', length: 255, nullable: true, unique: true })
    orgName: string;

    @Column({ type: 'boolean' })
    isOrgVerified: boolean;
}
