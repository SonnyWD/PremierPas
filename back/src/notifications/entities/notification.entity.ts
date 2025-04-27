import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Notification {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar'})
    notificationType: string;

    @Column({ type: 'varchar'})
    message: string;

    @Column({ type: 'timestamp'})
    duration: Date;
}
