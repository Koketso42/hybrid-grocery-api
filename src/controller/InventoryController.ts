import { getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { ProductCategory } from './../entity/ProductCategory';
import { Product } from './../entity/Product';

export class InventoryController {

    private categoryRepository = getRepository(ProductCategory);
    private productRepository = getRepository(Product);

    async categories(request: Request, response: Response, next: NextFunction) {
        return this.categoryRepository.find();
    }

    async products(request: Request, response: Response, next: NextFunction) {
        return this.productRepository.find();
    }

    async getCategory(request: Request, response: Response, next: NextFunction) {
        return this.categoryRepository.findOneById(request.params.id);
    }

    async getProduct(request: Request, response: Response, next: NextFunction) {
        return this.productRepository.findOneById(request.params.id);
    }

    async addCategory(request: Request, response: Response, next: NextFunction) {
        return this.categoryRepository.save(request.body);
    }

    async addProduct(request: Request, response: Response, next: NextFunction) {
        return this.productRepository.save(request.body);
    }

    async removeCategory(request: Request, response: Response, next: NextFunction) {
        await this.categoryRepository.removeById(request.params.id);
    }

    async removeProduct(request: Request, response: Response, next: NextFunction) {
        await this.productRepository.removeById(request.params.id);
    }

    async catalogue(request: Request, response: Response, next: NextFunction) {
        return this.categoryRepository.find({ relations: ['products'] });
    }
}