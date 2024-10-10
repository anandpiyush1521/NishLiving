const router = require("express").Router();
const { getTrips, updateWishlist, getProperties, getReservations, getDetails } = require("../controller/userController");

router.get("/:userId/trips", getTrips);
router.patch("/:userId/:listingId", updateWishlist);
router.get("/:userId/properties", getProperties);
router.get("/:userId/reservations", getReservations);

router.get("/:userId/dashboard", getDetails);

module.exports = router;
