import { ChildEntity, Column } from 'typeorm';
import { Users } from './user.entity';

@ChildEntity()
export class Organization extends Users {
    @Column({ type: 'varchar', length: 255 })
    org_name: string;

    @Column({ type: 'boolean' })
    is_verified: boolean;
}
