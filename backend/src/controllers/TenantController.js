//debugging 
import Tenant from "../models/Tenants.js";

export async function getAllTenants(req,res) {
    try {
        const tenant = await Tenant.find();
        res.status(200).json(tenant);
    } catch (error) {
        res.status(500).json({ error: "Server error", details: error.message });
    }
}

export async function getOneTenant(req,res){
    try {
        const tenant = await Tenant.findById(req.params.id)
        if(!tenant) return res.status(404).json({message:"tenant not Found !"})
            res.json(tenant)
        } catch (error) {
        console.error("Error in getoneTenant controller", error);
        res.status(500).json({message:"INTERNAL SERVER ERROR"}) 
    }
}

export async function createTenant(req,res) {
    try {
        const {firstName,lastName,unitNumber,email,phoneNumber} = req.body // 
        const newTenant = new Tenant({firstName,lastName,unitNumber,email,phoneNumber})
        await newTenant.save()          // used in mongoose to update the database 
        res.status(201).json({newTenant})
    } catch (error) {
        if( error.name === "ValidationError"){
            return res.status(400).json({error: "Missing or invalid fields", details: error.message});
        }
        res.status(500).json({ error: "Server error", details: error.message });
    }
}

export async function updateTenant(req,res) {
   try {
    const {firstName,lastName,unitNumber,email,phoneNumber} = req.body;
    const updatedTenant = await Tenant.findByIdAndUpdate(req.params.id,{firstName,lastName,unitNumber,email,phoneNumber},
        { new: true }
    )

    res.status(200).json({
        message: "Tenant info updated successfully",
        updatedTenant
      });
   } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
   }
}

export async function deleteTenant(req,res) {
    try { 
        // no need for destructuring 
        const deletedTenant = await Tenant.findByIdAndDelete(req.params.id)
        // if(!deletedTenant) return res.status(500).json({message:" not found !"})
            res.status(200).json({
                message: "Tenant info deleted successfully",
                deletedTenant // 
              });
       } catch (error) {
        res.status(500).json({ error: "Server error", details: error.message });
       }
}


