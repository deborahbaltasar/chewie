import { Router } from 'express';
import multer from 'multer';

import multerConfig from './config/multer';
import authMiddleware from './app/middlewares/auth';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import MeetingRoomController from './app/controllers/MeetingRoomController';
import MeetingController from './app/controllers/MeetingController';
import ProjectController from './app/controllers/ProjectController';
import RoomItemController from './app/controllers/RoomItemController';
import PartnerController from './app/controllers/PartnerController';
import PartnerProjectController from './app/controllers/PartnerProjectController';
import ItemController from './app/controllers/ItemController';
import MemberController from './app/controllers/MemberController';
import TaskController from './app/controllers/TaskController';
import TaskMemberController from './app/controllers/TaskMemberController';
import ChecklistController from './app/controllers/ChecklistController';
import StatuController from './app/controllers/StatuController';
import ProjectStatuController from './app/controllers/ProjectStatuController';
import ExpenseController from './app/controllers/ExpenseController';
import EmmiterController from './app/controllers/EmmiterController';
import InvoiceController from './app/controllers/InvoiceController';
import DeviceCategoryController from './app/controllers/DeviceCategoryController';
import DeviceController from './app/controllers/DeviceController';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.put('/users', UserController.update);
routes.get('/users', UserController.show);

routes.get('/sessions', SessionController.index);

routes.post('/files', upload.single('file'), FileController.store);

//MEETINGS

routes.post('/meetings', MeetingController.store);
routes.get('/meetings', MeetingController.index);
routes.get('/meetings/:date', MeetingController.show);
routes.delete('/meetings/:id', MeetingController.delete);

//MEETING ROOM

routes.post('/meetingRoom', MeetingRoomController.store);
routes.get('/meetingRoom', MeetingRoomController.index);
routes.delete('/meetingRoom/:id', MeetingRoomController.delete);
routes.put('/meetingRoom/:id', MeetingRoomController.update)

routes.post('/item', ItemController.store);

routes.post('/roomItens', RoomItemController.store);

//PROJECTS

routes.post('/projects', ProjectController.store);
routes.delete('/projects/:id', ProjectController.delete);
routes.get('/projects', ProjectController.index);
routes.put('/projects/:id', ProjectController.update);

//STATUS

routes.post('/status', StatuController.store);
routes.get('/status', StatuController.index);

routes.post('/projectStatus', ProjectStatuController.store);

//PARTNERS

routes.post('/partners', PartnerController.store);
routes.put('/partners', PartnerController.update);

routes.post('/partners-projects', PartnerProjectController.store);
routes.get('/partners-projects', PartnerProjectController.index);

//MEMBERS

routes.post('/members', MemberController.store);
routes.get('/members/:id', MemberController.show);

//TASKS

routes.post('/tasks', TaskController.store);
routes.get('/tasks', TaskController.index);
routes.put('/tasks/:id', TaskController.update);
routes.get('/tasks/:id', TaskController.show);

routes.post('/tasksMember', TaskMemberController.store);

//CHECKLISTS

routes.post('/checklist', ChecklistController.store);
routes.get('/checklist/:id', ChecklistController.show);

//EXPENSES

routes.post('/expenses', ExpenseController.store);
routes.get('/expenses/:id', ExpenseController.show);

//EMMITERS

routes.post('/emmiters', EmmiterController.store);

//INVOICES

routes.post('/invoices', InvoiceController.store);

//DEVICE CATEGORIES

routes.post('/deviceCategory', DeviceCategoryController.store)
routes.get('/deviceCategory', DeviceCategoryController.show)
routes.delete('/deviceCategory', DeviceCategoryController.delete)

//DEVICES

routes.post('/device', DeviceController.store)
routes.get('/device', DeviceController.show)
routes.delete('/device', DeviceController.delete)

export default routes;