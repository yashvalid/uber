# User Registration Endpoint

## POST /users/register

### Description
This endpoint is used to register a new user. It requires the user's first name, last name, email, and password.

### Request Body
The request body should be a JSON object containing the following fields:
- `fullname.firstname` (string, required): The first name of the user. Must be at least 2 characters long.
- `fullname.lastname` (string, optional): The last name of the user.
- `email` (string, required): The email address of the user. Must be a valid email format.
- `password` (string, required): The password for the user. Must be at least 6 characters long.

### Response
- `200 OK`: Registration successful. Returns a JSON object containing the authentication token and user details.
- `400 Bad Request`: Validation error. Returns a JSON object containing the validation errors.

### Example Request
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}
```

### Example Response
```json
{
  "token": "your_jwt_token",
  "user": {
    "_id": "user_id",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

# User Login Endpoint

## POST /users/login

### Description
This endpoint allows a user to log in by providing their email and password.

### Request Body
The request body should be a JSON object containing the following fields:
- `email` (string, required): The email address of the user.
- `password` (string, required): The password of the user.

### Response
- `200 OK`: Login successful. Returns a JSON object containing the authentication token and user details.
- `400 Bad Request`: Validation error. Returns a JSON object containing the validation errors.
- `401 Unauthorized`: Invalid email or password. Returns a JSON object with an error message.

### Example Request
```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

### Example Response
```json
{
  "token": "your_jwt_token",
  "user": {
    "_id": "user_id",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

# User Profile Endpoint

## GET /users/profile

### Description
This endpoint retrieves the profile information of the authenticated user.

### Response
- `200 OK`: Returns a JSON object containing the user details.
- `401 Unauthorized`: User is not authenticated. Returns a JSON object with an error message.

### Example Response
```json
{
  "_id": "user_id",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com"
}
```

# User Logout Endpoint

## GET /users/logout

### Description
This endpoint logs out the authenticated user by clearing the authentication token.

### Response
- `200 OK`: Logout successful. Returns a JSON object with a success message.
- `401 Unauthorized`: User is not authenticated. Returns a JSON object with an error message.

### Example Response
```json
{
  "message": "logout success"
}
```
