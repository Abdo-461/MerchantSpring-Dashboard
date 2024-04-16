import express, { Request, Response } from "express";

import cors from "cors";
import { getUser } from "./user";
import { getPendingOrders, getStores } from "./orders"

const app = express();
const port = 8080;

app.use(cors());
app.get("/user", getUser);

app.get("/orders/pending", (req, res) => {
  
  const pendingOrders = getPendingOrders();
  res.send(JSON.stringify(pendingOrders));
});

app.get('/stores', (req, res) => {
  const stores = getStores();
  res.send(JSON.stringify(stores));
});

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
