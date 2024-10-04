const router = require("express").Router();
const { getTrips, updateWishlist, getProperties, getReservations } = require("../controller/userController");

router.get("/:userId/trips", getTrips);
router.patch("/:userId/:listingId", updateWishlist);
router.get("/:userId/properties", getProperties);
router.get("/:userId/reservations", getReservations);

module.exports = router;
