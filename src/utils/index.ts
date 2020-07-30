import { Router, Request, Response } from 'express';
import { container } from 'tsyringe';

import logger from '../logger';

type Wrapper = (router: Router) => void;
type TaskWrapper = () => Promise<void>;

interface Route {
    method: string;
    route: string;
    controller: any;
    action: string;
}

interface Task {
    start: TaskWrapper;
    name: string;
}

export const startTasks = async (tasks: Task[]) => {
    setTimeout(async () => {
        for (const t of tasks) {
            logger.info(`Starting task: ${t.name}`);
            await t.start();
        }
    }, 5000);
};

export const applyMiddleware = (middlewareWrappers: Wrapper[], router: Router) => {
    for (const wrapper of middlewareWrappers) {
        wrapper(router);
    }
};

export const applyRoutes = (routes: Route[], router: Router) => {
    routes.forEach((route) => {
        const { method, controller, action } = route;

        (router as any)[method](route.route, (req: Request, res: Response, next: () => void) => {
            const ctrl = container.resolve(controller);
            const result = ctrl[action](req, res, next);

            if (result instanceof Promise) {
                result.then((innerResult) =>
                    innerResult !== null && innerResult !== undefined ? res.send(innerResult) : undefined
                );
            } else if (result !== null && result !== undefined) {
                res.json(result);
            }
        });
    });
};
