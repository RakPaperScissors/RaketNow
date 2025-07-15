import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn} from "typeorm";
import { Users } from './../../user/entities/user.entity';

@Entity()
export class Certification {
    @PrimaryGeneratedColumn()
    certId : number;

    @Column({type:'varchar', length:100 , nullable:false})
    title : string;

    @Column ({type:'varchar', length: 999, nullable:true})
    fileURL : string;

    @Column ({type:'boolean'})
    isAuthenticated: boolean;

    @Column ({type: 'varchar', length: 100, nullable:true})
    issuingOrganization: string;

    // foreign key to Users table
    @ManyToOne(()=> Users, user => user.uid, {onDelete: 'CASCADE'})
    @JoinColumn({name: "raketistaId", referencedColumnName: "uid"})
    raketistaId : Users;
}
