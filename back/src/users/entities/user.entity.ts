import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable} from 'typeorm';
import { Exclude } from 'class-transformer'
import { UserRole } from '../roles/user-role.enum';
import { Pregnancy } from 'src/pregnancy/entities/pregnancy.entity';
import { MedicalAppointement } from 'src/medical_appointement/entities/medical_appointement.entity';
import { Mood } from 'src/mood/entities/mood.entity';
import { MediaBaby } from 'src/media_baby/entities/media_baby.entity';
import { AnswerForm } from 'src/answer_form/entities/answer_form.entity';
import { Quiz } from 'src/quiz/entities/quiz.entity';
import { TodoList } from 'src/todo_list/entities/todo_list.entity';
import { Publication } from 'src/publication/entities/publication.entity';
import { Comment } from 'src/comments/entities/comment.entity';
import { Message } from 'src/messages/entities/message.entity';
import { Sponsorship } from 'src/sponsorship/entities/sponsorship.entity';
import { LikePublication } from 'src/like_publication/entities/like_publication.entity';
import { LikeComment } from 'src/like_comment/entities/like_comment.entity';
import { ListeCategorie } from 'src/liste_categorie/entities/liste_categorie.entity';
import { Tool } from 'src/tools/entities/tool.entity';

@Entity('user')
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nom: string;

    @Column()
    prenom: string;

    @Column({nullable: true })
    date_naissance: Date;

    @Column({ unique : true })
    email: string;

    @Column()
    @Exclude()
    mot_de_passe: string;

    @Column({ 
        type: 'enum', 
        enum: UserRole,
        default: UserRole.USER,
        enumName: 'user_role_enum'
     })
    @Exclude()
    role: UserRole;

    @Column({ type: 'json', nullable: true })
    suggested_name: object;

    @Column({ default: 0 })
    point: number;

    @Column({ type: 'varchar', nullable: true })
    referralCode: string;

    @Column({ type: 'date', nullable: true })
    premiumUntil: Date;

    @Column({ type: 'datetime', nullable: true, default: () => 'CURRENT_TIMESTAMP' })
    lastLogin: Date;

    @Column({ type: 'datetime', nullable: true, default: () => 'CURRENT_TIMESTAMP' })
    lastLogOut: Date;

    // rajouter mes relations ici 
     @OneToMany(() => Pregnancy, (pregnancy) => pregnancy.user)
     pregnancies: Pregnancy[];

     @OneToMany(() => MedicalAppointement, (medicalAppointement) => medicalAppointement.user)
     medicalAppointements: MedicalAppointement[];

     @OneToMany(() => Mood, (mood) => mood.user)
     moods: Mood[];

     @OneToMany(() => MediaBaby, (medias) => medias.user)
     medias: MediaBaby[];

     @OneToMany(() => AnswerForm, (answersForm) => answersForm.user)
     answersForm: AnswerForm[];

     @OneToMany(() => Quiz, (quizs) => quizs.user)
     quizs: Quiz[];

     @OneToMany(() => TodoList, (todos) => todos.user)
     todos: TodoList[];

     @OneToMany(() => ListeCategorie, (categorie) => categorie.user)
    categories: ListeCategorie[];

     @OneToMany(() => LikePublication, (likePublication) => likePublication.user)
     likePublication: LikePublication[];

     @OneToMany(() => LikeComment, (likeComment) => likeComment.user)
     likeComment: LikePublication[];

     @OneToMany(() => Publication, (publications) => publications.user)
     publications: Publication[];

     @OneToMany(() => Comment, (comments) => comments.user)
     comments: Comment[];

     @OneToMany(() => Message, (message) => message.envoyeur)
     sentMessages: Message[];

    @OneToMany(() => Message, (message) => message.receveur)
    receivedMessages: Message[];

    @OneToMany(() => Sponsorship, (sponsorship) => sponsorship.sponsor)
    sponsor: Sponsorship[];

    @OneToMany(() => Sponsorship, (sponsorship) => sponsorship.sponsored)
    sponsored: Sponsorship[];
    roles: any;

    @ManyToMany(() => Tool, (tool) => tool.users)
    @JoinTable({ name: 'user_favorite_tools_tool' })
    favoriteTools: Tool[];
}
