import mongoose from 'mongoose';

export const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_CNN);

    console.log('DB online')

  } catch (error) {
    console.log(error)
    throw new Error('Error, couldn\'t connect to database' )
  }
}