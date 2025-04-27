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

    @Column({ type: 'int', nullable: true})
    size: number;

    @Column({ type: 'decimal', nullable: true})
    weight: number;

    @Column({ type: 'timestamp', nullable: true})
    lastLaunch: Date;

    @Column({ type: 'time', nullable: true})
    sleepDuration: string;

    @Column({ type: 'decimal', nullable: true})
    temperature: number;

    @ManyToOne(() => Pregnancy, (pregnancy) => pregnancy.babies, { nullable: true })
    pregnancy: Pregnancy;

    @OneToMany(() => MedicalAppointement, (medicalAppointement) => medicalAppointement.baby)
    medicalAppointments: MedicalAppointement;
}
