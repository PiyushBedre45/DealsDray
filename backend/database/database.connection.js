import mongoose from 'mongoose'

const ConnectDatabase = async () => {
    try {
        await mongoose.connect('mongodb+srv://omkarnilawar9:Omkar999@cluster1.qeq0e.mongodb.net/');
        console.log('MongoDB Connected');
    } catch (error) {
        console.log('MongoDB connection error:', error);
    }
}

export default ConnectDatabase;