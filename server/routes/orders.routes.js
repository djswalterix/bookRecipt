const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orders.controller");

// Route for creating a new order
router.post("/", orderController.createOrder);

// Route for getting all orders
router.get("/", orderController.getAllOrders);

// Route for getting a order by id
router.get("/:id", orderController.getOrderById);
// Route for updating a order by id
router.put("/:id", orderController.updateOrder);

// Route for deleting a order by id
router.delete("/:id", orderController.deleteOrder);

module.exports = router;
