const opportunityController = require("../controllers/OpportunityController");
const Opportunity = require("../models/OpportunityModel");

jest.mock("../models/OpportunityModel");

const mockOpportunity = {
  _id: "",
  title: "",
  className: "",
  author: "",
  timestamp: "",
  link: "",
};

const mockRequest = {
  params: {
    opportunityId: "",
  },
};

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

const mockErrorResponse = {
  error: "Error",
  message: "[object Object]",
};

describe("Opportunity API", () => {
  test("getAllOpportunities() : should return status 200 and list of all opportunities", async () => {
    const request = mockRequest;
    const response = mockResponse();

    Opportunity.find.mockImplementationOnce(() => []);

    await opportunityController.getAllOpportunities(request, response);

    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.json).toHaveBeenCalledTimes(1);
    expect(response.json).toHaveBeenCalledWith([]);
  });

  test("getAllOpportunities() : should return status 500 and error description", async () => {
    const request = mockRequest;
    const response = mockResponse();

    Opportunity.find.mockImplementationOnce(() => {
      throw new Error(mockErrorResponse);
    });

    await opportunityController.getAllOpportunities(request, response);

    expect(response.status).toHaveBeenCalledWith(500);
    expect(response.json).toHaveBeenCalledTimes(1);
    expect(response.json).toHaveBeenCalledWith(mockErrorResponse);
  });

  test("getOpportunityById() : should return status 200 and the opportunity with the given id", async () => {
    const request = mockRequest;
    const response = mockResponse();

    Opportunity.findById.mockImplementationOnce(() => mockOpportunity);

    await opportunityController.getOpportunityById(request, response);

    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.json).toHaveBeenCalledTimes(1);
    expect(response.json).toHaveBeenCalledWith(mockOpportunity);
  });

  test("getOpportunityById() : should return status 404 and null", async () => {
    const request = mockRequest;
    const response = mockResponse();

    Opportunity.findById.mockImplementationOnce(() => null);

    await opportunityController.getOpportunityById(request, response);

    expect(response.status).toHaveBeenCalledWith(404);
    expect(response.json).toHaveBeenCalledTimes(1);
    expect(response.json).toHaveBeenCalledWith({
      message: "Opportunity doesn't exist with given Id!",
    });
  });

  test("getOpportunityById() : should return status 500 and error description", async () => {
    const request = mockRequest;
    const response = mockResponse();

    Opportunity.findById.mockImplementationOnce(() => {
      throw new Error(mockErrorResponse);
    });

    await opportunityController.getOpportunityById(request, response);

    expect(response.status).toHaveBeenCalledWith(500);
    expect(response.json).toHaveBeenCalledTimes(1);
    expect(response.json).toHaveBeenCalledWith(mockErrorResponse);
  });

  test("postOpportunity() : should return status 200 and post an announcement", async () => {
    const request = mockRequest;
    const response = mockResponse();

    const opportunity = new Opportunity(request.body);
    opportunity.save.mockImplementationOnce();

    await opportunityController.postOpportunity(request, response);

    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.json).toHaveBeenCalledTimes(1);
    expect(response.json).toHaveBeenCalledWith({
      message: "Opportunity created!",
    });
  });

  test("postOpportunity() : should return status 500 and error description", async () => {
    const request = mockRequest;
    const response = mockResponse();

    const opportunity = new Opportunity(request.body);

    opportunity.save.mockImplementationOnce(() => {
      throw new Error(mockErrorResponse);
    });

    await opportunityController.postOpportunity(request, response);

    expect(response.status).toHaveBeenCalledWith(500);
    expect(response.json).toHaveBeenCalledTimes(1);
    expect(response.json).toHaveBeenCalledWith(mockErrorResponse);
  });
});
