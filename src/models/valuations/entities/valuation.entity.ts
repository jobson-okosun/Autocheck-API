import { Vehicle } from "../../..//models/vehicles/entities/vehicle.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('valuations')
export class Valuation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('decimal')
  estimatedValue: number;

  @Column('date')
  valuationDate: Date;

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime' })
  modifiedAt: Date;

  @ManyToOne(() => Vehicle, vehicle => vehicle.valuations, { eager: true })
  vehicle: Vehicle;
  
}