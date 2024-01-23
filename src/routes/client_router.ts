import express,{Router} from "express";

import clientController from "../controllers/client_controller";

const router:Router = express.Router();

router.route("/")
    .get(clientController.getAllClients)
    .post(clientController.addClient);

router.route("/:clientID")
    .get(clientController.getClient)
    .patch(clientController.updateClient)
    .delete(clientController.deleteClient)

export default router;