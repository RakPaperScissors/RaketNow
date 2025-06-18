import { ChildEntity, Column } from "typeorm";
import { Users } from "./user.entity";

@ChildEntity()
export class RaketistaProfile extends Users {
    @Column({ type: 'varchar', length: 255 })
    bio: string;

    @Column({ type: 'boolean' })
    isVerified: boolean;

    @Column()
    aveResponseTime: number;

    @Column({ type: 'boolean' })
    isAutoReplyEnabled: boolean;

    @Column({ type: 'varchar', length: 500, nullable: true })
    autoReplyMessage: string;
}