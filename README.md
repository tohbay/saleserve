# saleserve

"Welcome to saleserve API, a standard REST API system for an e-commerce website 👍🏼 🌍 ⚡️ 🥂 🏆

## Technologies Used

- Nodejs: an open source server framework that allows you to run JavaScript on the server.
- Express: open source server-side framework for starting out Javascript server quickly on the fly.
- PostgreSQL database for storing user data (ElephantSQL for production and local setup for development and testing).
- Sequelize ORM for interacting with the database.
- Prettier for code formatting.
- Mocha and Supertest for Testing Driven Development (TDD).
- Hosting with Heroku

## Live URL

https://saleserve.herokuapp.com/

## API endpoints

| HTTP VERB | ENDPOINT                                        | FUNCTIONALITY                                     |
| --------- | ------------------------------------------------| --------------------------------------------------|
| POST      | api/v1/users/auth/signin                        | Signup a user                                     |
| POST      | api/v1/users/auth/signup                        | Signin a user                                     |
| POST      | api/v1/users/auth/signout                       | Signout a user                                    |
| POST      | api/v1/products                                 | Add a product                                     |
| GET       | api/v1/products                                 | Fetch all products                                |


## Upcoming API endpoints in order of priority

| HTTP VERB | ENDPOINT                                        | FUNCTIONALITY                                     |
| --------- | ----------------------------------------------- | ------------------------------------------------- |
| GET       | api/v1/products/:productName                    | Fetch a specific product                          |
| GET       | api/v1/users                                    | Fetch all users                                   |
| GET       | api/v1/users/:email                             | Fetch a specific user                             |
| PATCH     | api/v1/products/:productName                    | Update a product detail                           |
| DELETE    | api/v1/products/:productName                    | Delete a product                                  |


## Guide

### API Specifications

The API endpoints should respond with a JSON object specifying the HTTP **_status_** code, custom response message **_message_** code, and either a **_data_** property (on success) or an **_error_** property (on failure).

```javascript
// Sucess
{
  "status": true,
  "message": {...}
  "data": {...}
}

// Failure
{
  "error": true,
  "message": {...}
}
```

### Data Specifications

These specifications are only a guide to aid in developing the application. You have the freedom to come up with your own specifications, as long as the API functions properly and returns appropriate responses.

```javascript
// user
{
  "id": UUIDV4,
  "username": STRING,  // any string e.g:  testing
  "email": STRING,     // any string e.g:  testing
  "passowrd": STRING,  // any string e.g:  testing
  "userType": STRING    // to be set to "user" by default but if a specific email and password is received, user is automatically set to "super-admin"
}

// product
{
  "id": UUIDV4,
  "title": STRING,  
  "description": STRING,     
  "category": ENUM,          // laptop, phone, accessories
  "price": FLOAT,            // e.g: 100.00
  "quantity": INTEGER,
}

// order
{
  "id": UUIDV4,
  "OrderProductTitle": STRING,        // e.g: 100.00
  "quantity": INTEGER,                // e.g: 50
}
```

### Endpoint Specifications

#### User Signup

```javascript

POST /api/v1/auth/signup

- Input
{
 "username": STRING,    // any string e.g:  testing
 "email": STRING,       // any string e.g:  testing
 "passowrd": STRING,    // any string e.g:  testing
}
```

#### User Signin

```javascript

POST /api/v1/auth/signin

- Input
{
 "email": STRING,     // any string e.g:  testing
 "passowrd": STRING,  // any string e.g:  testing
}
```

#### User Signout

```javascript

POST /api/v1/auth/signout

 No input       // clear set JWT cookie

```

#### Add Product

```javascript

POST /api/v1/products    // requires JWT authorization

- Input
{
  title: 'Dell Inspiron',
  description: 'The latest laptop for 2020',
  category: 'laptop',
  price: 50.00,
  quantity: 5  
}
```

## Author

[Tobechukwu Obitube](https://www.linkedin.com/in/tohbay/)

### NB:

This project is still ongoing.
Your kind reviews are highly appreciated.

