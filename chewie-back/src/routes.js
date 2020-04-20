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
import RoomItemController from './app/controllers/RoomItemController';
import PartnerController from './app/controllers/PartnerController';
import PartnerProjectController from './app/controllers/PartnerProjectController';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.put('/users', UserController.update);

routes.get('/sessions', SessionController.index);

routes.post('/meetings', MeetingController.store);

routes.get('/meetings', MeetingController.index);

routes.post('/files', upload.single('file'), FileController.store);

routes.post('/meetingRoom', MeetingRoomController.store);

routes.get('/meetingRoom', MeetingRoomController.index);

routes.post('/roomItens', RoomItemController.store);

routes.get('/roomItens/:id', RoomItemController.store);

routes.post('/projects', ProjectController.store);

routes.post('/partners', PartnerController.store);

routes.put('/partners', PartnerController.update);

routes.post('/partners-projects', PartnerProjectController.store);

routes.get('/partners-projects', PartnerProjectController.index);

export default routes;