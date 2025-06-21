import { Baby } from '../../baby/entities/baby.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';

@Entity()
export class BabyDaily {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  dateRecorded: Date;

  @Column({ type: 'decimal', precision: 4, scale: 2, nullable: true })
  sleepDurationHours: number;

  @Column({ type: 'timestamp', nullable: true })
  lastFeed: Date;

  @ManyToOne(() => Baby, baby => baby.daily, { onDelete: 'CASCADE' })
  baby: Baby;
}
