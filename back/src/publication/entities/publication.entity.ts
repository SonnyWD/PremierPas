import { Comment } from "src/comments/entities/comment.entity";
import { LikePublication } from "src/like_publication/entities/like_publication.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Publication {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar'})
    title: string;

    @Column({ type: 'text'})
    content: string;

    @Column({ type: 'date'})
    publicationDate: Date;

    @ManyToOne(() => User, (user) => user.publications,{ eager: true, onDelete: 'CASCADE' })
    user: User;

    @OneToMany(() => LikePublication, (likePublication) => likePublication.publication)
    likePublication: LikePublication[];

    @OneToMany(() => Comment, (comment) => comment.publication)
    comment: Comment[];
}
