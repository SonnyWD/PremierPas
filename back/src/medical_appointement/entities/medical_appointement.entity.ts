import { AppointementType } from "../../appointement_type/entities/appointement_type.entity";
import { Baby } from "../../baby/entities/baby.entity";
import { Pregnancy } from "../../pregnancy/entities/pregnancy.entity";
import { User } from "../../users/entities/user.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class MedicalAppointement {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'timestamp' })
    date: Date;

    @Column({ type: 'time' })
    hour: string;

    @Column({ type: 'varchar'})
    reason: string;

    @Column({ type: 'text'})
    description: string;

    @ManyToOne(() => User, (user) => user.medicalAppointements, { eager: true, onDelete: 'CASCADE' })
    user: User;

    @ManyToOne(() => Pregnancy, (pregnancy) => pregnancy.medicalAppointments, { nullable: true})
    pregnancy?: Pregnancy;

    @ManyToOne(() => Baby, (baby) => baby.medicalAppointments, { nullable: true})
    baby?: Baby;

    @ManyToOne(() => AppointementType, (appointementType) => appointementType.medicalAppointements)
    appointementType: AppointementType;
}
