/*
What's this file for ???
setting up an express server  
*/
import express from "express"          // go to package.json , add a type : "module" for this to work , ES module
import PaymentRoutes from "./routes/PaymentRoutes.js"
import TenantRoutes from "./routes/TenantRoutes.js"
import dotenv from "dotenv"
import { connectDb } from "../config/db.js"

import cors from "cors";




// this is how to initialize an express app 
const app = express()

app.use(cors());

dotenv.config(); // ; is required 

//middleware // to display values 
app.use(express.json());    // this will parse .json body : req/res

app.use('/api/payments', PaymentRoutes)   // payments page : /api/payments 
app.use('/api/tenants', TenantRoutes)   // tenants page : /api/tenants 

// app is listening on port 5001 
connectDb().then(() => {
  app.listen(5001, () => {
    console.log("Server started successfully")  // for debugging purposes 
  });

});