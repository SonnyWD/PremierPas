import { MedicalAppointement } from 'src/medical_appointement/entities/medical_appointement.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class AppointementType {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar'})
    title: string;

    @Column({ type: 'text', nullable: true})
    description: string;

    @OneToMany(() => MedicalAppointement, (medicalAppointement) => medicalAppointement.appointementType)
    medicalAppointements: MedicalAppointement[];
}
