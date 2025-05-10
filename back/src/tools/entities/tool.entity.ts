import { User } from 'src/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';

@Entity()
export class Tool {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  iconName: string;

  @Column()
  path: string;

  @ManyToMany(() => User, (user) => user.favoriteTools)
  users: User[];
}
