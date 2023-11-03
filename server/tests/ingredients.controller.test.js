const { expect } = require("chai");
const sinon = require("sinon"); // Used for mocking dependencies
const {
  createIngredient,
  getAllIngredients,
  getIngredientById,
  updateIngredient,
  deleteIngredient,
} = require("../controllers/ingredients.controller"); // Replace with the correct path to your code file
//const testDb = require("../config/dbtest"); // Import the test database connection
const Ingredient = require("../models/ingredients.model"); // Make sure the path is correct

before(async () => {
  // Delete all records from the Ingredient table
  await Ingredient.destroy({ where: {} });
  //process.env.NODE_ENV = "test";
});
describe("createIngredient", () => {
  it("should create a new ingredient successfully", async () => {
    // Simulate input data
    const req = {
      body: {
        name: "John",
        fat: 2,
        carbohydrates: 3,
        protein: 3,
      },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };

    // Call the createIngredient function
    await createIngredient(req, res);

    // Ensure that the status function was called with a status code of 201
    expect(res.status.calledWith(201)).to.be.true;

    // Ensure that the json function was called with the data of the new ingredient
    expect(
      res.json.calledWith(
        sinon.match({
          name: req.body.name,
          carbohydrates: req.body.carbohydrates,
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

    // Call the createIngredient function with a generic error

    await createIngredient(req, res);

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
describe("getAllIngredients", () => {
  it("should return all ingredients", async () => {
    // Create a test ingredient
    await Ingredient.create({
      name: "Johsdfn",
      fat: 3,
      carbohydrates: 2,
      protein: 6,
    });
    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await getAllIngredients(req, res);
    // Ensure that the status function was called with a status code of 200
    expect(res.status.calledWith(200)).to.be.true;

    // Expect that the json function was called with an array of ingredients
    expect(res.json.calledWith(sinon.match.array)).to.be.true;
  });
});
describe("getIngredientById", () => {
  it("should return 1 ingredient", async () => {
    // Create a test ingredient
    let ingredienttest = await Ingredient.create({
      name: "ffJohn",
      fat: 4,
      carbohydrates: 5,
      protein: 2,
    });
    const req = {
      params: {
        id: ingredienttest.id,
      },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await getIngredientById(req, res);
    // Ensure that the status function was called with a status code of 200
    expect(res.status.calledWith(200)).to.be.true;
    const returnedIngredient = res.json.getCall(0).args[0];

    //ensure is the same ingredient we created before
    expect(returnedIngredient.name).to.equal(ingredienttest.name);
    expect(returnedIngredient.fat).to.equal(ingredienttest.fat);
    expect(returnedIngredient.carbohydrates).to.equal(
      ingredienttest.carbohydrates
    );
  });
});

describe("updateIngredient", () => {
  it("should update a an ingredient successfully", async () => {
    let ingredienttest = await Ingredient.create({
      name: "Johndfsf",
      fat: 2,
      carbohydrates: 2,
      protein: 33,
    });
    // Simulate input data
    const req = {
      params: {
        id: ingredienttest.id,
      },
      body: {
        name: "NameUpdated",
        carbohydrates: "2",
        protein: "1",
      },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };

    // Call the updateIngredient function
    const updIngredient = await updateIngredient(req, res);

    // Ensure that the status function was called with a status code of 200
    expect(res.status.calledWith(200)).to.be.true;
    console.log(req.body);

    // Ensure that the json function was called with the data of the upd ingredient
    expect(
      res.json.calledWith(
        sinon.match({
          name: req.body.name,
          carbohydrates: req.body.carbohydrates,
        })
      )
    ).to.be.true;
  });
});

describe("deleteIngredient", () => {
  it("should create a new ingredient successfully", async () => {
    let ingredienttest = await Ingredient.create({
      name: "Johndfsf",
      fat: 2,
      carbohydrates: 2,
      protein: 4,
    });
    // Simulate input data
    const req = {
      params: {
        id: ingredienttest.id,
      },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };

    // Call the updateIngredient function
    await deleteIngredient(req, res);

    // Ensure that the status function was called with a status code of 200
    expect(res.status.calledWith(200)).to.be.true;
    const foundIngredient = await Ingredient.findByPk(ingredienttest.id);

    // Ensure that the json function was called with the data of the upd ingredient
    expect(
      res.json.calledWith(
        sinon.match({
          name: ingredienttest.name,
          carbohydrates: ingredienttest.carbohydrates,
          id: ingredienttest.id,
        })
      )
    ).to.be.true;

    //ensure the ingredient don't exist more
    expect(foundIngredient).to.be.null;
  });
});
