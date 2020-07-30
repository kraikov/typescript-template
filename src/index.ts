import 'reflect-metadata';

import * as http from 'http';
import * as express from 'express';
import { createConnection } from 'typeorm';

import env from './env';

import { applyRoutes, applyMiddleware, startTasks } from './utils';

import Middleware from './middleware';
import Routes from './routes';

import DbConfig from './database/config';

import log from './logger';

createConnection(DbConfig as any)
    .then(async () => {
        const router = express();

        applyMiddleware(Middleware, router);

        applyRoutes(Routes, router);

        const server = http.createServer(router);

        server.listen(env.app.port, () => log.info(`Server started on port ${env.app.port}.`));

        await startTasks([]);
    })
    .catch((error) => log.error(JSON.stringify(error)));
