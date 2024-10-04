const router = require("express").Router();
const multer = require("multer");
const { createListing, getListingsByCategory, getListingsBySearch, getListingDetails } = require("../controller/listingController");

const upload = multer({ dest: "public/uploads/" });

router.post("/create", upload.array("listingPhotos", 5), createListing);
router.get("/", getListingsByCategory);
router.get("/search/:search", getListingsBySearch);
router.get("/:listingId", getListingDetails);

module.exports = router;
