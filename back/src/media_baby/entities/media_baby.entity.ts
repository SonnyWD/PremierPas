import { User } from 'src/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn} from 'typeorm';

@Entity()
export class MediaBaby {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar'})
    typeMedia: string;

    @Column({ type: 'varchar'})
    url: string;

    @Column({ type: 'date'})
    date: Date;

    @ManyToOne(() => User, (user) => user.medias, { onDelete: 'CASCADE' })
    user: User;
}
