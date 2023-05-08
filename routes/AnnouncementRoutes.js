const express = require("express");

const announcementController = require("../controllers/AnnouncementController");

const router = express.Router();

router.get("/", announcementController.getAllAnnouncements);

router.get("/:announcementId", announcementController.getAnnouncementById);

router.get("/class/:className", announcementController.getAnnouncementsByClassName);

router.post("/post", announcementController.postAnnouncement);

module.exports = router;

