import { Entity, PrimaryGeneratedColumn, Column, Table } from 'typeorm';

@Entity()
export class Address {
	@PrimaryGeneratedColumn() addressId: number;

	@Column() complexName: string;

	@Column() streetName: string;

	@Column() suburb: string;

	@Column() city: string;

	@Column() state: string;

	@Column() country: string;

	@Column({
		length: 4
	})
	postalCode: string;
}
