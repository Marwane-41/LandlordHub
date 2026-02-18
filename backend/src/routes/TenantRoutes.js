import { createTenant, deleteTenant, getAllTenants, updateTenant, getOneTenant } from "../controllers/TenantController.js";
import express from "express"
const router  = express.Router();

// debugging purposes : 

router.get('/', getAllTenants)
router.get('/:id', getOneTenant)
router.post('/', createTenant)
router.put('/:id', updateTenant)
router.delete('/:id',deleteTenant)


export default router;