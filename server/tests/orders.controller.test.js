const { expect } = require("chai");
const sinon = require("sinon"); // Used for mocking dependencies
const {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
} = require("../controllers/orders.controller"); // Replace with the correct path to your code file
//const testDb = require("../config/dbtest"); // Import the test database connection
const Order = require("../models/orders.model"); // Make sure the path is correct
const User = require("../models/users.model"); // Make sure the path is correct
const Book = require("../models/books.model"); // Make sure the path is correct

before(async () => {
  // Delete all records from the Order table
  await Order.destroy({ where: {} });
  //process.env.NODE_ENV = "test";
});
describe("createOrder", () => {
  it("should create a new order successfully", async () => {
    let bo = await Book.create({
      name: "Johndssfsf",
      image_path: "Ddfsdfoe",
      description: "jn@fdsf.doexample.com",
      free: "true",
    });
    let us = await User.create({
      name: "Test",
      surname: "User",
      email: "teste.user@example.com",
      password_hash: "testpassword",
    });

    // Simulate input data
    const req = {
      body: {
        UserId: us.id,
        BookId: bo.id,
        invoice: {
          invoiceNumber: "INV2023-001",
          invoiceDate: "2023-11-03",
          dueDate: "2023-11-30",
          customerName: "John Doe",
          customerEmail: "john.doe@example.com",
          items: [
            {
              description: "Prodotto A",
              quantity: 2,
              unitPrice: 20.0,
            },
            {
              description: "Prodotto B",
              quantity: 3,
              unitPrice: 15.0,
            },
            {
              description: "Prodotto C",
              quantity: 1,
              unitPrice: 30.0,
            },
          ],
          subtotal: 120.0,
          taxRate: 0.2,
          taxAmount: 24.0,
          total: 144.0,
        },
      },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };

    // Call the createOrder function
    await createOrder(req, res);

    // Ensure that the status function was called with a status code of 201
    expect(res.status.calledWith(201)).to.be.true;

    // Ensure that the json function was called with the data of the new order
    expect(
      res.json.calledWith(
        sinon.match({
          UserId: us.id,
          BookId: bo.id,
        })
      )
    ).to.be.true;
  });

  it("should handle other errors", async () => {
    // Simulate a generic error
    const req = {
      body: {
        cacao: "fs",
      },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    // Call the createOrder function with a generic error

    await createOrder(req, res);

    // Ensure that the status function was called with a status code of 500
    expect(res.status.calledWith(500)).to.be.true;

    // Ensure that the json function was called with the correct error message
    expect(
      res.json.calledWith(
        sinon.match({ error: "Error while processing the request." })
      )
    ).to.be.true;
  });
});
describe("getAllOrders", async () => {
  it("should return all orders", async () => {
    let bo = await Book.create({
      name: "getAllOrders",
      image_path: "Ddfssssssssdsetstfoe",
      description: "jn@ftdsf.doexample.com",
      free: "true",
    });
    let us = await User.create({
      name: "getAllOrders",
      surname: "User",
      email: "tessssssssteeeee.user@example.com",
      password_hash: "testpassword",
    });
    // Create a test order
    await Order.create({
      UserId: us.id,
      BookId: bo.id,
      invoice: {
        invoiceNumber: "getAllOrders",
        invoiceDate: "2023-11-03",
        dueDate: "2023-11-30",
        customerName: "John Doe",
        customerEmail: "john.doe@example.com",
        items: [
          {
            description: "Prodotto A",
            quantity: 2,
            unitPrice: 20.0,
          },
          {
            description: "Prodotto B",
            quantity: 3,
            unitPrice: 15.0,
          },
          {
            description: "Prodotto C",
            quantity: 1,
            unitPrice: 30.0,
          },
        ],
        subtotal: 120.0,
        taxRate: 0.2,
        taxAmount: 24.0,
        total: 144.0,
      },
    });
    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await getAllOrders(req, res);
    // Ensure that the status function was called with a status code of 200
    expect(res.status.calledWith(200)).to.be.true;

    // Expect that the json function was called with an array of orders
    expect(res.json.calledWith(sinon.match.array)).to.be.true;
  });
});
describe("getOrderById", async () => {
  it("should return 1 order", async () => {
    let us = await User.create({
      name: "getOrderById",
      surname: "User",
      email: "getOrderById.user@example.com",
      password_hash: "testpassword",
    });
    let bo = await Book.create({
      name: "getOrderById",
      image_path: "getOrderByIdsdsd",
      description: "jn@getOrderById.doexample.com",
      free: "true",
    });
    // Create a test order
    let ordertest = await Order.create({
      UserId: us.id,
      BookId: bo.id,
      invoice: {
        invoiceNumber: "getOrderById",
        invoiceDate: "2023-11-03",
        dueDate: "2023-11-30",
        customerName: "John Doe",
        customerEmail: "john.doe@example.com",
        items: [
          {
            description: "Prodotto A",
            quantity: 2,
            unitPrice: 20.0,
          },
          {
            description: "Prodotto B",
            quantity: 3,
            unitPrice: 15.0,
          },
          {
            description: "Prodotto C",
            quantity: 1,
            unitPrice: 30.0,
          },
        ],
        subtotal: 120.0,
        taxRate: 0.2,
        taxAmount: 24.0,
        total: 144.0,
      },
    });
    const req = {
      params: {
        id: ordertest.id,
      },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await getOrderById(req, res);
    // Ensure that the status function was called with a status code of 200
    expect(res.status.calledWith(200)).to.be.true;
    const returnedOrder = res.json.getCall(0).args[0];

    //ensure is the same order we created before
    expect(returnedOrder.name).to.equal(ordertest.name);
    expect(returnedOrder.image_path).to.equal(ordertest.image_path);
    expect(returnedOrder.description).to.equal(ordertest.description);
  });
});

describe("updateOrder", async () => {
  it("should update a an order successfully", async () => {
    // Create a test order
    let us = await User.create({
      name: "updateOrder",
      surname: "User",
      email: "updateOrder.user@example.com",
      password_hash: "testpassword",
    });
    let bo = await Book.create({
      name: "updateOrder",
      image_path: "updateOrder",
      description: "jn@updateOrder.doexample.com",
      free: "true",
    });
    // Create a test order
    let ordertest = await Order.create({
      UserId: us.id,
      BookId: bo.id,
      invoice: {
        invoiceNumber: "updateOrder-001",
        invoiceDate: "2023-11-03",
        dueDate: "2023-11-30",
        customerName: "John Doe",
        customerEmail: "johsn.doe@example.com",
        items: [
          {
            description: "Prodotto A",
            quantity: 2,
            unitPrice: 20.0,
          },
          {
            description: "Prodotto B",
            quantity: 3,
            unitPrice: 15.0,
          },
          {
            description: "Prodotto C",
            quantity: 1,
            unitPrice: 30.0,
          },
        ],
        subtotal: 120.0,
        taxRate: 0.2,
        taxAmount: 24.0,
        total: 144.0,
      },
    });
    // Simulate input data
    const req = {
      params: {
        id: ordertest.id,
      },
      body: {
        invoice: {
          invoiceNumber: "updateteeeeeeeeeeeeeeeeeeOrder-001",
          invoiceDate: "2023-11-03",
          dueDate: "2023-11-30",
          customerName: "John Doe",
          customerEmail: "johsn.doe@example.com",
          items: [
            {
              description: "Prodotto A",
              quantity: 2,
              unitPrice: 20.0,
            },
            {
              description: "Prodotto B",
              quantity: 3,
              unitPrice: 15.0,
            },
            {
              description: "Prodotto C",
              quantity: 1,
              unitPrice: 30.0,
            },
          ],
          subtotal: 120.0,
          taxRate: 0.2,
          taxAmount: 24.0,
          total: 144.0,
        },
      },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };

    // Call the updateOrder function
    const updOrder = await updateOrder(req, res);

    // Ensure that the status function was called with a status code of 200
    expect(res.status.calledWith(200)).to.be.true;
    console.log(req.body);

    // Ensure that the json function was called with the data of the upd order
    expect(
      res.json.calledWith(
        sinon.match({
          name: req.body.name,
          description: req.body.description,
        })
      )
    ).to.be.true;
  });
});

describe("deleteOrder", async () => {
  it("should create a new order successfully", async () => {
    // Create a test order
    let us = await User.create({
      name: "deleteOrder",
      surname: "User",
      email: "deleteOrder.user@example.com",
      password_hash: "testpassword",
    });

    let bo = await Book.create({
      name: "deleteOrder",
      image_path: "deleteOrder",
      description: "jndeleteOrder.doexample.com",
      free: true,
    });
    // Create a test order
    let ordertest = await Order.create({
      UserId: us.id,
      BookId: bo.id,
      invoice: {
        invoiceNumber: "deleteOrder-001",
        invoiceDate: "2023-11-03",
        dueDate: "2023-11-30",
        customerName: "John Doe",
        customerEmail: "johsn.doe@example.com",
        items: [
          {
            description: "Prodotto A",
            quantity: 2,
            unitPrice: 20.0,
          },
          {
            description: "Prodotto B",
            quantity: 3,
            unitPrice: 15.0,
          },
          {
            description: "Prodotto C",
            quantity: 1,
            unitPrice: 30.0,
          },
        ],
        subtotal: 120.0,
        taxRate: 0.2,
        taxAmount: 24.0,
        total: 144.0,
      },
    });
    // Simulate input data
    const req = {
      params: {
        id: ordertest.id,
      },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };

    // Call the updateOrder function
    await deleteOrder(req, res);

    // Ensure that the status function was called with a status code of 200
    expect(res.status.calledWith(200)).to.be.true;
    const foundOrder = await Order.findByPk(ordertest.id);

    // Ensure that the json function was called with the data of the upd order
    expect(
      res.json.calledWith(
        sinon.match({
          UserId: ordertest.UserId,
          OrderId: ordertest.OrderId,
        })
      )
    ).to.be.true;

    //ensure the order don't exist more
    expect(foundOrder).to.be.null;
  });
});
