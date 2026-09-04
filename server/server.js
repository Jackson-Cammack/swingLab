import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import golferRoutes from "./routes/golferRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("SwingLab server is running");
});

app.get("/api/health", (req, res) => {
  res.status(200).json({
    message: "SwingLab API is running",
  });
});

app.use("/api/golfers", golferRoutes);

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

startServer();