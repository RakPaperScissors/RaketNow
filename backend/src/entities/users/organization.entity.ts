import { ChildEntity, Column } from 'typeorm';
import { Users } from './user.entity';

@ChildEntity()
export class Organization extends Users {
    @Column({ type: 'varchar', length: 255 })
    orgName: string;

    @Column({ type: 'boolean' })
    isOrgVerified: boolean;
}
