import { BabyDaily } from '../../baby_daily/entities/baby_daily.entity';
import { BabyMeasure } from '../../baby_measure/entities/baby_measure.entity';
import { MedicalAppointement } from '../../medical_appointement/entities/medical_appointement.entity';
import { Pregnancy } from '../../pregnancy/entities/pregnancy.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Baby {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'timestamp', nullable: true})
    birthDate: Date;

    @Column({ type: 'varchar', nullable: true, default: ''})
    firstName: string;

    @Column({ type: 'varchar', nullable: true })
    gender: string;

    @ManyToOne(() => Pregnancy, (pregnancy) => pregnancy.babies, { nullable: true })
    pregnancy: Pregnancy;

    @OneToMany(() => MedicalAppointement, (medicalAppointement) => medicalAppointement.baby)
    medicalAppointments: MedicalAppointement;

    @OneToMany(() => BabyMeasure, measure => measure.baby)
    measures: BabyMeasure[];

    @OneToMany(() => BabyDaily, daily => daily.baby)
    daily: BabyDaily[];

}
