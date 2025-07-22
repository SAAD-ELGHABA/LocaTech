import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/LocaTech", {
      useNewUrlParser: true,
      // useUnifiedTopology: true,
    });
    console.log("MongoDB Connected ");
  } catch (error) {
    console.error("MongoDB Connection Failed ", error);
    process.exit(1);
  }
};

// module.exports = connectDB;
