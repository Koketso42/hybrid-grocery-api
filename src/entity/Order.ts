import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { Person } from './Person';
import { Product } from './Product';

@Entity()
export class Order {
	@PrimaryGeneratedColumn() orderId: number;

	@OneToOne((type) => Person)
	@JoinColumn()
	customer: Person;

	@OneToMany((type) => Product, (product) => product.order)
	products: Product[];

	@Column() totalPrice: number;

	@Column() deliveryStatus: boolean;

	@Column() orderDate: Date;
}
