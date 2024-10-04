# NishLiving

<p align="center">
  <img src="https://img.shields.io/badge/Powered_by-Express.js-blue?style=for-the-badge&logo=express" alt="Powered by Express.js">
  <img src="https://img.shields.io/badge/Powered_by-React.js-blue?style=for-the-badge&logo=react" alt="Powered by React.js">
  <img src="https://img.shields.io/badge/Powered_by-Redux-blue?style=for-the-badge&logo=redux" alt="Powered by Redux">
  <img src="https://img.shields.io/badge/Powered_by-MongoDB-green?style=for-the-badge&logo=mongodb" alt="Powered by MongoDB">
  <!-- <img src="https://img.shields.io/badge/Powered_by-Node.js-green?style=for-the-badge&logo=node.js" alt="Powered by Node.js">
  <img src="https://img.shields.io/badge/Powered_by-SCSS-pink?style=for-the-badge&logo=sass" alt="Powered by SCSS"> -->
</p>

Welcome to **NishLiving**, a comprehensive platform for property listings and bookings. This project leverages modern web technologies to provide a seamless experience for users looking to list their properties and for customers looking to book accommodations.

<p align="center">
  <img src="server\uploads\preview.png" width="1000" alt="Decentralized Exchange">
</p>

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

- **User Authentication**: Secure login and registration for users.
- **Property Listings**: Users can create, update, and delete property listings.
- **Image Upload**: Images are uploaded and stored using Cloudinary.
- **Booking System**: Customers can book properties and receive email confirmations.
- **Search and Filter**: Advanced search and filter options for property listings.
- **Responsive Design**: Fully responsive design for all devices.

## Technologies Used

- **Frontend**: React, Redux, SCSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Image Storage**: Cloudinary
- **Email Service**: Nodemailer
- **Logging**: Winston

## Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/NishLiving.git
    cd NishLiving
    ```

2. **Install dependencies**:
    ```bash
    # For backend
    cd server
    npm install

    # For frontend
    cd ../client
    npm install
    ```

3. **Set up environment variables**:
    Create a `.env` file in the `server` directory and add the following:
    ```env
    CLOUDINARY_CLOUD_NAME=your_cloud_name
    CLOUDINARY_API_KEY=your_api_key
    CLOUDINARY_API_SECRET=your_api_secret
    MONGO_URI=your_mongo_uri
    JWT_SECRET=your_jwt_secret
    EMAIL_USER=your_email
    EMAIL_PASS=your_email_password
    ```

4. **Run the application**:
    ```bash
    # Start backend server
    cd server
    npm start

    # Start frontend server
    cd ../client
    npm start
    ```

## Usage

1. **Register and Login**: Create an account or log in with existing credentials.
2. **Create a Listing**: Navigate to the "Create Listing" page and fill out the property details.
3. **Upload Images**: Upload images for your property, which will be stored on Cloudinary.
4. **Search and Book**: Use the search functionality to find properties and book them.
5. **Email Notifications**: Receive email notifications for bookings.

## API Endpoints

### User Routes

- **POST** `/api/users/register`: Register a new user.
- **POST** `/api/users/login`: Login a user.

### Listing Routes

- **POST** `/api/listings/create`: Create a new listing.
- **GET** `/api/listings`: Get all listings.
- **GET** `/api/listings/search/:search`: Search listings.
- **GET** `/api/listings/:listingId`: Get listing details.

### Booking Routes

- **POST** `/api/bookings/create`: Create a new booking.

## Contributing

We welcome contributions from the community! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any inquiries or feedback, please contact us at:

- **Email**: support@nishliving.com
- **GitHub**: [yourusername](https://github.com/anandpiyush1521)

---

Thank you for using NishLiving! We hope you have a great experience.