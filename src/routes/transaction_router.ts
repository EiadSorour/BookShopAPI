import express,{ Router } from "express";

import transactionController from "../controllers/transaction_controller";

const router:Router = express.Router();

router.route("/:quantity")
    .post(transactionController.buyBook)

export default router;