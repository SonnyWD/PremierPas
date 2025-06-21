import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable} from 'typeorm';
import { Exclude } from 'class-transformer'
import { UserRole } from '../roles/user-role.enum';
import { Pregnancy, PregnancyStatus } from '../../pregnancy/entities/pregnancy.entity';
import { MedicalAppointement } from '../../medical_appointement/entities/medical_appointement.entity';
import { Mood } from '../../mood/entities/mood.entity';
import { MediaBaby } from '../../media_baby/entities/media_baby.entity';
import { AnswerForm } from '../../answer_form/entities/answer_form.entity';
import { Quiz } from '../../quiz/entities/quiz.entity';
import { TodoList } from '../../todo_list/entities/todo_list.entity';
import { Publication } from '../../publication/entities/publication.entity';
import { Comment } from '../../comments/entities/comment.entity';
import { Message } from '../../messages/entities/message.entity';
import { Sponsorship } from '../../sponsorship/entities/sponsorship.entity';
import { LikePublication } from '../../like_publication/entities/like_publication.entity';
import { LikeComment } from '../../like_comment/entities/like_comment.entity';
import { Tool } from '../../tools/entities/tool.entity';
import { AccessContent } from '../../access_content/entities/access_content.entity';

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

    @Column({ type: 'int', default: 0 })
    point: number;

    @Column({ type: 'varchar', nullable: true })
    referralCode: string;

    @Column({ type: 'timestamp', nullable: true })
    premiumUntil: Date;

    @Column({ type: 'timestamptz', nullable: true, default: () => 'CURRENT_TIMESTAMP' })
    lastLogin: Date;

    @Column({ type: 'enum', enum: ['femme_enceinte', 'parent', 'autre'] })
    type_profil: 'femme_enceinte' | 'parent' | 'autre';

    @Column({ type: 'timestamptz', nullable: true, default: () => 'CURRENT_TIMESTAMP' })
    lastLogOut: Date;

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

     @OneToMany(() => LikePublication, (likePublication) => likePublication.user)
     likePublication: LikePublication[];

     @OneToMany(() => LikeComment, (likeComment) => likeComment.user)
     likeComment: LikeComment[];

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

     @OneToMany(() => AccessContent, (access) => access.user)
     access: AccessContent[];

     @ManyToMany(() => Tool, (tool) => tool.users)
     @JoinTable({ name: 'user_favorite_tools_tool' })
     favoriteTools: Tool[];

     get activePregnancy(): Pregnancy | undefined {
        
        return this.pregnancies?.find(p => p.status === PregnancyStatus.IN_PROGRESS);
    }
}
