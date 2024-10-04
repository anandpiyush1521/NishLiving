const bookingConfirmationCustomer = (customer, bookingDetails) => `
  <div style="font-family: Arial, sans-serif; color: #333;">
    <div style="text-align: center; margin-bottom: 20px;">
      <img src="https://res.cloudinary.com/dth5ysuhs/image/upload/v1727982120/bht7luklwho4nmcxy6fn.png" alt="NishLiving Logo">
    </div>
    <h2 style="color: #4CAF50;">Booking Confirmation</h2>
    <p>Dear ${customer.name},</p>
    <p>Thank you for booking with us! Here are the details of your reservation:</p>
    <table style="width: 100%; border-collapse: collapse;">
      <tr>
        <th style="text-align: left; padding: 8px; background-color: #f2f2f2;">Property</th>
        <td style="padding: 8px;">${bookingDetails.listingId}</td>
      </tr>
      <tr>
        <th style="text-align: left; padding: 8px; background-color: #f2f2f2;">Check-in</th>
        <td style="padding: 8px;">${bookingDetails.startDate}</td>
      </tr>
      <tr>
        <th style="text-align: left; padding: 8px; background-color: #f2f2f2;">Check-out</th>
        <td style="padding: 8px;">${bookingDetails.endDate}</td>
      </tr>
      <tr>
        <th style="text-align: left; padding: 8px; background-color: #f2f2f2;">Total Price</th>
        <td style="padding: 8px;">$${bookingDetails.totalPrice}</td>
      </tr>
    </table>
    <p>We look forward to hosting you. The property owner will soon verify your booking. If you have any questions, feel free to reach out to us.</p>
    <p>Best regards, <br/> The Team</p>
  </div>
`;

const bookingAlertHost = (host, customer, bookingDetails) => `
  <div style="font-family: Arial, sans-serif; color: #333;">
    <div style="text-align: center; margin-bottom: 20px;">
      <img src="https://res.cloudinary.com/dth5ysuhs/image/upload/v1727982120/bht7luklwho4nmcxy6fn.png" alt="NishLiving Logo">
    </div>
    <h2 style="color: #FF9800;">New Booking Alert</h2>
    <p>Dear ${host.name},</p>
    <p>A new booking has been made for your property by ${customer.name}.</p>
    <table style="width: 100%; border-collapse: collapse;">
      <tr>
        <th style="text-align: left; padding: 8px; background-color: #f2f2f2;">Customer Email</th>
        <td style="padding: 8px;">${customer.email}</td>
      </tr>
      <tr>
        <th style="text-align: left; padding: 8px; background-color: #f2f2f2;">Property</th>
        <td style="padding: 8px;">${bookingDetails.listingId}</td>
      </tr>
      <tr>
        <th style="text-align: left; padding: 8px; background-color: #f2f2f2;">Check-in</th>
        <td style="padding: 8px;">${bookingDetails.startDate}</td>
      </tr>
      <tr>
        <th style="text-align: left; padding: 8px; background-color: #f2f2f2;">Check-out</th>
        <td style="padding: 8px;">${bookingDetails.endDate}</td>
      </tr>
      <tr>
        <th style="text-align: left; padding: 8px; background-color: #f2f2f2;">Total Price</th>
        <td style="padding: 8px;">$${bookingDetails.totalPrice}</td>
      </tr>
    </table>
    <p>Please review the booking details and prepare your property accordingly. Don't forget to send a verification email to ${customer.name} at ${customer.email}.</p>
    <p>Best regards, <br/> The Team</p>
  </div>
`;

module.exports = {
  bookingConfirmationCustomer,
  bookingAlertHost
};
