const { expect } = require("chai");
const sinon = require("sinon"); // Used for mocking dependencies
const {
  createBookRecipe,
  getAllBookRecipes,
  getBookRecipeById,
  updateBookRecipe,
  deleteBookRecipe,
} = require("../controllers/booksRecipes.controller"); // Replace with the correct path to your code file
//const testDb = require("../config/dbtest"); // Import the test database connection
const BookRecipe = require("../models/booksRecipes.model"); // Make sure the path is correct
const Recipe = require("../models/recipes.model"); // Make sure the path is correct
const Book = require("../models/books.model"); // Make sure the path is correct

before(async () => {
  // Delete all records from the BookRecipe table
  await BookRecipe.destroy({ where: {} });
  //process.env.NODE_ENV = "test";
});
describe("createBookRecipe", () => {
  it("should create a new order successfully", async () => {
    let bo = await Book.create({
      name: "Johndssfsf",
      image_path: "Ddfsdfoe",
      description: "jn@fdsf.doexample.com",
      free: "true",
    });
    let rec = await Recipe.create({
      name: "Test",
      image_path: "Recipe",
      description: "teste.recipe@example.com",
      directions: "testpassword",
    });

    // Simulate input data
    const req = {
      body: {
        RecipeId: rec.id,
        BookId: bo.id,
      },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };

    // Call the createBookRecipe function
    await createBookRecipe(req, res);

    // Ensure that the statusfunction was called with a statuscode of 201
    expect(res.status.calledWith(201)).to.be.true;

    // Ensure that the json function was called with the data of the new order
    expect(
      res.json.calledWith(
        sinon.match({
          RecipeId: rec.id,
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

    // Call the createBookRecipe function with a generic error

    await createBookRecipe(req, res);

    // Ensure that the statusfunction was called with a statuscode of 500
    expect(res.status.calledWith(500)).to.be.true;

    // Ensure that the json function was called with the correct error message
    expect(
      res.json.calledWith(
        sinon.match({ error: "Error while processing the request." })
      )
    ).to.be.true;
  });
});
describe("getAllBookRecipes", async () => {
  it("should return all booksRecipes", async () => {
    let bo = await Book.create({
      name: "getAllBookRecipes",
      image_path: "Ddfssssssssdsetstfoe",
      description: "jn@ftdsf.doexample.com",
      free: "true",
    });
    let rec = await Recipe.create({
      name: "updateBookRecipe2",
      image_path: "updateBookRecipe2",
      description: "updateBookRecipe@example.com",
      directions: "updateBookRecipe2",
    });
    // Create a test order
    await BookRecipe.create({
      RecipeId: rec.id,
      BookId: bo.id,
    });
    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await getAllBookRecipes(req, res);
    // Ensure that the statusfunction was called with a statuscode of 200
    expect(res.status.calledWith(200)).to.be.true;

    // Expect that the json function was called with an array of booksRecipes
    expect(res.json.calledWith(sinon.match.array)).to.be.true;
  });
});
describe("getBookRecipeById", async () => {
  it("should return 1 order", async () => {
    let rec = await Recipe.create({
      name: "geBookRecipe2",
      image_path: "getBookRecipe2",
      description: "getBookRecipe@example.com",
      directions: "getBookRecipe2",
    });
    let bo = await Book.create({
      name: "getBookRecipeById",
      image_path: "getBookRecipeByIdsdsd",
      description: "jn@getBookRecipeById.doexample.com",
      free: "true",
    });
    // Create a test order
    let ordertest = await BookRecipe.create({
      RecipeId: rec.id,
      BookId: bo.id,
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
    await getBookRecipeById(req, res);
    // Ensure that the statusfunction was called with a statuscode of 200
    expect(res.status.calledWith(200)).to.be.true;
    const returnedBookRecipe = res.json.getCall(0).args[0];

    //ensure is the same order we created before
    expect(returnedBookRecipe.name).to.equal(ordertest.name);
    expect(returnedBookRecipe.image_path).to.equal(ordertest.image_path);
    expect(returnedBookRecipe.description).to.equal(ordertest.description);
  });
});

describe("updateBookRecipe", async () => {
  it("should update a an order successfully", async () => {
    // Create a test order
    let rec2 = await Recipe.create({
      name: "updBookRecipe2",
      image_path: "updgetBookRecipe2",
      description: "updgetBookRecipe@example.com",
      directions: "updgetBookRecipe2",
    });
    let rec = await Recipe.create({
      name: "updatedbfBookRecipe",
      image_path: "Recbdbipe",
      description: "upecbdfipe@example.com",
      directions: "testdbpassword",
    });
    let bo = await Book.create({
      name: "updateBookRecipe",
      image_path: "updateBookRecipe",
      description: "jn@updateBookRecipe.doexample.com",
      free: "true",
    });
    // Create a test order
    let ordertest = await BookRecipe.create({
      RecipeId: rec.id,
      BookId: bo.id,
    });
    // Simulate input data
    const req = {
      params: {
        id: ordertest.id,
      },
      body: {
        RecipeId: rec2.id,
      },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };

    // Call the updateBookRecipe function
    const updBookRecipe = await updateBookRecipe(req, res);

    // Ensure that the statusfunction was called with a statuscode of 200
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

describe("deleteBookRecipe", async () => {
  it("should create a new order successfully", async () => {
    // Create a test order
    let rec = await Recipe.create({
      name: "deleteBookRecipe",
      image_path: "deleteBookRecipe",
      description: "deleteBookRecipe@example.com",
      directions: "deleteBookRecipe",
    });

    let bo = await Book.create({
      name: "deleteBookRecipe",
      image_path: "deleteBookRecipe",
      description: "jndeleteBookRecipe.doexample.com",
      free: true,
    });
    // Create a test order
    let ordertest = await BookRecipe.create({
      RecipeId: rec.id,
      BookId: bo.id,
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
    //booksRecipesRecipe;
    // Call the updateBookRecipe function
    await deleteBookRecipe(req, res);

    // Ensure that the statusfunction was called with a statuscode of 200
    expect(res.status.calledWith(200)).to.be.true;
    const foundBookRecipe = await BookRecipe.findByPk(ordertest.id);

    // Ensure that the json function was called with the data of the upd order
    expect(
      res.json.calledWith(
        sinon.match({
          RecipeId: ordertest.RecipeId,
          BookRecipeId: ordertest.BookRecipeId,
        })
      )
    ).to.be.true;

    //ensure the order don't exist more
    expect(foundBookRecipe).to.be.null;
  });
});
