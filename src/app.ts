import express, { Request, Response } from 'express';
import { ApiError } from './utils/ApiError';
import errorHandler from './middlewares/errorHandler';
import studentRoutes from './routes/StudentRoute';

const app = express();

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});

app.use('/students', studentRoutes);

app.use((req: Request, res: Response, next) => {
    next(new ApiError(404, `Route ${req.method} ${req.originalUrl} not found`));
});

app.use(errorHandler);

export default app;