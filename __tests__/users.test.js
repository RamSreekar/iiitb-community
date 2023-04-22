const userController = require("../controllers/UserController");
const User = require('../models/UserModel'); 

jest.mock('../models/UserModel');

const mockRequest = {
    params : {
        userId : ""
    }
}

const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
}

const mockErrorResponse = {
    "error" : "Error",
    "message" : "[object Object]"
}

const mockUserObject = {
    _id : "",
    email : "",
    userType : "",
    validGroups : []
}


describe("User API", () => {
    test("getAllUsers() : should return status 200 and list of all users", async () => {
        const request = mockRequest;
        const response = mockResponse();
    
        User.find.mockImplementationOnce(() => []);
    
        await userController.getAllUsers(request, response);
    
        expect(response.status).toHaveBeenCalledWith(200);
        expect(response.json).toHaveBeenCalledTimes(1);
        expect(response.json).toHaveBeenCalledWith([]);
    }); 

    test("getAllUsers() : should return status 500 and error description", async () => {
        const request = mockRequest;
        const response = mockResponse();
    
        User.find.mockImplementationOnce(() => {
            throw new Error(mockErrorResponse);
        });
    
        await userController.getAllUsers(request, response);
    
        expect(response.status).toHaveBeenCalledWith(500);
        expect(response.json).toHaveBeenCalledTimes(1);
        expect(response.json).toHaveBeenCalledWith(mockErrorResponse); 
    });

    test("getUserById() : should return status 200 and a user with the given id", async () => {
        const request = mockRequest;
        const response = mockResponse();
    
        User.findById.mockImplementationOnce(() => mockUserObject);
    
        await userController.getUserById(request, response);
    
        expect(response.status).toHaveBeenCalledWith(200);
        expect(response.json).toHaveBeenCalledTimes(1);
        expect(response.json).toHaveBeenCalledWith(mockUserObject);
    });

    test("getUserById() : should return status 404 and user as null", async () => {
        const request = mockRequest;
        const response = mockResponse();
    
        User.findById.mockImplementationOnce(() => null);
    
        await userController.getUserById(request, response);
    
        expect(response.status).toHaveBeenCalledWith(404);
        expect(response.json).toHaveBeenCalledTimes(1);
        expect(response.json).toHaveBeenCalledWith({"message": "User doesn't exist with given id!"});
    });

    test("getUserById() : should return status 500 and error description", async () => {
        const request = mockRequest;
        const response = mockResponse();
    
        User.findById.mockImplementationOnce(() => {throw new Error(mockErrorResponse)});
    
        await userController.getUserById(request, response);
    
        expect(response.status).toHaveBeenCalledWith(500);
        expect(response.json).toHaveBeenCalledTimes(1);
        expect(response.json).toHaveBeenCalledWith(mockErrorResponse); 
    });
});

