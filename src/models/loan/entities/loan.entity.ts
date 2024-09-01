import { Vehicle } from "../../..//models/vehicles/entities/vehicle.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('loan_applications')
export class LoanApplication {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  applicantName: string;

  @Column()
  applicantEmail: string;

  @Column('decimal')
  loanAmount: number;

  @Column()
  status: string; // [ PENDING, APPROVED, REJECTED]

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime' })
  modifiedAt: Date;

  @ManyToOne(() => Vehicle, vehicle => vehicle.loanApplications, { eager: true })
  vehicle: Vehicle;
}