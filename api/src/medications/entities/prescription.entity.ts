import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Medication } from './medication.entity';

@Entity()
export class Prescription {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User, user => user.prescriptions)
    user: User;

    @ManyToOne(() => Medication, medication => medication.prescriptions)
    medication: Medication;

    @Column()
    dosage: string;

    @Column()
    frequency: string;

    @Column()
    startDate: Date;

    @Column({ nullable: true })
    endDate?: Date;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}