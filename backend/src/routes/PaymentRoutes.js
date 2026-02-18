/*
PAYMENT ROUTES : handle all API requests for the payments 
*/
import { createPayment,getAllPayments, updatePayment , deletePayment , getOnePayment , getTotalPayments , getTotalByTenant } from "../controllers/PaymentController.js";
import express from "express"
const router  = express.Router();


router.get('/total',getTotalPayments)
router.get('/total/:tenantName', getTotalByTenant);

router.get('/',getAllPayments)
router.get('/:id',getOnePayment)
router.post('/',createPayment)
router.put('/:id',updatePayment)
router.delete('/:id', deletePayment)

export default router;