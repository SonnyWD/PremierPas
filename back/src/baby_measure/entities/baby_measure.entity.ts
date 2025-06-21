import { Baby } from '../../baby/entities/baby.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class BabyMeasure {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dateMesure: Date;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  weightKg: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  sizeCm: number;

  @Column({ type: 'decimal', precision: 4, scale: 2, nullable: true })
  temperatureC: number;

  @ManyToOne(() => Baby, baby => baby.measures, { onDelete: 'CASCADE' })
  baby: Baby;
}
