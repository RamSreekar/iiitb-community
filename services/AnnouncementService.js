const Announcements = require("../models/AnnouncementModel");

exports.getAllAnnouncements = async () => {
    const announcements = await Announcements.find({});

    return announcements;
}

exports.getAnnouncementById = async (announcementId) => {
    const requiredAnnouncement = await Announcements.findById(announcementId);

    return requiredAnnouncement;
}

exports.getAnnouncementsByClassName = async (className) => {
    const requiredAnnouncements = await Announcements.find({ className : className });

    return requiredAnnouncements;
}

exports.postAnnouncement = async (req) => {
    const announcement = new Announcements(req);
    
    await announcement.save();
}