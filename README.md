# Backend Setup

## Requirements

- Node.js (>= v14.x)
- MongoDB

## Setup Instructions

1. **Clone the repository**:

   ```bash
   git clone <repository_url>
   cd <project_directory>
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Environment variables**:
   Create a `.env` file in the root directory of the project and add the following variables:

   ```bash
   MONGODB_URI=<your_mongo_connection_string>
   PORT=<your_port>
   ```

   Replace `<your_mongo_connection_string>` with your actual MongoDB connection string.
   Default port is 6700.

4. **Run the application**:

   ```bash
   npm start
   ```

   The server will start at `http://127.0.0.1:<port>/`.

## MongoDB

For this project, **MongoDB** has been chosen as the database due to the following reasons:

- **Flexibility**: MongoDB offers a flexible, schema-less design which allows easy and quick iterations during development. Given that the app handles varying structures of user orders and cart items, MongoDB allows for seamless storage and retrieval without needing to define a rigid schema for every item.

- **Scalability**: MongoDB scales well horizontally, which is an advantage when dealing with large amounts of data. As this application grows, the ability to scale across multiple servers would be easier with MongoDB.

- **Document-Oriented**: The application's data, like user orders and menu items, fits well into MongoDB's document-oriented model. It stores data in JSON-like documents, which makes it easy to manipulate and retrieve nested or complex data.

---

## API Endpoints

1. **GET /menu/items**

   - Retrieves all menu items.
   - **Response**: List of menu items.

2. **POST /order**

   - Places an order for a user.
   - **Request Body**:
     ```json
     {
       "user": {
         "name": "John Doe",
         "phone": "1234567890"
       },
       "cartItems": [
         {
           "id": "60e6f1d4c76b5d3b3c81d8d5",
           "quantity": 2
         }...
       ]
     }
     ```
   - **Response**: Order confirmation with the placed order details.

3. **GET /orders**
   - Retrieves orders for a specific user based on their phone number.
   - **Query Parameters**: `phone`
   - **Response**: List of orders associated with the provided phone number.

---

## Conclusion

This is a simple and effective backend solution using Node.js, Express, and MongoDB. The application allows users to place orders and view their order history, and the flexible nature of MongoDB ensures scalability and adaptability for future features.
