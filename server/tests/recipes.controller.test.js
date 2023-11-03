const { expect } = require("chai");
const sinon = require("sinon"); // Used for mocking dependencies
const {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
} = require("../controllers/recipes.controller"); // Replace with the correct path to your code file
//const testDb = require("../config/dbtest"); // Import the test database connection
const Recipe = require("../models/recipes.model"); // Make sure the path is correct

before(async () => {
  // Delete all records from the Recipe table
  await Recipe.destroy({ where: {} });
  //process.env.NODE_ENV = "test";
});
describe("createRecipe", () => {
  it("should create a new recipe successfully", async () => {
    // Simulate input data
    const req = {
      body: {
        name: "John",
        image_path: "Doe",
        description: "jn@.doexample.com",
        directions: "finfinsueiunfiunefinuefinuj",
      },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };

    // Call the createRecipe function
    await createRecipe(req, res);

    // Ensure that the status function was called with a status code of 201
    expect(res.status.calledWith(201)).to.be.true;

    // Ensure that the json function was called with the data of the new recipe
    expect(
      res.json.calledWith(
        sinon.match({
          name: req.body.name,
          description: req.body.description,
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

    // Call the createRecipe function with a generic error

    await createRecipe(req, res);

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
describe("getAllRecipes", () => {
  it("should return all recipes", async () => {
    // Create a test recipe
    await Recipe.create({
      name: "Johsdfn",
      image_path: "Ddsvoe",
      description: "jn@dvsvd.doexample.com",
      directions: "truergdggdrg",
    });
    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await getAllRecipes(req, res);
    // Ensure that the status function was called with a status code of 200
    expect(res.status.calledWith(200)).to.be.true;

    // Expect that the json function was called with an array of recipes
    expect(res.json.calledWith(sinon.match.array)).to.be.true;
  });
});
describe("getRecipeById", () => {
  it("should return 1 recipe", async () => {
    // Create a test recipe
    let recipetest = await Recipe.create({
      name: "ffJohn",
      image_path: "Doeff",
      description: "jn@.doffexample.com",
      directions: "falsrgdgrgdge",
    });
    const req = {
      params: {
        id: recipetest.id,
      },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await getRecipeById(req, res);
    // Ensure that the status function was called with a status code of 200
    expect(res.status.calledWith(200)).to.be.true;
    const returnedRecipe = res.json.getCall(0).args[0];

    //ensure is the same recipe we created before
    expect(returnedRecipe.name).to.equal(recipetest.name);
    expect(returnedRecipe.image_path).to.equal(recipetest.image_path);
    expect(returnedRecipe.description).to.equal(recipetest.description);
  });
});

describe("updateRecipe", () => {
  it("should update a an recipe successfully", async () => {
    let recipetest = await Recipe.create({
      name: "Johndfsf",
      image_path: "Ddfsdfoe",
      description: "jn@fdsf.doexample.com",
      directions: "true",
    });
    // Simulate input data
    const req = {
      params: {
        id: recipetest.id,
      },
      body: {
        name: "NameUpdated",
        description: "DescupdUpdated",
        directions: "fadrdrglse",
      },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };

    // Call the updateRecipe function
    const updRecipe = await updateRecipe(req, res);

    // Ensure that the status function was called with a status code of 200
    expect(res.status.calledWith(200)).to.be.true;
    console.log(req.body);

    // Ensure that the json function was called with the data of the upd recipe
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

describe("deleteRecipe", () => {
  it("should create a new recipe successfully", async () => {
    let recipetest = await Recipe.create({
      name: "Johndfsf",
      image_path: "Ddfsdfoe",
      description: "jn@fdsf.doexample.com",
      directions: "true",
    });
    // Simulate input data
    const req = {
      params: {
        id: recipetest.id,
      },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };

    // Call the updateRecipe function
    await deleteRecipe(req, res);

    // Ensure that the status function was called with a status code of 200
    expect(res.status.calledWith(200)).to.be.true;
    const foundRecipe = await Recipe.findByPk(recipetest.id);

    // Ensure that the json function was called with the data of the upd recipe
    expect(
      res.json.calledWith(
        sinon.match({
          name: recipetest.name,
          description: recipetest.description,
          id: recipetest.id,
        })
      )
    ).to.be.true;

    //ensure the recipe don't exist more
    expect(foundRecipe).to.be.null;
  });
});
