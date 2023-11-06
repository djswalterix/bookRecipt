const Order = require("../models/orders.model"); // Import Order Model
const { Sequelize } = require("sequelize");

exports.createOrder = async (req, res) => {
  try {
    // Read data from order input (req.body)

    const { UserId, BookId, invoice } = req.body;
    console.log("UserId" + UserId);
    console.log("BookId" + BookId);

    // Create a new order in the database
    const newOrder = await Order.create({
      UserId,
      BookId,
      invoice,
    });

    res.status(201).json(newOrder);
  } catch (error) {
    handleErrors(error, res);
  }
};
// Function to get all orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll();
    res.status(200).json(orders);
  } catch (error) {
    handleErrors(error, res);
  }
};

// Function to get a order by id
exports.getOrderById = async (req, res) => {
  console.log("r!!!!!!!!!!!!!!!!!eq.body:", req.params);
  console.log("find by id");
  try {
    const { id } = req.params;
    const order = await Order.findByPk(id);

    if (!order) {
      return res.status(404).json({ error: "Order not found." });
    }

    res.status(200).json(order);
  } catch (error) {
    handleErrors(error, res);
  }
};
// Function to update a order by id
exports.updateOrder = async (req, res) => {
  try {
    const idToUpdate = req.params.id;
    const updates = req.body;
    const order = await Order.findByPk(idToUpdate);

    if (!order) {
      return res.status(404).json({ error: "Order not found." });
    }

    // update
    if (updates.userId) {
      order.userId = updates.userId;
    }
    if (updates.bookId) {
      order.suruserId = updates.suruserId;
    }
    if (updates.invoiceData) {
      order.invoiceData = updates.invoiceData;
    }

    // Save
    const updatedOrder = await order.save();
    res.status(200).json(updatedOrder);
  } catch (error) {
    handleErrors(error, res);
  }
};
// Function to delete a order by id
exports.deleteOrder = async (req, res) => {
  try {
    //console.log(req.params.id);
    const order = await Order.findByPk(req.params.id);
    if (!order) {
      return res.status(404).json({ error: "Order not found." });
    }
    const deletedOrder = await order.destroy();
    res.status(200).json(deletedOrder);
  } catch (error) {
    handleErrors(error, res);
  }
};
// Centralized error handling function
const handleErrors = (error, res) => {
  if (error instanceof Sequelize.UniqueConstraintError) {
    res.status(400).json({ error: "Order with this id  already exists." });
  } else {
    console.error(error);
    res.status(500).json({ error: "Error while processing the request." });
  }
};
