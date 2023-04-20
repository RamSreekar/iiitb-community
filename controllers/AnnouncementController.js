const announcementService = require("../services/AnnouncementService");

exports.getAllAnnouncements = async (req, res) => {
    try {
        const announcements = await announcementService.getAllAnnouncements();

        res.status(200).json(announcements);
    } catch(err) {
        res.status(500).json(err);
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
        res.status(500).json({"message" : "Invalid ObjectId: userId"});
    }

}