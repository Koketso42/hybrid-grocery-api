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
		return this.userRepository
			.findOne({ username: username, password: password })
			.then((data) => {
				return data;
			})
			.catch((err) => {
				return err;
			});
	}

	async register(request: Request, response: Response, next: NextFunction) {
        const user: User = request.body;
        const person: Person = user.person;
        const address: Address = person.address;
        const bankAccount: Account = person.bankAccount;
		this.userRepository
			.save(user)
			.then(() => {
                this.personRepo.save(person)
                .then((data) => {
                    this.addressRepo.save(address);
                    this.accountRepo.save(bankAccount);
                });
			})
			.catch((err) => {
				console.log(err);
			});
	}
}
