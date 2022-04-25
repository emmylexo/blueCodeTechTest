import mongoose from "mongoose";

export const connectDb = async () => {
  return await mongoose.connect(process.env.MONGO_DB_URL, {
    autoIndex: false,
  });
};

export const mongoClient = {
  startSession: async () => {
    const db = await connectDb();
    const session = await db.startSession();
    return session;
  }
}