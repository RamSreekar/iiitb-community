const express = require("express");

const announcementController = require("../controllers/AnnouncementController");

const router = express.Router();

router.get("/all", announcementController.getAllAnnouncements);

router.get("/:announcementId", announcementController.getAnnouncementById);

module.exports = router;

