import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ProductCategory } from './ProductCategory';
import { Order } from './Order';

@Entity()
export class Product {
	@PrimaryGeneratedColumn() productId: number;

	@Column() productName: string;

	@Column() shortDescription: string;

	@Column() price: number;

	@Column() quantity: number;

	@Column() imageURL: string;

	@ManyToOne((type) => ProductCategory, (category) => category.products)
	category: ProductCategory;

	@ManyToOne((type) => Order, (order) => order.products)
	order: Order;
}
