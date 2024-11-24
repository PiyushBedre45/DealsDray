import employeeModel from '../models/employee.model.js';
import validator from 'validator';


const addEmployee = async (req, res) => {
    const { name, email, mobile, designation, gender, course, image } = req.body;

    try {

        const existingEmployee = await employeeModel.findOne({ email });

        if (!validator.isEmail(email)) {
            return res.status(400).json({ status: false, message: "Invalid email format" });
        }

        if (existingEmployee) {
            return res.status(400).json({ status: false, message: "Employee with this email already exists" });
        }


        const newEmployee = new employeeModel({
            name,
            email,
            mobile,
            designation,
            gender,
            course,
            image
        });


        await newEmployee.save();
        res.status(201).json({ status: true, message: "Employee added successfully", data: newEmployee });
    } catch (error) {
        res.status(500).json({ status: false, message: "Failed to add employee", error: error.message });
    }
};

const editEmployee = async (req, res) => {
    const { id } = req.params;
    console.log("Employee ID:", id);
    console.log("Request Body:", req.body);

    try {
        const updatedEmployee = await employeeModel.findByIdAndUpdate(
            id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedEmployee) {
            return res.status(404).json({ status: false, message: "Employee not found" });
        }
        res.status(200).json({ status: true, message: "Employee updated successfully", data: updatedEmployee });
    } catch (error) {
        console.error("Error in editEmployee:", error);
        res.status(500).json({ status: false, message: "Failed to update employee", error: error.message });
    }
};



const deleteEmployee = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedEmployee = await employeeModel.findByIdAndDelete(id);

        if (!deletedEmployee) {
            return res.status(404).json({ status: false, message: "Employee not found" });
        }

        console.log("Deleted employee:", deletedEmployee);

        res.status(200).json({ status: true, message: "Employee deleted successfully" });
    } catch (error) {
        console.log("Error deleting employee:", error); // Log the error
        res.status(500).json({ status: false, message: "Failed to delete employeesing", error: error.message });
    }
};

const fetchEmployee = async (req, res) => {
    try {
        const employees = await employeeModel.find({});
        res.json({ success: true, data: employees })
    } catch (error) {
        console.log("employee fetch error found", error)
        res.json({ success: false, message: "error found while employeeList fetch" })
    }
}

export { addEmployee, editEmployee, deleteEmployee, fetchEmployee };
