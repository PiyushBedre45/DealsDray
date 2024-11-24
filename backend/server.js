import express from 'express'
import cors from 'cors'
import employeeRouter from './routes/employee.routes.js'
import ConnectDatabase from './database/database.connection.js'
import adminRouter from './routes/admin.routes.js'


const app = express();
const PORT = 4000;

//middleware
app.use(express.json());
app.use(cors());

ConnectDatabase();

app.use('/api/employee', employeeRouter);
app.use('/api/admin', adminRouter);

//routes
app.get('/', (req, res) => {
    res.send("welcome to home page");
})

app.listen(PORT, () => {
    console.log("server is listening")
})