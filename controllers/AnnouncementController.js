const announcementService = require("../services/AnnouncementService");

exports.getAllAnnouncements = async (req, res) => {
    try {
        const announcements = await announcementService.getAllAnnouncements();

        res.status(200).json(announcements);
    } catch(err) {
        res.status(500).json(err);
    }
}