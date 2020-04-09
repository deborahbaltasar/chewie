import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';

import authMiddleware from './app/middlewares/auth';
import MeetingRoomController from './app/controllers/MeetingRoomController';
import MeetingController from './app/controllers/MeetingController';
import ProjectController from './app/controllers/ProjectController';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.put('/users', UserController.update);

routes.post('/meetings', MeetingController.store)

routes.post('/files', upload.single('file'), FileController.store);

routes.post('/meetingRoom', MeetingRoomController.store);

routes.post('/projects', ProjectController.store);

export default routes;