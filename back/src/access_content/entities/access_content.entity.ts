import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class AccessContent {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int'})
    contentId: number;

    @CreateDateColumn({ type: 'datetime'})
    dateDeblocage: Date;

    @ManyToOne(() => User, (user) => user.access)
    user: User;
}
