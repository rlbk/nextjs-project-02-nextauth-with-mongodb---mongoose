import mongoose from "mongoose";

export async function connectDB() {
  try {
    mongoose.connect(`${process.env.MONGO_URL}`);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MongoDB connected.");
    });

    connection.on("error", (error) => {
      console.log("Error in connecting to DB");
      console.log(error);
      process.exit();
    });
  } catch (error) {
    console.log("Something went wrong in connecting to DB");
    console.log(error);
  }
}
