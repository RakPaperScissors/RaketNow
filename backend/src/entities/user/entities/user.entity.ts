import { Entity, PrimaryGeneratedColumn, Column, TableInheritance, OneToMany, ManyToMany, ManyToOne } from 'typeorm';
export enum userRole {
    CLIENT = 'client',
    RAKETISTA = 'raketista',
    ORGANIZATION = 'organization',
    ADMIN = 'admin',
}

@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export class Users {
    @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
    uid: number;

    @Column({ type: 'varchar', length: 255 })
    email: string;

    @Column({ type: 'varchar', length: 255 })
    password: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    firstName: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    lastName: string;

    // Main role of the user
    @Column({ type: 'enum', enum: userRole, default: userRole.CLIENT, })
    role: userRole;

    // Additional roles that the user can have
    @Column("text", { array: true, default: [userRole.CLIENT]})
    roles: userRole[];

    @Column({ type: 'varchar', length: 50, nullable: true})
    authProvider: string;

    @Column({ type: 'varchar', nullable: true })
    providerId: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    profilePicture: string;

    @Column({ type: 'timestamp', nullable: true })
    lastActive: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'timestamp', nullable: true })
    deletedAt: Date;
}