const Booking = require("../models/Booking");
const User = require("../models/User");
const Listing = require("../models/Listing");
const logger = require("../logger");

const getTrips = async (req, res) => {
  try {
    const { userId } = req.params;
    const trips = await Booking.find({ customerId: userId }).populate("customerId hostId listingId");
    logger.info("Trips fetched successfully.", { userId, tripCount: trips.length });
    res.status(202).json(trips);
  } catch (err) {
    logger.error("Failed to fetch trips.", { error: err.message });
    res.status(404).json({ message: "Cannot find trips!", error: err.message });
  }
};

const updateWishlist = async (req, res) => {
  try {
    const { userId, listingId } = req.params;
    const user = await User.findById(userId);
    const listing = await Listing.findById(listingId).populate("creator");

    const favoriteListing = user.wishList.find((item) => item._id.toString() === listingId);

    if (favoriteListing) {
      user.wishList = user.wishList.filter((item) => item._id.toString() !== listingId);
      await user.save();
      logger.info("Listing removed from wishlist.", { userId, listingId });
      res.status(200).json({ message: "Listing removed from wishlist", wishList: user.wishList });
    } else {
      user.wishList.push(listing);
      await user.save();
      logger.info("Listing added to wishlist.", { userId, listingId });
      res.status(200).json({ message: "Listing added to wishlist", wishList: user.wishList });
    }
  } catch (err) {
    logger.error("Failed to update wishlist.", { error: err.message, userId, listingId });
    res.status(404).json({ error: err.message });
  }
};

const getProperties = async (req, res) => {
  try {
    const { userId } = req.params;
    const properties = await Listing.find({ creator: userId }).populate("creator");
    logger.info("Properties fetched successfully.", { userId, propertyCount: properties.length });
    res.status(202).json(properties);
  } catch (err) {
    logger.error("Failed to fetch properties.", { error: err.message, userId });
    res.status(404).json({ message: "Cannot find properties!", error: err.message });
  }
};

const getReservations = async (req, res) => {
  try {
    const { userId } = req.params;
    const reservations = await Booking.find({ hostId: userId }).populate("customerId hostId listingId");
    logger.info("Reservations fetched successfully.", { userId, reservationCount: reservations.length });
    res.status(202).json(reservations);
  } catch (err) {
    logger.error("Failed to fetch reservations.", { error: err.message, userId });
    res.status(404).json({ message: "Cannot find reservations!", error: err.message });
  }
};

module.exports = {
  getTrips,
  updateWishlist,
  getProperties,
  getReservations,
};
