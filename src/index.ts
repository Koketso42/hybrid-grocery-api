import { Discount } from './entity/Discount';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import 'reflect-metadata';
import { Request, Response } from 'express';
import { Routes } from './routes';
import { User } from './entity/User';
import { ProductCategory } from './entity/ProductCategory';
import { Product } from './entity/Product';

createConnection()
	.then(async (connection) => {
		const app = express();
		app.use(bodyParser.json());
		app.use(bodyParser.urlencoded({ extended: true }));
		
		app.use((req, res, next) => {
			res.header('Access-Control-Allow-Origin', '*');
			res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
			return next();
		});

		// register express routes from defined application routes
		Routes.forEach((route) => {
			(app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
				const result = new (route.controller as any)()[route.action](req, res, next);
				if (result instanceof Promise) {
					result.then((result) => (result !== null && result !== undefined ? res.send(result) : undefined));
				} else if (result !== null && result !== undefined) {
					res.json(result);
				}
			});
		});

		// start express server
		app.listen(3000);

		// create default system admin user
		let admin = new User();
		admin.userId = 1;
		admin.username = 'admin';
		admin.password = 'admin';
		admin.role = 'admin';

		await connection.manager.save(connection.manager.create(User, admin));

		let discount = new Discount();
		discount.discountId = 1;
		discount.discountPercentage = 0;
		await connection.manager.save(connection.manager.create(Discount, discount));

		discount.discountId = 2;
		discount.discountPercentage = 0.25;
		await connection.manager.save(connection.manager.create(Discount, discount));

		discount.discountId = 3;
		discount.discountPercentage = 0.5;
		await connection.manager.save(connection.manager.create(Discount, discount));

		let category = new ProductCategory();
		category.categoryId = 1;
		category.categoryName = 'Printing';

		let samsungCartridge = new Product();
		samsungCartridge.productId = 1;
		samsungCartridge.productName = 'SAMSUNG Black Laser Toner Cartridge';
		samsungCartridge.shortDescription = 'Laser printer, YWellow, Clt-y404s';
		samsungCartridge.imageURL = '';
		samsungCartridge.price = 1299.99;
		samsungCartridge.quantity = 10;
		await connection.manager.save(connection.manager.create(Product, samsungCartridge));

		let canonCartridge = new Product();
		canonCartridge.productId = 2;
		canonCartridge.productName = 'CANON - Cl-513 Inkjet Cartridge';
		canonCartridge.shortDescription =
			'Cl-512 colour high yield cartridge, For use in mp250 mx320, 12 month guarantee';
		canonCartridge.imageURL = '';
		canonCartridge.price = 679.99;
		canonCartridge.quantity = 25;
		await connection.manager.save(connection.manager.create(Product, canonCartridge));

		category.products = [ samsungCartridge, canonCartridge ];
		await connection.manager.save(connection.manager.create(ProductCategory, category));

		console.log('Express server has started on port 3000. Open http://localhost:3000/users to see results');
	})
	.catch((error) => console.log(error));
