import "reflect-metadata";
import "express-async-errors";
import express from "express";
import userRoutes from "./routes/users.routes";
import sessionRoutes from "./routes/sessions.routes";
import categoriesRoutes from "./routes/categories.routes";
import schedulesRouter from "./routes/schedules.routes";
import handleErrorMiddleware from "./middlewares/handleErrors.middleware";
import propertiesRoutes from "./routes/properties.routes";

const app = express();
app.use(express.json());
app.use("/users", userRoutes);
app.use("/login", sessionRoutes);
app.use("/categories", categoriesRoutes);
app.use("/schedules", schedulesRouter);
app.use("/properties", propertiesRoutes);

app.use(handleErrorMiddleware);


export default app