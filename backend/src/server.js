/*
setting up an express server  
*/
import express from "express"          // go to package.json , add a type : "module" for this to work , ES module
import PaymentRoutes from "./routes/PaymentRoutes.js"
import TenantRoutes from "./routes/TenantRoutes.js"
import dotenv from "dotenv"
import { connectDb } from "../config/db.js"
import path from "path"
import cors from "cors";


// this is how to initialize an express app 
const app = express()
const port = process.env.PORT || 5001

// we need the frontend to run under the backend , so this is helpful 
const __dirname = path.resolve()



// to resolve the cors error 
app.use(cors());

dotenv.config(); // ; is required 

//middleware // to display values 
app.use(express.json());    // this will parse .json body : req/res

app.use('/api/payments', PaymentRoutes)   // payments page : /api/payments 
app.use('/api/tenants', TenantRoutes)   // tenants page : /api/tenants 

// only in production , do this 

  app.use(express.static(path.join(__dirname, "../frontend/dist")))
  app.use((req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });


// app is listening on port 5001 
connectDb().then(() => {
  app.listen(port, () => {
    console.log(`Server started successfully, running on ${port}`)  // for debugging purposes 
  });
});