const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orders.controller");
const { verifyToken } = require("../auth/authMiddleware");
// Route for creating a new order
router.post("/", verifyToken, orderController.createOrder);

// Route for getting all orders
router.get("/", verifyToken, orderController.getAllOrders);

// Route for getting a order by id
router.get("/:id", verifyToken, orderController.getOrderById);
// Route for updating a order by id
router.put("/:id", verifyToken, orderController.updateOrder);

// Route for deleting a order by id
router.delete("/:id", verifyToken, orderController.deleteOrder);

module.exports = router;
