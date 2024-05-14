import { Router } from "express";
import * as cartController from "../controllers/cartController.js";
import passport from "passport";

const cartRouter = Router();
cartRouter.post("/", cartController.createCart);
//get cart by id
cartRouter.get("/:cid", cartController.getCart);
//Add or update a product in the cart

cartRouter.post(
  "/:cid/:pid",
  passport.authenticate("jwt", { session: false }),
  cartController.insertProductCart
);

cartRouter.post("/:cid/purchase", cartController.createTicket);

export default cartRouter;
