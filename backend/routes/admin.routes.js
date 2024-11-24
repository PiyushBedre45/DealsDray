import loginAdmin from '../controllers/admin.controller.js'
import express from 'express'

const adminRouter = express.Router();

adminRouter.post('/login', loginAdmin);

export default adminRouter;