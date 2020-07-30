import { injectable } from 'tsyringe';
import { getMongoRepository } from 'typeorm';

import User from './entity';

@injectable()
export default class UserRepository {
    private userRepository = getMongoRepository(User);

    public async createUser({ email, password }): Promise<User> {
        const entity = new User(email, password);
        return this.userRepository.save(entity);
    }

    public async getUser(email: string): Promise<User> {
        return await this.userRepository.findOne({ email });
    }
}
