import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Address } from './Address';
import { Account } from './Account';

@Entity()
export class Person {
	@PrimaryGeneratedColumn() personId: number;

	@Column() idNumber: number;

	@Column() firstName: string;

	@Column() lastName: string;

	@Column() email: string;

	@Column() phone: string;

	@OneToOne((type) => Account)
	@JoinColumn()
	bankAccount: Account;

	@OneToOne((type) => Address)
	@JoinColumn()
	address: Address;
}
