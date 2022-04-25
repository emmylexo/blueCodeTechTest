import express from "express";
import Routes from "./app/routes";
import Middleware from "./app/routes/middleware";
import { devLog } from "./app/utils";
import { connectDb } from './app/utils/db';

const app = express();

Middleware(app);
Routes(app);

(async () => {
    await connectDb();

    app.listen(process.env.PORT, () => devLog(`App connected on port ${process.env.PORT}`))
})();