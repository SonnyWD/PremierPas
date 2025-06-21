import { User } from "../../users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from "typeorm";

@Entity()
export class Sponsorship {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'timestamp'})
    sponsorshipDate: Date;

    @ManyToOne(() => User, (user) => user.sponsor)
    @JoinColumn({ name: 'id_utilisateur_parrain' })
    sponsor: User;

    @ManyToOne(() => User, (user) => user.sponsored)
    @JoinColumn({ name: 'id_utilisateur_parrainage' })
    sponsored: User;
}
