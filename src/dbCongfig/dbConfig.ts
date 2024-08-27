import mongoose from "mongoose";

export default async function connect() {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    const connection = mongoose.connection;

    connection.on("connected", () => {});

    connection.on("error", (error) => {
      console.error("Failed to connect to MongoDB", error);
      process.exit();
    });
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
  }
}
