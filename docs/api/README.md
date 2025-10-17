# API Documentation

Complete GraphQL API documentation for the Non Profit Devs platform.

## Quick Links

- **[Complete GraphQL Schema](./SCHEMA.md)** - Full schema with all types, queries, mutations, and implementation details
- **[Backend Setup Guide](../../backend/README.md)** - Rails backend setup instructions

## Overview

The Non Profit Devs API is a GraphQL API built with Ruby on Rails. It provides functionality for:

- User authentication and management
- Project creation and management
- User-to-project associations
- Skills tracking

## API Endpoint

```
POST /graphql
```

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-token>
```

Get a token by calling the `login` mutation with valid credentials.

## Quick Start

### 1. Sign Up

```graphql
mutation {
  signup(input: {
    name: "John Doe"
    email: "john@example.com"
    password: "securepassword"
    skills: [JAVASCRIPT, REACT, NODEJS]
  }) {
    id
    name
    email
    skills
  }
}
```

### 2. Login

```graphql
mutation {
  login(input: {
    email: "john@example.com"
    password: "securepassword"
  }) {
    token {
      token
    }
    user {
      id
      name
      email
      skills
    }
  }
}
```

### 3. Query Projects

```graphql
query {
  projects {
    id
    name
    description
    contactEmail
    status
    users {
      name
      email
    }
  }
}
```

### 4. Create Project

```graphql
mutation {
  createProject(input: {
    name: "My Nonprofit Project"
    description: "A project to help the community"
    contactEmail: "contact@project.org"
    status: "active"
  }) {
    id
    name
    slug
  }
}
```

## Schema Summary

### Types

- **User** - Developer or organization member
- **Project** - Nonprofit project
- **AuthPayload** - Login response with token and user
- **Token** - JWT authentication token

### Enums

- **Skill** - Programming skills and technologies

### Queries

- `user(id: ID!)` - Get user by ID
- `projects` - Get all projects
- `project(id: ID!)` - Get project by ID

### Mutations

- `signup(input: SignupInput!)` - Create new user account
- `login(input: LoginInput!)` - Authenticate and get token
- `updateUser(id: ID!, input: UpdateUserInput!)` - Update user profile
- `changePassword(id: ID!, input: ChangePasswordInput!)` - Change user password
- `createProject(input: CreateProjectInput!)` - Create new project
- `addProjectToUser(id: ID!, input: AddProjectInput!)` - Add project to user's projects
- `addUserToProject(id: ID!, input: AddUserInput!)` - Add user to project team

## Input Types

- **SignupInput** - User registration data
- **LoginInput** - Login credentials
- **UpdateUserInput** - User profile updates
- **ChangePasswordInput** - Password change data
- **CreateProjectInput** - New project data
- **AddProjectInput** - Project ID to add to user
- **AddUserInput** - User ID to add to project

## Error Handling

The API returns GraphQL errors in the standard format:

```json
{
  "errors": [
    {
      "message": "Invalid email or password",
      "locations": [...],
      "path": [...]
    }
  ]
}
```

Common error scenarios:
- Invalid credentials (login)
- Validation errors (signup, create operations)
- Unauthorized access (protected mutations)
- Record not found (invalid IDs)

## Rate Limiting

*To be implemented*

## Full Documentation

For complete schema documentation including:
- Detailed field descriptions
- Implementation examples
- Database schema
- Authorization requirements

See **[SCHEMA.md](./SCHEMA.md)**
