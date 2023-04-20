const Announcements = require("../models/AnnouncementModel");

exports.getAllAnnouncements = async () => {
    const announcements = await Announcements.find({});

    return announcements;
}