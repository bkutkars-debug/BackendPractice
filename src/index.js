import "dotenv/config";
import connectDB from "./db/index.js";
import { app } from "./app.js";

await connectDB();

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running at port: ${port}`);
});
