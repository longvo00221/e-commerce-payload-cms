# E-commerce Platform

Welcome to the E-commerce Platform repository! This project is developed using Next.js, GraphQL, MongoDB, and Payload CMS. It provides a comprehensive solution for building a full-fledged e-commerce website with powerful features for both customers and administrators.

## Features

### Customer Features
- **Product Listing**: View a list of available products.
- **Product Details**: View detailed information about a product, including specifications and descriptions.
- **Add to Cart**: Add products to the shopping cart.
- **International Checkout**: Complete the checkout process with options for international payment and cash on delivery.
- **Order History**: View the list of past orders and order details.
- **Service Listings**: View services such as repair, battery replacement, screen replacement, and device upgrades.

### Admin Features
- **Product Management**: Add, edit, and delete products.
- **Service Management**: Add, edit, and delete services.
- **Category Management**: Add, edit, and delete product categories.
- **Dashboard**: Manage revenue and view sales statistics.
- **Language Customization**: Customize the application to support multiple languages.

## Getting Started

### Prerequisites
- Node.js (version 14.x or higher)
- MongoDB

### Installation
1. **Clone the repository**
    ```bash
    git clone https://github.com/longvo00221/e-commerce-payload-cms.git
    cd e-commerce-payload-cms    ```

2. **Install dependencies**
    ```bash
    npm install
    ```

3. **Run the development server**
    ```bash
    npm run dev
    ```

4. **Open your browser and visit**
    ```
    http://localhost:3000
    ```

## Configuration
Create a `.env` file in the root directory and add the following environment variables:
```
MONGODB_URI=<Your MongoDB connection string>
NEXT_PUBLIC_API_URL=<Your API URL>
PAYLOAD_SECRET=<Your Payload CMS secret>
```

## Deployment
To deploy the application, follow these steps:
1. Build the application
    ```bash
    npm run build
    ```

2. Start the production server
    ```bash
    npm start
    ```

## Contributing
We welcome contributions! Please follow these steps to contribute:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add new feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Create a pull request.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact
If you have any questions or need further assistance, feel free to contact us at longvo010203@gmail.com