import express from "express";
import {
  findOrCreateCart,
  getCartById,
  updateCartTotal,
} from "@/service/cartService";
import {
  addItemToCart,
  removeItemFromCart,
  updateCartItemQuantity,
} from "@/service/cartItemService";

const router = express.Router();

//
// 🧾 Get or Create User Cart
//
router.get("/:userId", async (req, res) => {
  try {
    const cart = await findOrCreateCart(req.params.userId);
    res.json(cart);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

//
// ➕ Add Item to Cart
//
router.post("/:cartId/add", async (req, res) => {
  try {
    const { bookId, quantity, price } = req.body;
    const cart = await addItemToCart(
      req.params.cartId,
      bookId,
      quantity,
      price
    );
    res.json(cart);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

//
// ✏️ Update Item Quantity
//
router.patch("/item/:itemId", async (req, res) => {
  try {
    const { quantity } = req.body;
    const updatedItem = await updateCartItemQuantity(
      req.params.itemId,
      quantity
    );
    res.json(updatedItem);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

//
// ❌ Remove Item from Cart
//
router.delete("/:cartId/remove/:itemId", async (req, res) => {
  try {
    const cart = await removeItemFromCart(req.params.cartId, req.params.itemId);
    res.json(cart);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

export default router;