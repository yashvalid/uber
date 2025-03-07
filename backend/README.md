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
