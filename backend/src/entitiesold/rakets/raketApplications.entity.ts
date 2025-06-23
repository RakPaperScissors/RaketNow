import { Column, Entity, JoinColumn, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Raket } from "./rakets.entity";
import { Users } from "../users/user.entity";

@Entity({ name: 'raketApplications' })
export class RaketApplication {
    @PrimaryGeneratedColumn()
    applicationId: number;

    @Column({ name: 'raketID', type: 'uuid' })
    raketId: string;
    @ManyToOne(() => Raket, raket => raket.racketId, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'raketID' })
    raket: Raket;

    @Column({ name: 'raketistaID', type: 'uuid' }) 
    raketistaId: string;
    @ManyToOne(() => Users, user => user.uid, { nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'raketistaID' })
    raketista: Users; 

    @Column({ type: 'numeric', precision: 10, scale: 2, nullable: true }) // Correct type for currency
    priceProposal: number;

    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    dateCreated: Date;

    @Column({type: 'timestamp', nullable: true})
    CompletedAt: Date;
}