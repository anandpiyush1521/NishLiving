const Booking = require("../models/Booking");
const logger = require("../logger");
const Listing = require("../models/Listing");
const User = require("../models/User");
const sendMail = require("../utils/nodemailer");
const { bookingConfirmationCustomer, bookingAlertHost } = require("../templates/emailTemplate");

const createBooking = async (req, res) => {
  try {
    const { customerId, hostId, listingId, startDate, endDate, totalPrice } = req.body;

    // Fetch customer details
    const customer = await User.findById(customerId);
    if (!customer) {
      logger.error("Customer not found.", { customerId });
      return res.status(404).json({ message: "Customer not found!" });
    }
    const customerEmail = customer.email;

    // Fetch host details
    const host = await User.findById(hostId);
    if (!host) {
      logger.error("Host not found.", { hostId });
      return res.status(404).json({ message: "Host not found!" });
    }
    const hostEmail = host.email;

    // Create new booking
    const newBooking = new Booking({ customerId, hostId, listingId, startDate, endDate, totalPrice });
    await newBooking.save();

    // Send email to customer
    await sendMail({
      to: customerEmail,
      subject: "New Booking Confirmation",
      html: bookingConfirmationCustomer(customer, newBooking),
      // text: `A new booking has been made for your property. Booking details: ${JSON.stringify(newBooking)}`,
      // html: `<b>A new booking has been made for your property. Booking details:</b> <pre>${JSON.stringify(newBooking, null, 2)}</pre>`,
    });

    // Send email to host
    await sendMail({
      to: hostEmail,
      subject: "New Booking Alert",
      html: bookingAlertHost(host, customer, newBooking),
      // text: `A new booking has been made by ${customer.email} for your property. Booking details: ${JSON.stringify(newBooking)}`,
      // html: `<b>A new booking has been made by ${customer.email} for your property. Booking details:</b> <pre>${JSON.stringify(newBooking, null, 2)}</pre>`,
    });

    logger.info("Booking created successfully.", { bookingId: newBooking._id, customerId, hostId, listingId });
    res.status(200).json(newBooking);
  } catch (err) {
    logger.error("Failed to create booking.", { error: err.message });
    res.status(400).json({ message: "Fail to create a new Booking!", error: err.message });
  }
};

module.exports = {
  createBooking,
};