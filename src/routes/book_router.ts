import express,{Router} from "express";

import bookController from "../controllers/book_controller";

const router:Router = express.Router();

router.route("/")
    .get(bookController.getAllBooks)
    .post(bookController.addBook)

router.route("/:bookID")
    .get(bookController.getBook)
    .delete(bookController.deleteBook)
    .patch(bookController.updateBook)

export default router;