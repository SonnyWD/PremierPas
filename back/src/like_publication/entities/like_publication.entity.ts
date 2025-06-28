import { Publication } from '../../publication/entities/publication.entity';
import { User } from '../../users/entities/user.entity';
import {
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class LikePublication {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Publication, (publication) => publication.likePublication, {
    onDelete: 'CASCADE',
  })
  publication: Publication;

  @ManyToOne(() => User, (user) => user.likePublication, {
    onDelete: 'CASCADE',
  })
  user: User;

  @CreateDateColumn()
  createdAt: Date;
}
