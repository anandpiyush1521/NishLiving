const Listing = require("../models/Listing");
const logger = require("../logger");

// const createListing = async (req, res) => {
//   try {
//     const {
//       creator,
//       category,
//       type,
//       streetAddress,
//       aptSuite,
//       city,
//       province,
//       country,
//       guestCount,
//       bedroomCount,
//       bedCount,
//       bathroomCount,
//       amenities,
//       title,
//       description,
//       highlight,
//       highlightDesc,
//       price,
//     } = req.body;

//     const listingPhotos = req.files;
//     if (!listingPhotos) {
//       logger.warn("No file uploaded for the listing creation.", { creator, title });
//       return res.status(400).send("No file uploaded.");
//     }

//     const listingPhotoPaths = listingPhotos.map((file) => file.path);
//     const newListing = new Listing({
//       creator,
//       category,
//       type,
//       streetAddress,
//       aptSuite,
//       city,
//       province,
//       country,
//       guestCount,
//       bedroomCount,
//       bedCount,
//       bathroomCount,
//       amenities,
//       listingPhotoPaths,
//       title,
//       description,
//       highlight,
//       highlightDesc,
//       price,
//     });

//     await newListing.save();
//     logger.info("Listing created successfully.", { listingId: newListing._id, creator });
//     res.status(200).json(newListing);
//   } catch (err) {
//     logger.error("Failed to create listing.", { error: err.message, creator, title });
//     res.status(409).json({ message: "Fail to create Listing", error: err.message });
//   }
// };


const createListing = async (req, res) => {
  try {
    // Destructure required fields from the request body
    const {
      creator,
      category,
      type,
      streetAddress,
      aptSuite,
      city,
      province,
      country,
      guestCount,
      bedroomCount,
      bedCount,
      bathroomCount,
      amenities,
      title,
      description,
      highlight,
      highlightDesc,
      price,
    } = req.body;

    // Check if required fields are missing
    if (!creator || !title) {
      logger.warn("Missing required fields for listing creation.", { creator, title });
      return res.status(400).json({ message: "Missing required fields: creator or title." });
    }

    // Check if files have been uploaded
    const listingPhotos = req.files;
    if (!listingPhotos || listingPhotos.length === 0) {
      logger.warn("No file uploaded for the listing creation.", { creator, title });
      return res.status(400).json({ message: "No file uploaded." });
    }

    // Extract file paths from uploaded files
    const listingPhotoPaths = listingPhotos.map((file) => {
      if (!file.path) {
        throw new Error("File path missing for one of the uploaded files.");
      }
      return file.path;
    });

    // Create the new listing object
    const newListing = new Listing({
      creator,
      category,
      type,
      streetAddress,
      aptSuite,
      city,
      province,
      country,
      guestCount,
      bedroomCount,
      bedCount,
      bathroomCount,
      amenities,
      listingPhotoPaths,
      title,
      description,
      highlight,
      highlightDesc,
      price,
    });

    // Save the listing to the database
    await newListing.save();
    logger.info("Listing created successfully.", { listingId: newListing._id, creator });

    // Respond with success and the new listing
    res.status(200).json(newListing);

  } catch (err) {
    logger.error("Failed to create listing.", { error: err.message, creator, title });
    res.status(409).json({ message: "Failed to create Listing", error: err.message });
  }
};




const getListingsByCategory = async (req, res) => {
  const qCategory = req.query.category;

  try {
    let listings;
    if (qCategory) {
      listings = await Listing.find({ category: qCategory }).populate("creator");
    } else {
      listings = await Listing.find().populate("creator");
    }
    logger.info("Listings fetched successfully by category.", { category: qCategory, listingCount: listings.length });
    res.status(200).json(listings);
  } catch (err) {
    logger.error("Failed to fetch listings by category.", { error: err.message, category: qCategory });
    res.status(404).json({ message: "Fail to fetch listings", error: err.message });
  }
};

const getListingsBySearch = async (req, res) => {
  const { search } = req.params;

  try {
    let listings = [];

    if (search === "all") {
      listings = await Listing.find().populate("creator");
    } else {
      listings = await Listing.find({
        $or: [{ category: { $regex: search, $options: "i" } }, { title: { $regex: search, $options: "i" } }],
      }).populate("creator");
    }

    logger.info("Listings fetched successfully by search.", { search, listingCount: listings.length });
    res.status(200).json(listings);
  } catch (err) {
    logger.error("Failed to fetch listings by search.", { error: err.message, search });
    res.status(404).json({ message: "Fail to fetch listings", error: err.message });
  }
};

const getListingDetails = async (req, res) => {
  try {
    const { listingId } = req.params;
    const listing = await Listing.findById(listingId).populate("creator");
    logger.info("Listing details fetched successfully.", { listingId });
    res.status(202).json(listing);
  } catch (err) {
    logger.error("Failed to fetch listing details.", { error: err.message, listingId });
    res.status(404).json({ message: "Listing cannot be found!", error: err.message });
  }
};

module.exports = {
  createListing,
  getListingsByCategory,
  getListingsBySearch,
  getListingDetails,
};
