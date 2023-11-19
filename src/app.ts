import express, { Express } from 'express';
import { Server } from 'http';
import { LoggerService } from './logger/logger.service';
import { UsersController } from './users/users.controller';
import { ExeptionFilter } from './errors/exeption.filter';

export class App {
    app: Express;
    PORT: number;
    server: Server;
    logger: LoggerService;
    userController: UsersController;
    exeptionFilter: ExeptionFilter;

    constructor(
        logger: LoggerService,
        userController: UsersController,
        exeptionFilter: ExeptionFilter
    ) {
        this.app = express();
        this.PORT = 8000;
        this.logger = logger;
        this.userController = userController;
        this.exeptionFilter = exeptionFilter;
    }

    useRoutes() {
        this.app.use('/users', this.userController.router);
    }

    useExeptionFilters() {
        this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter));
    }

    public async init() {
        this.useRoutes();
        this.logger.log('Starting server...');
        //     this.server = this.app.listen(this.PORT, () => {
        //         console.log(`Server is running on port ${this.PORT}`);
        //     });
    }
}
