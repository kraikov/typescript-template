import { Request, Response } from 'express';
import { injectable, container } from 'tsyringe';

import UserService from './service';

import { STATUS_CODES } from '../../constants';

@injectable()
export class UserController {
    constructor(private userService: UserService) {
        this.userService = container.resolve(UserService);
    }

    public async createUser(req: Request, res: Response): Promise<void> {
        try {
            const { email, password } = req.body;

            await this.userService.createUser({ email, password });

            res.status(STATUS_CODES.CREATED).send({ success: true, message: 'User is successfully created' });
        } catch (error) {
            res.status(STATUS_CODES.BAD_REQUEST).send({ success: false, message: error });
        }
    }

    public async getUser(req: Request, res: Response): Promise<void> {
        try {
            const { userId } = req.params;

            const user = await this.userService.getUser(userId);

            res.status(STATUS_CODES.OK).send({ success: true, message: 'User was successfully founded', data: user });
        } catch (error) {
            res.status(STATUS_CODES.BAD_REQUEST).send({ success: false, message: error });
        }
    }
}
