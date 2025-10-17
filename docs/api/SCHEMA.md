# GraphQL Schema Documentation

This document describes the complete GraphQL schema that the Rails backend should implement, based on the queries and mutations used by the frontend.

## Models

### User

```ruby
# app/models/user.rb
class User < ApplicationRecord
  has_secure_password
  
  has_and_belongs_to_many :projects
  
  validates :email, presence: true, uniqueness: true
  validates :name, presence: true
  validates :skills, presence: true
  
  # Fields:
  # - id: ID!
  # - name: String!
  # - email: String!
  # - password_digest: String! (not exposed in GraphQL)
  # - skills: [Skill!]!
  # - created_at: DateTime!
  # - updated_at: DateTime!
  
  # Associations:
  # - projects: [Project!]!
end
```

### Project

```ruby
# app/models/project.rb
class Project < ApplicationRecord
  has_and_belongs_to_many :users
  
  validates :name, presence: true
  validates :description, presence: true
  validates :contact_email, presence: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :slug, presence: true, uniqueness: true
  validates :status, presence: true
  
  before_validation :generate_slug, on: :create
  
  # Fields:
  # - id: ID!
  # - name: String!
  # - description: String!
  # - contact_email: String!
  # - slug: String!
  # - status: String! (or ProjectStatus enum)
  # - created_at: DateTime!
  # - updated_at: DateTime!
  
  # Associations:
  # - users: [User!]!
  
  private
  
  def generate_slug
    self.slug ||= name.parameterize
  end
end
```

### AuthToken

```ruby
# Not a model, returned by login mutation
class AuthToken
  attr_accessor :token
  
  def initialize(user)
    @token = JWT.encode({ user_id: user.id, exp: 24.hours.from_now.to_i }, Rails.application.secret_key_base)
  end
end
```

## Enums

### Skill

```ruby
# app/graphql/types/skill_enum.rb
module Types
  class SkillEnum < Types::BaseEnum
    # Add all skill values here, e.g.:
    value "JAVASCRIPT", "JavaScript programming"
    value "RUBY", "Ruby programming"
    value "PYTHON", "Python programming"
    value "REACT", "React framework"
    value "RAILS", "Ruby on Rails framework"
    value "NODE", "Node.js"
    value "GRAPHQL", "GraphQL"
    # ... add more skills as needed
  end
end
```

## GraphQL Types

### UserType

```graphql
type User {
  id: ID!
  name: String!
  email: String!
  skills: [Skill!]!
  createdAt: DateTime!
  updatedAt: DateTime!
  projects: [Project!]!
}
```

### ProjectType

```graphql
type Project {
  id: ID!
  name: String!
  description: String!
  contactEmail: String!
  slug: String!
  status: String!
  createdAt: DateTime!
  updatedAt: DateTime!
  users: [User!]!
}
```

### AuthPayload

```graphql
type AuthPayload {
  token: Token!
  user: User!
}

type Token {
  token: String!
}
```

## Input Types

### SignupInput

```graphql
input SignupInput {
  name: String!
  email: String!
  password: String!
  skills: [Skill!]!
}
```

### LoginInput

```graphql
input LoginInput {
  email: String!
  password: String!
}
```

### UpdateUserInput

```graphql
input UpdateUserInput {
  name: String
  email: String
  skills: [Skill!]
}
```

### ChangePasswordInput

```graphql
input ChangePasswordInput {
  currentPassword: String!
  newPassword: String!
}
```

### CreateProjectInput

```graphql
input CreateProjectInput {
  name: String!
  description: String!
  contactEmail: String!
  status: String!
}
```

### AddProjectInput

```graphql
input AddProjectInput {
  projectId: ID!
}
```

### AddUserInput

```graphql
input AddUserInput {
  userId: ID!
}
```

## Queries

### users

**Not currently used by frontend, but recommended to implement**

```graphql
query Users {
  users {
    id
    name
    email
    skills
    createdAt
    updatedAt
    projects {
      id
      name
      description
      contactEmail
      createdAt
    }
  }
}
```

### user

```graphql
query User($id: ID!) {
  user(id: $id) {
    id
    name
    email
    skills
    createdAt
    updatedAt
    projects {
      id
      name
      description
      contactEmail
      createdAt
    }
  }
}
```

**Implementation:**
```ruby
def user(id:)
  User.find(id)
end
```

### projects

```graphql
query AllProjects {
  projects {
    id
    name
    description
    contactEmail
    createdAt
    updatedAt
    slug
    status
    users {
      name
      email
      id
    }
  }
}
```

**Implementation:**
```ruby
def projects
  Project.all
end
```

### project

```graphql
query Project($id: ID!) {
  project(id: $id) {
    id
    name
    description
    contactEmail
    createdAt
    updatedAt
    slug
    status
    users {
      name
      email
      id
    }
  }
}
```

**Implementation:**
```ruby
def project(id:)
  Project.find(id)
end
```

### Skill Enum Introspection

```graphql
query Skills {
  __type(name: "Skill") {
    name
    enumValues {
      name
    }
  }
}
```

**Note:** This is a GraphQL introspection query that automatically works with the Skill enum.

## Mutations

### signup

```graphql
mutation Signup($input: SignupInput!) {
  signup(input: $input) {
    name
    id
    email
    skills
  }
}
```

**Implementation:**
```ruby
def signup(input:)
  user = User.new(
    name: input[:name],
    email: input[:email],
    password: input[:password],
    skills: input[:skills]
  )
  
  if user.save
    user
  else
    raise GraphQL::ExecutionError, user.errors.full_messages.join(", ")
  end
end
```

### login

```graphql
mutation Login($input: LoginInput!) {
  login(input: $input) {
    token {
      token
    }
    user {
      id
      email
      name
      projects {
        id
        name
        description
        contactEmail
        status
        createdAt
      }
      skills
    }
  }
}
```

**Implementation:**
```ruby
def login(input:)
  user = User.find_by(email: input[:email])
  
  if user&.authenticate(input[:password])
    token = AuthToken.new(user)
    { token: token, user: user }
  else
    raise GraphQL::ExecutionError, "Invalid email or password"
  end
end
```

### updateUser

```graphql
mutation UpdateUser($id: ID!, $input: UpdateUserInput!) {
  updateUser(id: $id, input: $input) {
    id
    name
    email
    skills
  }
}
```

**Implementation:**
```ruby
def update_user(id:, input:)
  user = User.find(id)
  
  if user.update(input.to_h.compact)
    user
  else
    raise GraphQL::ExecutionError, user.errors.full_messages.join(", ")
  end
end
```

**Note:** Requires authentication - user should only be able to update their own profile.

### changePassword

```graphql
mutation ChangePassword($id: ID!, $input: ChangePasswordInput!) {
  changePassword(id: $id, input: $input) {
    id
  }
}
```

**Implementation:**
```ruby
def change_password(id:, input:)
  user = User.find(id)
  
  if user.authenticate(input[:current_password])
    user.password = input[:new_password]
    if user.save
      user
    else
      raise GraphQL::ExecutionError, user.errors.full_messages.join(", ")
    end
  else
    raise GraphQL::ExecutionError, "Current password is incorrect"
  end
end
```

**Note:** Requires authentication - user should only be able to change their own password.

### createProject

```graphql
mutation CreateProject($input: CreateProjectInput!) {
  createProject(input: $input) {
    id
    name
    description
    status
    slug
  }
}
```

**Implementation:**
```ruby
def create_project(input:)
  project = Project.new(
    name: input[:name],
    description: input[:description],
    contact_email: input[:contact_email],
    status: input[:status]
  )
  
  if project.save
    project
  else
    raise GraphQL::ExecutionError, project.errors.full_messages.join(", ")
  end
end
```

**Note:** Requires authentication. Consider adding the current user to the project automatically.

### addProjectToUser

```graphql
mutation AddProjectToUser($id: ID!, $input: AddProjectInput!) {
  addProjectToUser(id: $id, input: $input) {
    id
    name
    email
    projects {
      id
      name
      description
      contactEmail
    }
  }
}
```

**Implementation:**
```ruby
def add_project_to_user(id:, input:)
  user = User.find(id)
  project = Project.find(input[:project_id])
  
  user.projects << project unless user.projects.include?(project)
  user.save!
  
  user
end
```

**Note:** Requires authentication - user should only be able to add projects to their own profile.

### addUserToProject

```graphql
mutation AddUserToProject($id: ID!, $input: AddUserInput!) {
  addUserToProject(id: $id, input: $input) {
    id
    name
    description
    contactEmail
    users {
      id
      name
      email
    }
  }
}
```

**Implementation:**
```ruby
def add_user_to_project(id:, input:)
  project = Project.find(id)
  user = User.find(input[:user_id])
  
  project.users << user unless project.users.include?(user)
  project.save!
  
  project
end
```

**Note:** Requires authentication. Consider adding authorization to ensure only project owners can add users.

## Authentication

The backend should implement JWT-based authentication:

1. **Login mutation** returns a JWT token
2. **Protected mutations** require the `Authorization: Bearer <token>` header
3. **Token validation** should decode the JWT and verify the user exists

### Example Current User Helper

```ruby
# app/graphql/graphql_controller.rb or similar
def current_user
  return nil unless request.headers['Authorization']
  
  token = request.headers['Authorization'].split(' ').last
  decoded = JWT.decode(token, Rails.application.secret_key_base, true, algorithm: 'HS256')
  User.find(decoded[0]['user_id'])
rescue JWT::DecodeError, ActiveRecord::RecordNotFound
  nil
end
```

## Database Schema

### users table (SQLite)

```ruby
create_table :users do |t|
  t.string :name, null: false
  t.string :email, null: false
  t.string :password_digest, null: false
  t.text :skills  # JSON array stored as text
  
  t.timestamps
end

add_index :users, :email, unique: true
```

**Note:** Skills are stored as JSON text in SQLite. Use `serialize :skills, type: Array, coder: JSON` in the model.

### projects table (SQLite)

```ruby
create_table :projects do |t|
  t.string :name, null: false
  t.text :description, null: false
  t.string :contact_email, null: false
  t.string :slug, null: false
  t.string :status, null: false
  
  t.timestamps
end

add_index :projects, :slug, unique: true
```

### projects_users join table (SQLite)

```ruby
create_table :projects_users, id: false do |t|
  t.belongs_to :project, null: false, foreign_key: true
  t.belongs_to :user, null: false, foreign_key: true
end

add_index :projects_users, [:project_id, :user_id], unique: true
```

## Notes for Implementation

1. **GraphQL Gem**: Use `graphql` gem (https://graphql-ruby.org/)
2. **Database**: SQLite3 for development/testing (easy setup, no separate server needed)
3. **Authentication**: Use `bcrypt` for password hashing and `jwt` for tokens
4. **CORS**: Configure CORS to allow frontend requests
5. **Validation**: Implement proper validation for all inputs
6. **Authorization**: Add authorization checks for protected mutations
7. **Error Handling**: Return meaningful error messages to the frontend
8. **Skills Array**: Store skills as JSON text field in SQLite (use `serialize :skills, type: Array, coder: JSON`)
9. **Dataloader**: Use GraphQL::Dataloader to prevent N+1 queries
10. **Testing**: Use RSpec with FactoryBot for testing GraphQL operations
