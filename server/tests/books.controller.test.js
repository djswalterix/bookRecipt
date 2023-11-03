const { expect } = require("chai");
const sinon = require("sinon"); // Used for mocking dependencies
const {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
} = require("../controllers/books.controller"); // Replace with the correct path to your code file
const testDb = require("../config/dbtest"); // Import the test database connection
const Book = require("../models/books.model"); // Make sure the path is correct

before(async () => {
  // Delete all records from the Book table
  await Book.destroy({ where: {} });
});
describe("createBook", () => {
  it("should create a new book successfully", async () => {
    // Simulate input data
    const req = {
      body: {
        name: "John",
        image_path: "Doe",
        description: "jn@.doexample.com",
        free: "true",
      },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };

    // Call the createBook function
    await createBook(req, res);

    // Ensure that the status function was called with a status code of 201
    expect(res.status.calledWith(201)).to.be.true;

    // Ensure that the json function was called with the data of the new book
    expect(
      res.json.calledWith(
        sinon.match({
          name: req.body.name,
          surname: req.body.surname,
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

    // Call the createBook function with a generic error

    await createBook(req, res);

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
describe("getAllBooks", () => {
  it("should return all books", async () => {
    // Create a test book
    await Book.create({
      name: "Johsdfn",
      image_path: "Ddsvoe",
      description: "jn@dvsvd.doexample.com",
      free: "true",
    });
    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await getAllBooks(req, res);
    // Ensure that the status function was called with a status code of 200
    expect(res.status.calledWith(200)).to.be.true;

    // Expect that the json function was called with an array of books
    expect(res.json.calledWith(sinon.match.array)).to.be.true;
  });
});
describe("getBookById", () => {
  it("should return 1 book", async () => {
    // Create a test book
    let booktest = await Book.create({
      name: "ffJohn",
      image_path: "Doeff",
      description: "jn@.doffexample.com",
      free: "false",
    });
    const req = {
      params: {
        id: booktest.id,
      },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await getBookById(req, res);
    // Ensure that the status function was called with a status code of 200
    expect(res.status.calledWith(200)).to.be.true;
    const returnedBook = res.json.getCall(0).args[0];

    //ensure is the same book we created before
    expect(returnedBook.name).to.equal(booktest.name);
    expect(returnedBook.image_path).to.equal(booktest.image_path);
    expect(returnedBook.description).to.equal(booktest.description);
  });
});

describe("updateBook", () => {
  it("should update a an book successfully", async () => {
    let booktest = await Book.create({
      name: "Johndfsf",
      image_path: "Ddfsdfoe",
      description: "jn@fdsf.doexample.com",
      free: "true",
    });
    // Simulate input data
    const req = {
      params: {
        id: booktest.id,
      },
      body: {
        name: "NameUpdated",
        description: "DescupdUpdated",
        free: "false",
      },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };

    // Call the updateBook function
    const updBook = await updateBook(req, res);

    // Ensure that the status function was called with a status code of 200
    expect(res.status.calledWith(200)).to.be.true;
    console.log(req.body);

    // Ensure that the json function was called with the data of the upd book
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

describe("deleteBook", () => {
  it("should create a new book successfully", async () => {
    let booktest = await Book.create({
      name: "Johndfsf",
      image_path: "Ddfsdfoe",
      description: "jn@fdsf.doexample.com",
      free: "true",
    });
    // Simulate input data
    const req = {
      params: {
        id: booktest.id,
      },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };

    // Call the updateBook function
    await deleteBook(req, res);

    // Ensure that the status function was called with a status code of 200
    expect(res.status.calledWith(200)).to.be.true;
    const foundBook = await Book.findByPk(booktest.id);

    // Ensure that the json function was called with the data of the upd book
    expect(
      res.json.calledWith(
        sinon.match({
          name: booktest.name,
          description: booktest.description,
          id: booktest.id,
        })
      )
    ).to.be.true;

    //ensure the book don't exist more
    expect(foundBook).to.be.null;
  });
});
