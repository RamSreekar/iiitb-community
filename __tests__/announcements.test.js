const { exceptions } = require("winston");
const announcementController = require("../controllers/AnnouncementController");
const Announcement = require('../models/AnnouncementModel'); 

jest.mock('../models/AnnouncementModel');


const mockAnnouncement = {
    _id : "",
    title : "",
    className : "",
    author : "",
    timestamp : "",
    content : "",
    imageUrl : "",
    link : ""
}

const mockRequest = {
    params : {
        announcementId : ""
    },
    body : mockAnnouncement
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

describe("Announcement API", () => {
    test("getAllAnnouncements() : should return status 200 and list all announcements", async () => {
        const request = mockRequest;
        const response = mockResponse();
    
        Announcement.find.mockImplementationOnce(() => []);
    
        await announcementController.getAllAnnouncements(request, response);
    
        expect(response.status).toHaveBeenCalledWith(200);
        expect(response.json).toHaveBeenCalledTimes(1);
        expect(response.json).toHaveBeenCalledWith([]);
    }); 

    test("getAllAnnouncements() : should return status 500 and error description", async () => {
        const request = mockRequest;
        const response = mockResponse();
    
        Announcement.find.mockImplementationOnce(() => {
            throw new Error(mockErrorResponse);
        });
    
        await announcementController.getAllAnnouncements(request, response);
    
        expect(response.status).toHaveBeenCalledWith(500);
        expect(response.json).toHaveBeenCalledTimes(1);
        expect(response.json).toHaveBeenCalledWith(mockErrorResponse);
    }); 

    test("getAnnouncementById() : should return status 200 and json of announcement with the given id", async () => {
        const request = mockRequest;
        const response = mockResponse();
    
        Announcement.findById.mockImplementationOnce(() => mockAnnouncement);
    
        await announcementController.getAnnouncementById(request, response);
    
        expect(response.status).toHaveBeenCalledWith(200);
        expect(response.json).toHaveBeenCalledTimes(1);
        expect(response.json).toHaveBeenCalledWith(mockAnnouncement);
    });

    test("getAnnouncementById() : should return status 404 and data as null", async () => {
        const request = mockRequest;
        const response = mockResponse();
    
        Announcement.findById.mockImplementationOnce(() => null);
   
        await announcementController.getAnnouncementById(request, response);
    
        expect(response.status).toHaveBeenCalledWith(404);
        expect(response.json).toHaveBeenCalledTimes(1);
        expect(response.json).toHaveBeenCalledWith({"message" : "Announcement doesn't exist with given Id"});
    });

    test("getAnnouncementById() : should return status 500 and error description", async () => {
        const request = mockRequest;
        const response = mockResponse();
    
        Announcement.findById.mockImplementationOnce(() => {
            throw new Error(mockErrorResponse);
        });
   
        await announcementController.getAnnouncementById(request, response);
    
        expect(response.status).toHaveBeenCalledWith(500);
        expect(response.json).toHaveBeenCalledTimes(1);
        expect(response.json).toHaveBeenCalledWith(mockErrorResponse);
    });

    test("postAnnouncement() : should return status 200 and post an announcement", async () => {
        const request = mockRequest;
        const response = mockResponse();

        const announcement = new Announcement(request.body);
        announcement.save.mockImplementationOnce();

        await announcementController.postAnnouncement(request, response);

        expect(response.status).toHaveBeenCalledWith(200);
        expect(response.json).toHaveBeenCalledTimes(1);
        expect(response.json).toHaveBeenCalledWith({"message" : "Announcement posted!"});
    });

    test("postAnnouncement() : should return status 500 and error description", async () => {
        const request = mockRequest;
        const response = mockResponse();

        const announcement = new Announcement(request.body);

        announcement.save.mockImplementationOnce(() => { 
            throw new Error(mockErrorResponse);
        });

        await announcementController.postAnnouncement(request, response);

        expect(response.status).toHaveBeenCalledWith(500);
        expect(response.json).toHaveBeenCalledTimes(1);
        expect(response.json).toHaveBeenCalledWith(mockErrorResponse);
    });

    test("getAnnouncementsByClassName() : should return status 200 and list all announcements with given className", async () => {
        const request = mockRequest;
        const response = mockResponse();
    
        Announcement.find.mockImplementationOnce(() => []);
    
        await announcementController.getAnnouncementsByClassName(request, response);
    
        expect(response.status).toHaveBeenCalledWith(200);
        expect(response.json).toHaveBeenCalledTimes(1);
        expect(response.json).toHaveBeenCalledWith([]);
    }); 

    test("getAnnouncementsByClassName() : should return status 500 and error description", async () => {
        const request = mockRequest;
        const response = mockResponse();
    
        Announcement.find.mockImplementationOnce(() => {
            throw new Error(mockErrorResponse);
        });
    
        await announcementController.getAnnouncementsByClassName(request, response);
    
        expect(response.status).toHaveBeenCalledWith(500);
        expect(response.json).toHaveBeenCalledTimes(1);
        expect(response.json).toHaveBeenCalledWith(mockErrorResponse);
    }); 
});