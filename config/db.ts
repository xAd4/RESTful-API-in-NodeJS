import mongoose from "mongoose";

// Conexión a la base de datos
export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      process.env.MONGO_URL || "your_default_mongo_url",
      {}
    );
    console.log(`MongoDB connect ${conn.connection.host}`);
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error ${error.message}`);
    } else {
      console.error("An unknown error occurred");
    }
    process.exit(1);
  }
};
