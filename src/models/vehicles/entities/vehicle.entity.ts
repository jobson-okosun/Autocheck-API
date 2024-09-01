import { LoanApplication } from "../../../models/loan/entities/loan.entity";
import { Valuation } from "../../../models/valuations/entities/valuation.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('vehicles')
export class Vehicle {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  vin: string;

  @Column()
  make: string;

  @Column()
  model: string;

  @Column()
  year: number;

  @Column()
  mileage: number;

  @CreateDateColumn({ type: 'datetime', default: Date.now })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime', default: Date.now })
  modifiedAt: Date;

  @OneToMany(() => Valuation, valuation => valuation.vehicle, { cascade: true })
  valuations: Valuation[];

  @OneToMany(() => LoanApplication, loanApplication => loanApplication.vehicle)
  loanApplications: LoanApplication[];
}