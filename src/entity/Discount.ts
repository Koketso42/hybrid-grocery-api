import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Discount {
	@PrimaryGeneratedColumn() discountId: number;

	@Column('double') discountPercentage: number;
}
