import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Mood {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar'})
    type: string;

    @Column({ type:'varchar'})
    description: string;

    @Column({ type: 'timestamp' })
    startDate: Date; 

    @Column({ type: 'timestamp' })
    endDate: Date;

    @ManyToOne(() => User, (user) => user.moods)
    user: User;
}
