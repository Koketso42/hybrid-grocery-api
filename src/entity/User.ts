import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Person } from './Person';

@Entity()
export class User {
	@PrimaryGeneratedColumn() userId: number;

	@Column() username: string;

	@Column() password: string;

	@Column() role: string;

	@OneToOne((type) => Person)
	@JoinColumn()
	person: Person;
}
