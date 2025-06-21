import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Article {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar'})
    title: string;

    @Column({ type: 'text'})
    content: string;

    @Column({ type: 'timestamp'})
    creationDate: Date;

    @Column({ type: 'varchar'})
    author: string;

    @Column({ type: 'varchar', nullable: true})
    imageUrl: string;

    @Column()
    adminId: number;
}
