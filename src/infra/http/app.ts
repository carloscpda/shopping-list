import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import { v1Router } from './api/v1';
import { isProduction } from '../../config';
import passport from 'passport';
import { authService } from '../../modules/users/services/auth';

const app = express();

const origin = {
  origin: isProduction ? 'https://example.com' : '*',
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(origin));
app.use(compression());
app.use(helmet());
app.use(morgan('combined'));

// Auth
authService.init(app);

// Routes
app.use('/api/v1', v1Router(passport));

// Port
app.listen(process.env.PORT || 9044, () => {
  console.log(`[App]: Server listening on 9044`);
});

export { app, passport };
