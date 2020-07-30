import { UserController } from './controller';

export default [
    {
        method: 'post',
        route: '/user/register',
        controller: UserController,
        action: 'createUser',
    },

    {
        method: 'get',
        route: '/user/get/:email',
        controller: UserController,
        action: 'getUser',
    },
];
