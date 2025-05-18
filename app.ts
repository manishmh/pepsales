import express from "express";
import NotificationRouter from "./routes/notification";

const app = express();
app.use(express.json());

// routers
app.use(NotificationRouter)

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
