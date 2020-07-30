import { injectable } from 'tsyringe';
import * as createError from 'http-errors';

import User from './entity';
import UserRepository from './repository';

@injectable()
export default class UserService {
    constructor(private userRepository: UserRepository) {}

    getUser = async (email: string) => await this.userRepository.getUser(email);

    public async createUser({ email, password }) {
        const user: User = await this.getUser(email);

        if (user) {
            throw createError(`Username with email ${email} already exists`);
        }

        const newUser: User = await this.userRepository.createUser({ email, password });

        return newUser;
    }
}
