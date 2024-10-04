const router = require("express").Router();
const { createBooking } = require("../controller/bookingController");

router.post("/create", createBooking);

module.exports = router;
