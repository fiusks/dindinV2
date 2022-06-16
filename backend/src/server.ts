import * as dotenv from 'dotenv'
import express from "express";
import cors from "cors"
import routes from './router/routes'

const app = express();

dotenv.config()

app.use(cors());

app.use(express.json());

app.use(routes);



export default app;
