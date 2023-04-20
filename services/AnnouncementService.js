const Announcements = require("../models/AnnouncementModel");

exports.getAllAnnouncements = async () => {
    const announcements = await Announcements.find({});

    return announcements;
}

exports.getAnnouncementById = async (announcementId) => {
    const requiredAnnouncement = await Announcements.findById(announcementId);

    return requiredAnnouncement;
}