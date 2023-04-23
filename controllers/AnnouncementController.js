const announcementService = require("../services/AnnouncementService");

exports.getAllAnnouncements = async (req, res) => {
    try {
        const announcements = await announcementService.getAllAnnouncements();

        res.status(200).json(announcements);
    } catch(err) {
        res.status(500).json({"error": err.name , "message" : err.message});
    }
}

exports.getAnnouncementById = async (req, res) => {
    try {
        const announcementId = req.params.announcementId;
        const requiredAnnouncement = await announcementService.getAnnouncementById(announcementId);

        if(requiredAnnouncement == null)
            res.status(404).json({"message" : "Announcement doesn't exist with given Id"});
        else
        res.status(200).json(requiredAnnouncement);
    } catch(err) {
        res.status(500).json({"error": err.name , "message" : err.message});
    }
}

exports.postAnnouncement = async (req, res) => {
    try {
        const announcement = req.body;
        // console.log(announcement); 
        await announcementService.postAnnouncement(announcement);

        res.status(200).json({"message" : "Announcement posted!"});
    } catch(err) {
        res.status(500).json({"error": err.name , "message" : err.message});
    }
}