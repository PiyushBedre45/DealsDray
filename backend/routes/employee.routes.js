import { addEmployee, editEmployee, deleteEmployee, fetchEmployee } from '../controllers/employeecontroller.js';
import express from 'express'
import authMiddleWare from '../middlewares/auth.middle.js';

const employeeRouter = express.Router();

employeeRouter.get('/fetch', fetchEmployee);
employeeRouter.post('/add', addEmployee);
employeeRouter.put('/edit/:id', editEmployee);
employeeRouter.delete('/delete/:id',deleteEmployee);

export default employeeRouter;