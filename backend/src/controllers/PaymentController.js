import Payment from "../models/Payments.js";

export async function getAllPayments(req,res) {
    try {
        const payment = await Payment.find();
        res.status(200).json(payment);
    } catch (error) {
        res.status(500).json({ error: "Server error", details: error.message });
    }
}


export async function getOnePayment(req,res){

    try {
        const payment = await Payment.findById(req.params.id)
        if(!payment) return res.status(404).json({message:"Payment not Found !"})
            res.json(payment)
        } catch (error) {
        console.error("Error  in getonePayment controller", error);
        res.status(500).json({message:"INTERNAL SERVER ERROR"}) 
    }
}

export async function createPayment(req,res) {
    try {
        const {tenantName,amount,datePaid,status} = req.body // 
        const newPayment = new Payment({tenantName,amount,datePaid,status})
        await newPayment.save()          // used in mongoose to update the database 
        res.status(201).json({message:"Payment created succesfully",newPayment});
    } catch (error) {
        if( error.name === "ValidationError"){
            return res.status(400).json({error: "Missing or invalid fields", details: error.message});
        }
        res.status(500).json({ error: "Server error", details: error.message });
    }
};

export async function updatePayment(req,res) {
    try {
        const {tenantName,amount,status,datePaid} = req.body;
        const updatedPayment = await Payment.findByIdAndUpdate(req.params.id,{tenantName,amount,status,datePaid},
            { new: true }
        )
        res.status(200).json({
            message: "Payment info updated successfully",
            updatedPayment
          });
       } catch (error) {
        res.status(500).json({ error: "Server error", details: error.message });
       }
};

export async function deletePayment(req,res){

    try {
        // no need for destructuting 
        const deletedPayment = await Payment.findByIdAndDelete(req.params.id,{tenantName,amount,status,datePaid})
        res.status(200).json({
            message: "Payment info deleted successfully",
            deletedPayment
          });
        
    } catch (error) {
        res.status(500).json({ error: "Server error", details: error.message });
    }
};


export async function getTotalPayments(req,res){

    try{
        const result = await Payment.aggregate([
            { $group: {_id :null, total : {$sum :"$amount"}}} 
        ]);
        const totalPayment = result[0]?.total || 0 ;
        res.status(200).json({totalPayment});
    }
    catch(error){
        console.error("Error calculating total payments:", error);
        res.status(500).json({ error: "Failed to calculate total payments" });
    }
};


export async function getTotalByTenant(req, res) {
    try {
      const result = await Payment.aggregate([
        {

          $group: {
            _id: "$tenantName",      // group by tenantName field
            total: { $sum: "$amount" } // sum the amounts for each tenant
          }
        }
      ]);
      res.status(200).json(result); // this will return an array of { _id: "TenantName", total: number }
    } catch (error) {
      console.error("Error calculating total payments:", error);
      res.status(500).json({ error: "Failed to calculate total payments" });
    }
  }