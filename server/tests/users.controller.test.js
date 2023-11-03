const { expect } = require("chai");
const sinon = require("sinon"); // Used for mocking dependencies
const {
  createUser,
  getAllUsers,
  getUserByEmail,
  updateUser,
  deleteUser,
} = require("../controllers/users.controller"); // Replace with the correct path to your code file
//const testDb = require("../config/dbtest"); // Import the test database connection
const User = require("../models/users.model"); // Make sure the path is correct

before(async () => {
  // process.env.NODE_ENV = "test";
  // Delete all records from the User table
  await User.destroy({ where: {} });
});
describe("createUser", () => {
  it("should create a new user successfully", async () => {
    // Simulate input data
    const req = {
      body: {
        name: "John",
        surname: "Doe",
        email: "john.doe@example.com",
        password: "mysecretpassword",
      },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };

    // Call the createUser function
    await createUser(req, res);

    // Ensure that the status function was called with a status code of 201
    expect(res.status.calledWith(201)).to.be.true;

    // Ensure that the json function was called with the data of the new user
    expect(
      res.json.calledWith(
        sinon.match({
          name: "John",
          surname: "Doe",
          email: "john.doe@example.com",
        })
      )
    ).to.be.true;
  });

  it("should handle email duplication correctly", async () => {
    // Simulate a duplicate email error
    const req = {
      body: {
        name: "Alice",
        surname: "Smith",
        email: "alice.smith@example.com",
        password: "anotherpassword",
      },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };

    // Call the createUser function with a duplicate email
    await createUser(req, res);
    await createUser(req, res);
    // Ensure that the status function was called with a status code of 400
    expect(res.status.calledWith(400)).to.be.true;

    // Ensure that the json function was called with the correct error message
    expect(
      res.json.calledWith(
        sinon.match({
          error: "User with this email address already exists.",
        })
      )
    ).to.be.true;
  });

  it("should handle other errors", async () => {
    // Simulate a generic error
    const req = {
      body: {
        name: "Bob",
        surname: "Johnson",
        password: "yetanotherpassword",
      },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    // Call the createUser function with a generic error

    await createUser(req, res);

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
describe("getAllUsers", () => {
  it("should return all users", async () => {
    // Create a test user
    await User.create({
      name: "Test",
      surname: "User",
      email: "test.user@example.com",
      password_hash: "testpassword",
    });
    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await getAllUsers(req, res);
    // Ensure that the status function was called with a status code of 200
    expect(res.status.calledWith(200)).to.be.true;

    // Expect that the json function was called with an array of users
    expect(res.json.calledWith(sinon.match.array)).to.be.true;
  });
});
describe("getUserByEmail", () => {
  it("should return 1 user", async () => {
    // Create a test user
    let usertest = await User.create({
      name: "Test",
      surname: "User",
      email: "testemail.user@example.com",
      password_hash: "testpassword",
    });
    const req = {
      params: {
        email: usertest.email,
      },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await getUserByEmail(req, res);
    // Ensure that the status function was called with a status code of 200
    expect(res.status.calledWith(200)).to.be.true;
    const returnedUser = res.json.getCall(0).args[0];

    //ensure is the same user we created before
    expect(returnedUser.name).to.equal(usertest.name);
    expect(returnedUser.surname).to.equal(usertest.surname);
    expect(returnedUser.email).to.equal(usertest.email);
  });
});

describe("updateUser", () => {
  it("should update a an user successfully", async () => {
    let usertest = await User.create({
      name: "Test",
      surname: "User",
      email: "testupdemail.user@example.com",
      password_hash: "testpassword",
    });
    // Simulate input data
    const req = {
      params: {
        email: usertest.email,
      },
      body: {
        name: "NameUpdated",
        surname: "SurnameUpdated",
        email: "bobUpdated@example.com",
      },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };

    // Call the updateUser function
    await updateUser(req, res);

    // Ensure that the status function was called with a status code of 200
    expect(res.status.calledWith(200)).to.be.true;

    // Ensure that the json function was called with the data of the upd user
    expect(
      res.json.calledWith(
        sinon.match({
          name: req.body.name,
          surname: req.body.surname,
          email: req.body.email,
        })
      )
    ).to.be.true;
  });
});

describe("deleteUser", () => {
  it("should create a new user successfully", async () => {
    let usertest = await User.create({
      name: "Test",
      surname: "User",
      email: "testdeleteemail.user@example.com",
      password_hash: "testpassword",
    });
    // Simulate input data
    const req = {
      params: {
        email: usertest.email,
      },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };

    // Call the updateUser function
    await deleteUser(req, res);

    // Ensure that the status function was called with a status code of 200
    expect(res.status.calledWith(200)).to.be.true;
    const foundUser = await User.findByEmail(usertest.email);

    // Ensure that the json function was called with the data of the upd user
    expect(
      res.json.calledWith(
        sinon.match({
          name: usertest.name,
          surname: usertest.surname,
          email: usertest.email,
        })
      )
    ).to.be.true;

    //ensure the user don't exist more
    expect(foundUser).to.be.null;
  });
});
