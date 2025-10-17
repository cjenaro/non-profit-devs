# API Documentation

## GraphQL Schema

### Models

Document your models here as you build them.

#### Example Model Structure

```
Model: User
Fields:
  - id: ID!
  - email: String!
  - name: String
  - createdAt: DateTime!
  - updatedAt: DateTime!

Associations:
  - has_many :projects
```

### Queries

Document all GraphQL queries here.

#### Example Query

```graphql
query GetUser($id: ID!) {
  user(id: $id) {
    id
    email
    name
  }
}
```

**Description:** Fetches a single user by ID

**Arguments:**
- `id` (ID!, required): The user's unique identifier

**Returns:** User object or null

### Mutations

Document all GraphQL mutations here.

#### Example Mutation

```graphql
mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
    user {
      id
      email
      name
    }
    errors
  }
}
```

**Description:** Creates a new user

**Arguments:**
- `input` (CreateUserInput!, required): User creation data
  - `email` (String!, required)
  - `name` (String)

**Returns:** CreateUserPayload with user object and errors array

### Subscriptions

Document any GraphQL subscriptions here.

---

## Models Reference

### User
*To be documented*

### Project
*To be documented*

### Organization
*To be documented*

---

## Queries Reference

### users
*To be documented*

### projects
*To be documented*

---

## Mutations Reference

### createUser
*To be documented*

### updateUser
*To be documented*

### createProject
*To be documented*
