import mongoose, { Schema } from "mongoose";

// 1 - create a schema 
// 2 - model based off of that schema 

const tenantSchema = new mongoose.Schema({
    firstName:{ 
        type:String,
        required: true  
    },
    lastName:{ 
        type:String,
        required: true  
    },
    unitNumber:{
        type:Number,
        required:true 
    },
    email:{type:String},
    phoneNumber:{type:String, required:true},
    
},{ timestamps:true });

const Tenant = mongoose.model("Tenant", tenantSchema); 

export default Tenant;