import express, { Request, Response } from "express";

import cors from "cors";
import { getUser } from "./user";
import { getPendingOrders, getStores } from "./orders"

const app = express();
const port = 8080;

app.use(cors());
app.get("/user", getUser);

app.get("/sales", (req, res) => {
  
  console.log(getPendingOrders());
  console.log(getStores());

});

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
