import mongoose from 'mongoose';

// use the correct environment variable name as specified in your .env file
const productionDbUri = process.env.PRO_MONGO_URI as string | undefined;

// default to an empty string if the URI is not provided
const dbUrl = productionDbUri || '';

const connectDB = async (): Promise<void> => {
    const options: mongoose.ConnectOptions = {
        socketTimeoutMS: 30000,
        maxPoolSize: 50,
        autoIndex: false, // Don't build indexes
        serverSelectionTimeoutMS: 20000, // Timeout after 20 seconds
    };

    try {
        const conn = await mongoose.connect(dbUrl, options);
        console.log(`Database connected with host: ${conn.connection.host}`);
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(`Database connection error: ${error.message}`);
        } else {
            console.error(`An unexpected error occurred: ${String(error)}`);
        }
        setTimeout(connectDB, 5000);
    }
}

export default connectDB;
