import express, { Express, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import authRouter from "./api/auth";
import bodyParser from "body-parser";
import cors from "cors";
import mongooseConnection from "./config/mongoDB";

dotenv.config();
const app: Express = express();
const port = process.env.PORT || 5002;
mongooseConnection
  .then(() =>
    console.log("Connection to mongoose database established successfully")
  )
  .catch((err) => console.log(err)); //connect to mongoDB
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json()); //parses the body of the request and adds the result to the req.body.

app.use("/api/auth", authRouter); //use authentication route

//Error-handling middleware.
//Should be the last after routes calls and other middlewares.

app
  .listen(port, () => {
    console.log(`Server started on port ${port}`);
  })
  .on("error", (err) => {
    console.log("An error was encountered", err);
  });
