import { Entity, Column, PrimaryGeneratedColumn,  CreateDateColumn, BaseEntity } from 'typeorm';

@Entity()
export class Image extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  path: string;
  
  @Column()
  name: string;
  
  @Column()
  size: string;
  
  @Column({
    length: 100,
    nullable: true
  })
  label: string;

  @CreateDateColumn()
  createdAt: Date;
}