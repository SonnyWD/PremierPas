import { Comment } from "../../comments/entities/comment.entity";
import { User } from "../../users/entities/user.entity";
import { CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class LikeComment {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => Comment, (comment) => comment.likeComment)
    comment: Comment;

    @ManyToOne(() => User, (user) => user.likeComment, { onDelete: 'CASCADE' })
      user: User;
}
