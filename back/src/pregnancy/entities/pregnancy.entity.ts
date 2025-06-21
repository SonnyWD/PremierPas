import { Baby } from "../../baby/entities/baby.entity";
import { MedicalAppointement } from "../../medical_appointement/entities/medical_appointement.entity";
import { User } from "../../users/entities/user.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';


export enum PregnancyStatus {
    COMPLETED = 'a accouché',
    IN_PROGRESS = 'en cours',
    INTERRUPTED = 'interrompue'
}
@Entity()
export class Pregnancy {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'timestamp'})
    startDate: Date;

    @Column({ type: 'timestamp', nullable: true})
    dueDate: Date;

    @Column({ type: 'enum', enum: PregnancyStatus, default: PregnancyStatus.IN_PROGRESS})
    status: PregnancyStatus;

    @ManyToOne(() => User, (user) => user.pregnancies, { onDelete: 'CASCADE'})
    user: User;

    @OneToMany(() => Baby, (baby) => baby.pregnancy)
    babies: Baby[];

    @OneToMany(() => MedicalAppointement, (medicalAppointement) => medicalAppointement.pregnancy)
    medicalAppointments: MedicalAppointement[];
}
