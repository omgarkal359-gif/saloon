import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // Set connection timeout to 3 seconds so it doesn't hang forever
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 3000
    });
    global.isMockDB = false;
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    global.isMockDB = true;
    console.log('\n================================================================');
    console.log('WARNING: Local MongoDB is NOT running or unreachable.');
    console.log('The backend has gracefully switched to MOCK (File-Based) DATABASE MODE.');
    console.log('Appointments will be read/written to backend/mock_appointments.json.');
    console.log('================================================================\n');
  }
};

export default connectDB;
