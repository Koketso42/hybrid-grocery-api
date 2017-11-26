import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Product } from './Product';

@Entity()
export class ProductCategory {
	@PrimaryGeneratedColumn() categoryId: number;

	@Column() categoryName: string;

	@OneToMany((type) => Product, (product) => product.category)
	products: Product[];
}
