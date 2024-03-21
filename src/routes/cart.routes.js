import { Router } from "express";
import cartModel from "../models/cart.js";

const cartRouter = Router()

cartRouter.post('/', async (req, res)=> {
    try {
        const mensaje = await cartModel.create({products: []})
        res.status(201).send(mensaje)
    }catch(e) {
        res.status(500).send(`Error interno del servidor al crear carrito ${e}`)
    }
})

cartRouter.get('/:cid', async (req, res) => {

    try {
        const cartId = req.params.cid
        const cart = await cartModel.findOne({ _id: cartId }).populate('products.id_prod')
        res.status(200).send(cart)
    } catch (error) {
        console.log(error)
        res.status(500).send(`Error interno del servidor al consultar${error}`)
    }
})

cartRouter.post("/:cid/:pid", async (req, res) => {
    try {
      const cartId = req.params.cid;
      const productId = req.params.pid;
      let { quantity } = req.body;
  
      if (quantity === undefined) {
        quantity = 1;
      }
  
      const updatedCart = await cartModel.findOneAndUpdate(
        { _id: cartId, "products.id_prod": productId },
        { $inc: { "products.$.quantity": quantity } },
        { new: true }
      );
  
      if (!updatedCart) {
        const cart = await cartModel.findByIdAndUpdate(
          cartId,
          { $push: { products: { id_prod: productId, quantity: quantity } } },
          { new: true }
        );
        res.status(200).send(cart);
      } else {
        res.status(200).send(updatedCart);
      }
    } catch (error) {
      res
        .status(500)
        .send(`internal error: ${error}`);
    }
  });

  //DELETE
  cartRouter.delete("/:cid/products/:pid", async (req, res) => {
    try {
      const cartId = req.params.cid;
      const productId = req.params.pid;
  
      const updatedCart = await cartModel.findOneAndUpdate(
        { _id: cartId },
        { $pull: { products: { id_prod: productId } } },
        { new: true } 
      );
  
      if (updatedCart) {
        res.status(200).send(updatedCart);
      } else {
        res.status(404).send("Cart not found");
      }
    } catch (error) {
      res
        .status(500)
        .send(`internal error when deleting product from cart: ${error}`);
    }
  });

  //PUT

  cartRouter.put("/:cid", async (req, res) => {
    try {
      const cartId = req.params.cid;
      const newProducts = req.body;
      const updatedCart = await cartModel.findOneAndUpdate(
        { _id: cartId },
        { $push: { products: {$each: newProducts} } },
        { new: true }
      );
      if (!updatedCart) {
        return res.status(404).send("Cart not found");
      }
  
      res.status(200).send(updatedCart);
    } catch (error) {
      res
        .status(500)
        .send(`Error interno al querer agregar producto: ${error}`);
    }
  });

  //PUT
  cartRouter.put("/:cid/products/:pid", async (req, res) => {
    try {
      const cartId = req.params.cid;
      const productId = req.params.pid;
      const { quantity } = req.body;
  
      if (isNaN(quantity) || quantity < 0) {
        return res.status(400).send("Invalid quantity");
      }
  
      const updatedCart = await cartModel.findOneAndUpdate(
        { _id: cartId, "products.id_prod": productId },
        { $set: { "products.$.quantity": quantity } },
        { new: true }
      );
  
      if (!updatedCart) {
        return res.status(404).send("Carrito o producto no encontrado");
      }
  
      res.status(200).send(updatedCart);
    } catch (error) {
      res.status(500).send(`Internal error : ${error}`);
    }
  });

  //DELETE

  cartRouter.delete("/:cid", async (req, res) => {
    try {
      const cartId = req.params.cid;
  
      const updatedCart = await cartModel.findByIdAndUpdate(
        cartId,
        { products: [] },
        { new: true }
      );
  
      if (!updatedCart) {
        return res.status(404).send("Carrito no encontrado");
      }
  
      res.status(200).send("Eliminado!");
    } catch (error) {
      res.status(500).send(`Internal error : ${error}`);
    }
  });

export default cartRouter
