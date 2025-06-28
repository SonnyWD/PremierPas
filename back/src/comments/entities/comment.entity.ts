import { LikeComment } from '../../like_comment/entities/like_comment.entity';
import { Publication } from '../../publication/entities/publication.entity';
import { User } from '../../users/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'timestamp' })
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.comments, {
    eager: true,
    onDelete: 'CASCADE',
  })
  user: User;

  @ManyToOne(() => Publication, (publication) => publication.comment, {
    eager: true,
  })
  publication: Publication;

  @OneToMany(() => LikeComment, (likeComment) => likeComment.comment)
  likeComment: LikeComment[];
}
