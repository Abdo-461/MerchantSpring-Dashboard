import express, { Request, Response } from "express";

import cors from "cors";
import { getUser } from "./user";
import { getPendingOrders, getStores } from "./orders"

const app = express();
const port = 8080;

app.use(cors());
app.get("/user", getUser);

app.get("/orders/pending", async (req, res) => {
  
  const pendingOrders = await getPendingOrders();
  return res.send(pendingOrders);
});

app.get('/stores', async (req, res) => {
  const stores = await getStores();
  return res.send(stores);
});



app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
