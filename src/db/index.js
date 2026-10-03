import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    const mongoUrl = process.env.MONGODB_URL;
    if (!mongoUrl) {
      throw new Error("MONGODB_URL is not set in the environment.");
    }

    const credentials = mongoUrl.match(
      /^mongodb(?:\+srv)?:\/\/([^:/@]+):([^@]+)@/i
    );
    if (
      credentials &&
      credentials
        .slice(1)
        .some((value) =>
          /^(?:<[^>]+>|(?:your[-_ ]?)?(?:username|password|user|pass))$/i.test(
            decodeURIComponent(value)
          )
        )
    ) {
      throw new Error(
        "MONGODB_URL still contains a username or password placeholder. Replace it with your Atlas database user's credentials in .env."
      );
    }

    const connectionInstance = await mongoose.connect(mongoUrl, {
      dbName: DB_NAME,
    });

    console.log(`MONGODB connected: ${connectionInstance.connection.host}`);
  } catch (error) {
    console.error("MONGODB connection error:", error);
    process.exit(1);
  }
};

export default connectDB;
