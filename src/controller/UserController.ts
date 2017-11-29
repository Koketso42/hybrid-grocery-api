import { ResponseData } from './model/ResponseData';
import { Account } from './../entity/Account';
import { Address } from './../entity/Address';
import { Person } from './../entity/Person';
import { getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
import { User } from '../entity/User';

export class UserController {
	private userRepository = getRepository(User);
	private personRepo = getRepository(Person);
	private addressRepo = getRepository(Address);
	private accountRepo = getRepository(Account);

	async all(request: Request, response: Response, next: NextFunction) {
		return this.userRepository.find();
	}

	async one(request: Request, response: Response, next: NextFunction) {
		return this.userRepository.findOneById(request.params.id);
	}

	async save(request: Request, response: Response, next: NextFunction) {
		return this.userRepository.save(request.body);
	}

	async remove(request: Request, response: Response, next: NextFunction) {
		await this.userRepository.removeById(request.params.id);
	}

	async login(request: Request, response: Response, next: NextFunction) {
		const username = request.body.username.toString();
		const password = request.body.password.toString();

		const user = await this.userRepository
			.createQueryBuilder('user')
			.where('user.username = :username', { username: username })
			.andWhere('user.password = :password', { password: password })
			.getOne();

		let responseData = new ResponseData();
		responseData.status = '200';
		responseData.data = user;

		if (user == undefined) {
			responseData.status = '403';
			responseData.data = { error: 'Authentication failed' };

			return responseData;
		}

		return responseData;
	}

	async register(request: Request, response: Response, next: NextFunction) {
		const user: User = request.body;
		const person: Person = user.person;
		const address: Address = person.address;
		const bankAccount: Account = person.bankAccount;

		await this.accountRepo.save(bankAccount);
		await this.addressRepo.save(address);
		await this.personRepo.save(person);
		await this.userRepository.save(user);

		console.log(user);

		let responseData = new ResponseData();
		responseData.status = '200';
		responseData.data = {};

		return responseData;
	}
}
