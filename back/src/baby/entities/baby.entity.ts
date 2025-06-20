import { BabyDaily } from 'src/baby_daily/entities/baby_daily.entity';
import { BabyMeasure } from 'src/baby_measure/entities/baby_measure.entity';
import { MedicalAppointement } from 'src/medical_appointement/entities/medical_appointement.entity';
import { Pregnancy } from 'src/pregnancy/entities/pregnancy.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Baby {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'date', nullable: true})
    birthDate: Date;

    @Column({ type: 'varchar', nullable: true, default: ''})
    firstName: string;

    @ManyToOne(() => Pregnancy, (pregnancy) => pregnancy.babies, { nullable: true })
    pregnancy: Pregnancy;

    @OneToMany(() => MedicalAppointement, (medicalAppointement) => medicalAppointement.baby)
    medicalAppointments: MedicalAppointement;

    @OneToMany(() => BabyMeasure, measure => measure.baby)
    measures: BabyMeasure[];

    @OneToMany(() => BabyDaily, daily => daily.baby)
    daily: BabyDaily[];

}
