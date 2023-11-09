const { expect } = require("chai");
const sinon = require("sinon"); // Used for mocking dependencies
const {
  createRecipeIngredient,
  getAllRecipeIngredients,
  getRecipeIngredientById,
  updateRecipeIngredient,
  deleteRecipeIngredient,
} = require("../controllers/recipesIngredients.controller"); // Replace with the correct path to your code file
//const testDb = require("../config/dbtest"); // Import the test database connection
const RecipeIngredient = require("../models/recipesIngredients.model"); // Make sure the path is correct
const Recipe = require("../models/recipes.model"); // Make sure the path is correct
const Ingredient = require("../models/ingredients.model"); // Make sure the path is correct

before(async () => {
  // Delete all records from the RecipeIngredient table
  await RecipeIngredient.destroy({ where: {} });
  //process.env.NODE_ENV = "test";
});
describe("createRecipeIngredient", () => {
  it("should create a new recipeIngredient successfully", async () => {
    let bo = await Ingredient.create({
      name: "createRecipeIngredient",
      fat: 3,
      carbohydrates: 2,
      protein: 6,
    });

    let rec = await Recipe.create({
      name: "createRecipeIngredient",
      image_path: "createRecipeIngredient",
      description: "createRecipeIngredient",
      directions: "createRecipeIngredient",
    });

    // Simulate input data
    const req = {
      body: {
        RecipeId: rec.id,
        IngredientId: bo.id,
        quantity: 1,
      },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };

    // Call the createRecipeIngredient function
    await createRecipeIngredient(req, res);

    // Ensure that the status function was called with a status code of 201
    expect(res.status.calledWith(201)).to.be.true;

    // Ensure that the json function was called with the data of the new recipeIngredient
    expect(
      res.json.calledWith(
        sinon.match({
          RecipeId: rec.id,
          IngredientId: bo.id,
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

    // Call the createRecipeIngredient function with a generic error

    await createRecipeIngredient(req, res);

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
describe("getAllRecipeIngredients", async () => {
  it("should return all recipeIngredients", async () => {
    let rec = await Recipe.create({
      name: "getAllRecipeIngredients",
      image_path: "getAllRecipeIngredients",
      description: "getAllRecipeIngredients",
      directions: "getAllRecipeIngredients",
    });

    let bo = await Ingredient.create({
      name: "getAllRecipeIngredients",
      fat: 3,
      carbohydrates: 2,
      protein: 6,
    });
    // Create a test recipeIngredient
    await RecipeIngredient.create({
      RecipeId: rec.id,
      IngredientId: bo.id,
      quantity: 1,
    });
    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await getAllRecipeIngredients(req, res);
    // Ensure that the status function was called with a status code of 200
    expect(res.status.calledWith(200)).to.be.true;

    // Expect that the json function was called with an array of recipeIngredients
    expect(res.json.calledWith(sinon.match.array)).to.be.true;
  });
});
describe("getRecipeIngredientById", async () => {
  it("should return 1 recipeIngredient", async () => {
    let rec = await Recipe.create({
      name: "getRecipeIngredientById",
      image_path: "getRecipeIngredientById",
      description: "getRecipeIngredientById",
      directions: "getRecipeIngredientById",
    });

    let bo = await Ingredient.create({
      name: "getRecipeIngredientById",
      fat: 3,
      carbohydrates: 2,
      protein: 6,
    });
    // Create a test recipeIngredient
    let recipeIngredienttest = await RecipeIngredient.create({
      RecipeId: rec.id,
      IngredientId: bo.id,
      quantity: 1,
    });
    const req = {
      params: {
        id: recipeIngredienttest.id,
      },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await getRecipeIngredientById(req, res);
    // Ensure that the status function was called with a status code of 200
    expect(res.status.calledWith(200)).to.be.true;
    const returnedRecipeIngredient = res.json.getCall(0).args[0];

    //ensure is the same recipeIngredient we created before
    expect(returnedRecipeIngredient.name).to.equal(recipeIngredienttest.name);
    expect(returnedRecipeIngredient.image_path).to.equal(
      recipeIngredienttest.image_path
    );
    expect(returnedRecipeIngredient.description).to.equal(
      recipeIngredienttest.description
    );
  });
});

describe("updateRecipeIngredient", async () => {
  it("should update a an recipeIngredient successfully", async () => {
    // Create a test recipeIngredient
    let rec = await Recipe.create({
      name: "updateRecipeIngredient",
      image_path: "updateRecipeIngredient",
      description: "updateRecipeIngredient",
      directions: "updateRecipeIngredient",
    });

    let bo = await Ingredient.create({
      name: "updateRecipeIngredient",
      fat: 3,
      carbohydrates: 2,
      protein: 6,
    });
    // Create a test recipeIngredient
    let recipeIngredienttest = await RecipeIngredient.create({
      RecipeId: rec.id,
      IngredientId: bo.id,
      quantity: 1,
    });
    // Simulate input data
    const req = {
      params: {
        id: recipeIngredienttest.id,
      },
      body: {
        quantity: 1,
      },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };

    // Call the updateRecipeIngredient function
    const updRecipeIngredient = await updateRecipeIngredient(req, res);

    // Ensure that the status function was called with a status code of 200
    expect(res.status.calledWith(200)).to.be.true;
    console.log(req.body);

    // Ensure that the json function was called with the data of the upd recipeIngredient
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

describe("deleteRecipeIngredient", async () => {
  it("should create a new recipeIngredient successfully", async () => {
    // Create a test recipeIngredient
    let rec = await Recipe.create({
      name: "deleteRecipeIngredient",
      image_path: "deleteRecipeIngredient",
      description: "deleteRecipeIngredient",
      directions: "deleteRecipeIngredient",
    });

    let bo = await Ingredient.create({
      name: "deleteRecipeIngredient",
      fat: 3,
      carbohydrates: 2,
      protein: 6,
    });
    // Create a test recipeIngredient
    let recipeIngredienttest = await RecipeIngredient.create({
      RecipeId: rec.id,
      IngredientId: bo.id,
      quantity: 1,
    });
    // Simulate input data
    const req = {
      params: {
        id: recipeIngredienttest.id,
      },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };

    // Call the updateRecipeIngredient function
    await deleteRecipeIngredient(req, res);

    // Ensure that the status function was called with a status code of 200
    expect(res.status.calledWith(200)).to.be.true;
    const foundRecipeIngredient = await RecipeIngredient.findByPk(
      recipeIngredienttest.id
    );

    // Ensure that the json function was called with the data of the upd recipeIngredient
    expect(
      res.json.calledWith(
        sinon.match({
          RecipeId: recipeIngredienttest.RecipeId,
          RecipeIngredientId: recipeIngredienttest.RecipeIngredientId,
        })
      )
    ).to.be.true;

    //ensure the recipeIngredient don't exist more
    expect(foundRecipeIngredient).to.be.null;
  });
});
