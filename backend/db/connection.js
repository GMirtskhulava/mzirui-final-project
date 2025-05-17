import mongoose from 'mongoose'

const connectDB = (url, dbname) => {
    return mongoose.connect(url, {dbName: dbname})
        .then(() => console.log('Successfully connected to MongoDB'))
        .catch((err) => console.log('MongoDB connection error: ' + err))
}

export default connectDB