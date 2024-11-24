import mongoose from 'mongoose'

const employeeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    mobile: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    course: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
}, { Timestamp: true });

const employeeModel = mongoose.models.employee || mongoose.model('employee', employeeSchema);
export default employeeModel;
