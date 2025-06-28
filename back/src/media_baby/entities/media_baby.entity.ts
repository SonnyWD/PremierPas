import { User } from '../../users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class MediaBaby {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  typeMedia: string;

  @Column({ type: 'varchar' })
  url: string;

  @Column({ type: 'timestamp' })
  date: Date;

  @ManyToOne(() => User, (user) => user.medias, { onDelete: 'CASCADE' })
  user: User;
}
