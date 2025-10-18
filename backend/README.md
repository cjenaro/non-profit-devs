# Non Profit Devs - Rails Backend

Rails API with GraphQL for the Non Profit Devs platform.

## 📋 Implementation Status Tracker

Use this checklist to track implementation progress:

- [x] **Step 1: Initial Rails Setup** (Foundation) ✅ COMPLETED
- [x] **Step 2: Add Core Dependencies** (Gems) ✅ COMPLETED
- [x] **Step 3: Install GraphQL** (GraphQL setup) ✅ COMPLETED
- [x] **Step 4: Configure CORS** (Frontend integration) ✅ COMPLETED
- [x] **Step 5: Create Database Models** (User & Project) ✅ COMPLETED
- [ ] **Step 6: Setup GraphQL Types** (Type definitions)
- [ ] **Step 7: Implement Queries** (Read operations)
- [ ] **Step 8: Implement Mutations** (Write operations)
- [ ] **Step 9: Add Authentication** (JWT auth)
- [ ] **Step 10: Setup Dataloader** (N+1 optimization)
- [ ] **Step 11: Configure Apollo Client** (Frontend client)
- [ ] **Step 12: Add Seeds** (Sample data)
- [ ] **Step 13: Testing Setup** (RSpec)
- [ ] **Step 14: Documentation** (GraphiQL & schema export)

**Current Status:** Step 5 completed - Ready for Step 6

---

## Tech Stack

- **Ruby on Rails 8.x** (API mode)
- **SQLite3** database (development/test)
- **GraphQL** via `graphql` gem
- **GraphQL::Dataloader** for N+1 query optimization
- **JWT** authentication via `jwt` gem
- **BCrypt** for password hashing
- **Rack CORS** for cross-origin requests
- **GraphiQL** for GraphQL playground (development)

## Prerequisites

- Ruby 3.0 or higher
- Bundler 2.x
- SQLite3

Check your versions:

```bash
ruby -v        # Should be 3.0+
bundle -v      # Should be 2.0+
sqlite3 --version
```

---

# 🚀 Step-by-Step Implementation Guide

## Step 1: Initial Rails Setup ✅ COMPLETED

**Goal:** Create the Rails API application with SQLite

**Status:** ✅ Completed

This step has been completed. The Rails API application has been created with:

- API-only mode
- SQLite3 database
- Monorepo-friendly setup (no new git repo)

---

## Step 2: Add Core Dependencies ✅ COMPLETED

**Goal:** Add required gems to Gemfile

**Status:** ✅ Completed

**Depends on:** Step 1 ✅

### Using `bundle add` (recommended):

```bash
cd backend

# Core gems
bundle add graphql --version "~> 2.3"
bundle add jwt --version "~> 2.8"
bundle add bcrypt --version "~> 3.1.7"
bundle add rack-cors --version "~> 2.0"

# Development only
bundle add graphiql-rails --version "~> 1.10" --group development

# Testing (optional - can be added later)
bundle add rspec-rails --version "~> 6.1" --group "development,test"
bundle add factory_bot_rails --version "~> 6.4" --group "development,test"
bundle add faker --version "~> 3.2" --group "development,test"
```

**OR manually edit Gemfile and run `bundle install`:**

Add these gems:

```ruby
# GraphQL
gem 'graphql', '~> 2.3'

# GraphQL development tools
group :development do
  gem 'graphiql-rails', '~> 1.10'
end

# Authentication
gem 'jwt', '~> 2.8'
gem 'bcrypt', '~> 3.1.7'

# CORS
gem 'rack-cors', '~> 2.0'

# Testing (optional)
group :development, :test do
  gem 'rspec-rails', '~> 6.1'
  gem 'factory_bot_rails', '~> 6.4'
  gem 'faker', '~> 3.2'
end
```

**Verify:**
```bash
bundle list | grep graphql
# Should show: graphql, graphiql-rails
```

### Install gems:

```bash
cd backend
bundle install
```

**Expected Result:**

- All gems installed successfully
- `Gemfile.lock` updated

**Verify:**

```bash
bundle list | grep graphql
# Should show: graphql, graphiql-rails
```

---

## Step 3: Install GraphQL ✅ COMPLETED

**Goal:** Generate GraphQL boilerplate and configure

**Status:** ✅ Completed

**Depends on:** Step 2 ✅

This step has been completed. The following was created:

- ✅ `app/graphql/types/` - GraphQL type definitions
- ✅ `app/graphql/mutations/` - GraphQL mutations
- ✅ `app/graphql/backend_schema.rb` - Main GraphQL schema
- ✅ `app/controllers/graphql_controller.rb` - GraphQL endpoint controller
- ✅ GraphiQL route configured in `config/routes.rb`

**What was done:**

1. Ran `rails generate graphql:install`
2. Manually added GraphiQL route to `config/routes.rb`:

```ruby
if Rails.env.development?
  mount GraphiQL::Rails::Engine, at: "/graphiql", graphql_path: "/graphql"
end
```

**Verify:**
```bash
# Start Rails server
rails server -p 3000

# Visit in browser:
# http://localhost:3000/graphiql

# You should see GraphiQL interface
```

**Test Query:**
```graphql
{
  __schema {
    types {
      name
    }
  }
}
```

### Configure GraphiQL (development only):

Add to `config/routes.rb`:

```ruby
Rails.application.routes.draw do
  if Rails.env.development?
    mount GraphiQL::Rails::Engine, at: "/graphiql", graphql_path: "/graphql"
  end

  post "/graphql", to: "graphql#execute"
end
```

**Expected Result:**

- GraphQL directory structure created
- GraphQL controller created
- Routes configured

**Verify:**

```bash
# Start Rails server
rails server -p 3000

# Visit in browser:
# http://localhost:3000/graphiql

# You should see GraphiQL interface
```

**Test Query:**

```graphql
{
  __schema {
    types {
      name
    }
  }
}
```

---

## Step 4: Configure CORS ✅ COMPLETED

**Goal:** Allow frontend (http://localhost:5173) to make requests

**Status:** ✅ Completed

**Depends on:** Step 2 ✅

This step has been completed. CORS is now configured to allow requests from the frontend.

**What was done:**

1. Enabled CORS in `config/initializers/cors.rb`:

```ruby
Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    # Allow requests from frontend
    # In development: http://localhost:5173
    # In production: will be same domain, so CORS won't be needed
    origins ENV.fetch('FRONTEND_URL', 'http://localhost:5173')

    resource '/graphql',
      headers: :any,
      methods: [:get, :post, :options],
      credentials: true,
      expose: ['Authorization']
  end
end
```

2. Created `.env` file for environment variables:

```bash
# backend/.env
FRONTEND_URL=http://localhost:5173
```

**Note:** When deployed on the same domain, CORS won't be needed. The configuration uses `ENV.fetch('FRONTEND_URL', 'http://localhost:5173')` which defaults to localhost for development.

**Important:** After making CORS changes, restart your Rails server:

```bash
# Stop current server (Ctrl+C), then:
rails server -p 3000
```

---

## Step 5: Create Database Models ✅ COMPLETED

**Goal:** Generate User and Project models with associations

**Status:** ✅ Completed

**Depends on:** Step 1 ✅

This step has been completed. All database models, migrations, and associations have been created and verified against the frontend requirements.

### Generate User model:

```bash
rails generate model User \
  name:string \
  email:string:uniq \
  password_digest:string \
  skills:text

# Verify migration file created in db/migrate/
```

### Generate Project model:

```bash
rails generate model Project \
  name:string \
  description:text \
  contact_email:string \
  slug:string:uniq \
  status:string

# Verify migration file created
```

### Generate join table:

```bash
rails generate migration CreateJoinTableProjectsUsers projects users

# This creates a many-to-many relationship
```

### Edit migrations to add constraints:

**Edit the User migration:**

```ruby
# db/migrate/XXXXXX_create_users.rb
class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :name, null: false
      t.string :email, null: false
      t.string :password_digest, null: false
      t.text :skills # Will store JSON array

      t.timestamps
    end

    add_index :users, :email, unique: true
  end
end
```

**Edit the Project migration:**

```ruby
# db/migrate/XXXXXX_create_projects.rb
class CreateProjects < ActiveRecord::Migration[7.0]
  def change
    create_table :projects do |t|
      t.string :name, null: false
      t.text :description, null: false
      t.string :contact_email, null: false
      t.string :slug, null: false
      t.string :status, null: false

      t.timestamps
    end

    add_index :projects, :slug, unique: true
  end
end
```

### Add model validations and associations:

**Edit `app/models/user.rb`:**

```ruby
class User < ApplicationRecord
  has_secure_password

  has_and_belongs_to_many :projects

  validates :name, presence: true
  validates :email, presence: true, uniqueness: true,
            format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :skills, presence: true

  # Serialize skills as JSON array
  serialize :skills, type: Array, coder: JSON
end
```

**Edit `app/models/project.rb`:**

```ruby
class Project < ApplicationRecord
  has_and_belongs_to_many :users

  validates :name, presence: true
  validates :description, presence: true
  validates :contact_email, presence: true,
            format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :slug, presence: true, uniqueness: true
  validates :status, presence: true

  before_validation :generate_slug, on: :create

  private

  def generate_slug
    self.slug ||= name.parameterize if name.present?
  end
end
```

### Run migrations:

```bash
rails db:migrate

# Verify tables created
rails db:schema:dump

# Check db/schema.rb to see the structure
```

**Expected Result:**

- 3 tables created: `users`, `projects`, `projects_users`
- Models have validations and associations
- `db/schema.rb` updated

**Verify:**

```bash
rails console

# Test User creation
User.create!(name: "Test", email: "test@example.com", password: "password123", skills: ["RUBY", "RAILS"])

# Test Project creation
Project.create!(name: "Test Project", description: "A test", contact_email: "test@project.org", status: "active")

exit
```

---

## Step 6: Setup GraphQL Types

**Goal:** Create GraphQL types for User, Project, and Skill enum

**Status:** ⬜ Not Started

**Depends on:** Step 3, Step 5

### Create Skill Enum:

```bash
rails generate graphql:enum Skill
```

**Edit `app/graphql/types/skill_enum.rb`:**

```ruby
module Types
  class SkillEnum < Types::BaseEnum
    description "Programming skills and technologies"

    value "JAVASCRIPT", "JavaScript programming"
    value "TYPESCRIPT", "TypeScript programming"
    value "RUBY", "Ruby programming"
    value "PYTHON", "Python programming"
    value "JAVA", "Java programming"
    value "CSHARP", "C# programming"
    value "PHP", "PHP programming"
    value "GO", "Go programming"
    value "RUST", "Rust programming"

    value "REACT", "React framework"
    value "ANGULAR", "Angular framework"
    value "VUE", "Vue.js framework"
    value "RAILS", "Ruby on Rails framework"
    value "DJANGO", "Django framework"
    value "FLASK", "Flask framework"
    value "SPRING", "Spring framework"
    value "DOTNET", ".NET framework"

    value "NODEJS", "Node.js runtime"
    value "GRAPHQL", "GraphQL"
    value "REST", "REST APIs"
    value "SQL", "SQL databases"
    value "NOSQL", "NoSQL databases"
    value "MONGODB", "MongoDB"
    value "POSTGRESQL", "PostgreSQL"
    value "MYSQL", "MySQL"
    value "REDIS", "Redis"

    value "AWS", "Amazon Web Services"
    value "AZURE", "Microsoft Azure"
    value "GCP", "Google Cloud Platform"
    value "DOCKER", "Docker"
    value "KUBERNETES", "Kubernetes"

    value "HTML", "HTML"
    value "CSS", "CSS"
    value "SASS", "Sass/SCSS"
    value "TAILWIND", "Tailwind CSS"

    value "GIT", "Git version control"
    value "CI_CD", "CI/CD"
    value "TESTING", "Software testing"
    value "AGILE", "Agile methodologies"
  end
end
```

### Create User Type:

```bash
rails generate graphql:object User
```

**Edit `app/graphql/types/user_type.rb`:**

```ruby
module Types
  class UserType < Types::BaseObject
    description "A developer or organization member"

    field :id, ID, null: false
    field :name, String, null: false
    field :email, String, null: false
    field :skills, [Types::SkillEnum], null: false
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false

    field :projects, [Types::ProjectType], null: false

    # Don't expose password_digest!
  end
end
```

### Create Project Type:

```bash
rails generate graphql:object Project
```

**Edit `app/graphql/types/project_type.rb`:**

```ruby
module Types
  class ProjectType < Types::BaseObject
    description "A nonprofit project"

    field :id, ID, null: false
    field :name, String, null: false
    field :description, String, null: false
    field :contact_email, String, null: false
    field :slug, String, null: false
    field :status, String, null: false
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false

    field :users, [Types::UserType], null: false
  end
end
```

### Create Auth Types:

**Create `app/graphql/types/token_type.rb`:**

```ruby
module Types
  class TokenType < Types::BaseObject
    description "JWT authentication token"

    field :token, String, null: false
  end
end
```

**Create `app/graphql/types/auth_payload_type.rb`:**

```ruby
module Types
  class AuthPayloadType < Types::BaseObject
    description "Authentication payload with token and user"

    field :token, Types::TokenType, null: false
    field :user, Types::UserType, null: false
  end
end
```

**Expected Result:**

- GraphQL types created for all models
- Enum type created for Skills

**Verify:**

```bash
# Start server and visit GraphiQL
rails server -p 3000

# Query schema docs in GraphiQL to see types
```

---

## Step 7: Implement Queries

**Goal:** Add GraphQL queries for users and projects

**Status:** ⬜ Not Started

**Depends on:** Step 6

### Edit `app/graphql/types/query_type.rb`:

```ruby
module Types
  class QueryType < Types::BaseObject
    description "The query root of this schema"

    # Field: user(id: ID!)
    field :user, Types::UserType, null: true do
      description "Find a user by ID"
      argument :id, ID, required: true
    end

    def user(id:)
      User.find(id)
    rescue ActiveRecord::RecordNotFound
      nil
    end

    # Field: users
    field :users, [Types::UserType], null: false do
      description "List all users"
    end

    def users
      User.all
    end

    # Field: project(id: ID!)
    field :project, Types::ProjectType, null: true do
      description "Find a project by ID"
      argument :id, ID, required: true
    end

    def project(id:)
      Project.find(id)
    rescue ActiveRecord::RecordNotFound
      nil
    end

    # Field: projects
    field :projects, [Types::ProjectType], null: false do
      description "List all projects"
    end

    def projects
      Project.all
    end
  end
end
```

**Expected Result:**

- 4 queries implemented: `user`, `users`, `project`, `projects`

**Verify in GraphiQL:**

```graphql
query {
  projects {
    id
    name
    description
  }
}
```

---

## Step 8: Implement Mutations

**Goal:** Create all mutations for auth and CRUD operations

**Status:** ⬜ Not Started

**Depends on:** Step 6

### Create Input Types:

**Create `app/graphql/types/signup_input_type.rb`:**

```ruby
module Types
  class SignupInput < Types::BaseInputObject
    description "Attributes for signing up a new user"

    argument :name, String, required: true
    argument :email, String, required: true
    argument :password, String, required: true
    argument :skills, [Types::SkillEnum], required: true
  end
end
```

**Create `app/graphql/types/login_input_type.rb`:**

```ruby
module Types
  class LoginInput < Types::BaseInputObject
    description "Attributes for logging in"

    argument :email, String, required: true
    argument :password, String, required: true
  end
end
```

**Create other input types:** `UpdateUserInput`, `ChangePasswordInput`, `CreateProjectInput`, `AddUserInput`, `AddProjectInput`

### Generate Mutations:

```bash
# Generate mutation files
rails generate graphql:mutation Signup
rails generate graphql:mutation Login
rails generate graphql:mutation UpdateUser
rails generate graphql:mutation ChangePassword
rails generate graphql:mutation CreateProject
rails generate graphql:mutation AddUserToProject
rails generate graphql:mutation AddProjectToUser
```

### Implement each mutation:

**Example: `app/graphql/mutations/signup.rb`:**

```ruby
module Mutations
  class Signup < BaseMutation
    description "Create a new user account"

    argument :input, Types::SignupInput, required: true

    field :user, Types::UserType, null: true
    field :errors, [String], null: false

    def resolve(input:)
      user = User.new(
        name: input[:name],
        email: input[:email],
        password: input[:password],
        skills: input[:skills]
      )

      if user.save
        { user: user, errors: [] }
      else
        { user: nil, errors: user.errors.full_messages }
      end
    end
  end
end
```

**Example: `app/graphql/mutations/login.rb`:**

```ruby
module Mutations
  class Login < BaseMutation
    description "Authenticate user and return JWT token"

    argument :input, Types::LoginInput, required: true

    field :token, Types::TokenType, null: true
    field :user, Types::UserType, null: true
    field :errors, [String], null: false

    def resolve(input:)
      user = User.find_by(email: input[:email])

      if user&.authenticate(input[:password])
        token = generate_token(user)
        {
          token: { token: token },
          user: user,
          errors: []
        }
      else
        { token: nil, user: nil, errors: ["Invalid email or password"] }
      end
    end

    private

    def generate_token(user)
      payload = {
        user_id: user.id,
        exp: 24.hours.from_now.to_i
      }

      JWT.encode(payload, Rails.application.secret_key_base)
    end
  end
end
```

### Register mutations in `app/graphql/types/mutation_type.rb`:

```ruby
module Types
  class MutationType < Types::BaseObject
    field :signup, mutation: Mutations::Signup
    field :login, mutation: Mutations::Login
    field :update_user, mutation: Mutations::UpdateUser
    field :change_password, mutation: Mutations::ChangePassword
    field :create_project, mutation: Mutations::CreateProject
    field :add_user_to_project, mutation: Mutations::AddUserToProject
    field :add_project_to_user, mutation: Mutations::AddProjectToUser
  end
end
```

**Expected Result:**

- All 7 mutations implemented
- Input types created
- Mutations registered in mutation root

**Verify in GraphiQL:**

```graphql
mutation {
  signup(
    input: {
      name: "Jane Doe"
      email: "jane@example.com"
      password: "password123"
      skills: [RUBY, RAILS, GRAPHQL]
    }
  ) {
    user {
      id
      name
      email
    }
    errors
  }
}
```

---

## Step 9: Add Authentication

**Goal:** Protect mutations with JWT authentication

**Status:** ⬜ Not Started

**Depends on:** Step 8

### Create authentication helper:

**Create `app/graphql/concerns/authentication.rb`:**

```ruby
module Authentication
  def current_user
    return @current_user if defined?(@current_user)

    @current_user = authenticate_user_from_token
  end

  def authenticate_user!
    raise GraphQL::ExecutionError, "Authentication required" unless current_user
  end

  private

  def authenticate_user_from_token
    token = context[:token]
    return nil unless token

    decoded = JWT.decode(
      token,
      Rails.application.secret_key_base,
      true,
      algorithm: 'HS256'
    )

    user_id = decoded[0]['user_id']
    User.find_by(id: user_id)
  rescue JWT::DecodeError, JWT::ExpiredSignature
    nil
  end
end
```

### Update GraphQL controller to pass token:

**Edit `app/controllers/graphql_controller.rb`:**

```ruby
class GraphqlController < ApplicationController
  def execute
    variables = prepare_variables(params[:variables])
    query = params[:query]
    operation_name = params[:operationName]

    # Extract token from Authorization header
    token = request.headers['Authorization']&.split(' ')&.last

    context = {
      current_user: current_user(token),
      token: token
    }

    result = NonProfitDevsSchema.execute(
      query,
      variables: variables,
      context: context,
      operation_name: operation_name
    )

    render json: result
  rescue StandardError => e
    raise e unless Rails.env.development?
    handle_error_in_development(e)
  end

  private

  def current_user(token)
    return nil unless token

    decoded = JWT.decode(
      token,
      Rails.application.secret_key_base,
      true,
      algorithm: 'HS256'
    )

    User.find_by(id: decoded[0]['user_id'])
  rescue JWT::DecodeError, JWT::ExpiredSignature
    nil
  end

  # ... rest of controller
end
```

### Update protected mutations:

**Example for `UpdateUser`:**

```ruby
module Mutations
  class UpdateUser < BaseMutation
    include Authentication

    # ... arguments and fields

    def resolve(id:, input:)
      authenticate_user!

      user = User.find(id)

      # Authorization check
      unless context[:current_user].id == user.id
        raise GraphQL::ExecutionError, "Not authorized to update this user"
      end

      # ... rest of mutation
    end
  end
end
```

**Expected Result:**

- JWT authentication working
- Protected mutations require valid token
- Authorization checks in place

---

## Step 10: Setup Dataloader

**Goal:** Optimize N+1 queries with GraphQL::Dataloader

**Status:** ⬜ Not Started

**Depends on:** Step 7

### Enable Dataloader in schema:

**Edit `app/graphql/non_profit_devs_schema.rb`:**

```ruby
class NonProfitDevsSchema < GraphQL::Schema
  mutation(Types::MutationType)
  query(Types::QueryType)

  # Enable GraphQL::Dataloader
  use GraphQL::Dataloader

  # Disable default batch loading (Dataloader replaces it)
  disable_introspection_entry_points if Rails.env.production?
end
```

### Use dataloader in types:

**Update `app/graphql/types/user_type.rb`:**

```ruby
module Types
  class UserType < Types::BaseObject
    # ... other fields

    field :projects, [Types::ProjectType], null: false

    def projects
      dataloader.with(Sources::AssociationLoader, ::Project, :users).load(object.id)
    end
  end
end
```

### Create dataloader source:

**Create `app/graphql/sources/association_loader.rb`:**

```ruby
module Sources
  class AssociationLoader < GraphQL::Dataloader::Source
    def initialize(model, association_name)
      @model = model
      @association_name = association_name
    end

    def fetch(ids)
      records = @model.joins(@association_name).where(@association_name => { id: ids })

      ids.map { |id| records.select { |r| r.send(@association_name).any? { |a| a.id == id } } }
    end
  end
end
```

**Expected Result:**

- N+1 queries eliminated
- Batch loading for associations

---

## Step 11: Configure Apollo Client Setup

**Goal:** Document how frontend should connect with Apollo Client

**Status:** ⬜ Not Started

**Depends on:** Step 4, Step 9

### Frontend Integration Guide:

**Create `docs/APOLLO_CLIENT_SETUP.md` in the root:**

````markdown
# Apollo Client Setup for Frontend

## Installation

\`\`\`bash
cd frontend
bun add @apollo/client graphql
\`\`\`

## Configuration

Create \`frontend/src/apollo-client.js\`:

\`\`\`javascript
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
uri: 'http://localhost:3000/graphql',
});

const authLink = setContext((\_, { headers }) => {
const token = localStorage.getItem('authToken');

return {
headers: {
...headers,
authorization: token ? \`Bearer \${token}\` : "",
}
}
});

const client = new ApolloClient({
link: authLink.concat(httpLink),
cache: new InMemoryCache(),
});

export default client;
\`\`\`

## Usage in React

Update \`frontend/src/index.jsx\`:

\`\`\`javascript
import { ApolloProvider } from '@apollo/client';
import client from './apollo-client';

// Wrap app with ApolloProvider
<ApolloProvider client={client}>
<App />
</ApolloProvider>
\`\`\`
\`\`\`

**Expected Result:**

- Frontend can connect to GraphQL API
- Authentication works with JWT tokens

---

## Step 12: Add Seeds

**Goal:** Create sample data for development

**Status:** ⬜ Not Started

**Depends on:** Step 5

### Edit `db/seeds.rb`:

```ruby
# Clear existing data
puts "Clearing database..."
User.destroy_all
Project.destroy_all

# Create users
puts "Creating users..."
users = [
  {
    name: "Alice Developer",
    email: "alice@example.com",
    password: "password123",
    skills: ["RUBY", "RAILS", "JAVASCRIPT", "REACT"]
  },
  {
    name: "Bob Designer",
    email: "bob@example.com",
    password: "password123",
    skills: ["HTML", "CSS", "JAVASCRIPT", "REACT"]
  },
  {
    name: "Charlie DevOps",
    email: "charlie@example.com",
    password: "password123",
    skills: ["DOCKER", "KUBERNETES", "AWS", "CI_CD"]
  }
].map { |attrs| User.create!(attrs) }

# Create projects
puts "Creating projects..."
projects = [
  {
    name: "Food Bank Management System",
    description: "A system to help food banks track inventory and donations",
    contact_email: "contact@foodbank.org",
    status: "active"
  },
  {
    name: "Volunteer Coordination Platform",
    description: "Platform to coordinate volunteers for various nonprofits",
    contact_email: "volunteer@platform.org",
    status: "active"
  },
  {
    name: "Educational Resources Hub",
    description: "Free educational resources for underserved communities",
    contact_email: "education@hub.org",
    status: "planning"
  }
].map { |attrs| Project.create!(attrs) }

# Associate users with projects
puts "Creating associations..."
projects[0].users << [users[0], users[1]]
projects[1].users << [users[1], users[2]]
projects[2].users << users[0]

puts "Seeding complete!"
puts "Created #{User.count} users and #{Project.count} projects"
```
````

### Run seeds:

```bash
rails db:seed
```

**Expected Result:**

- Sample users and projects created
- Associations established

---

## Step 13: Testing Setup

**Goal:** Configure RSpec for testing

**Status:** ⬜ Not Started

**Depends on:** Step 2

### Install RSpec:

```bash
rails generate rspec:install
```

### Create test helper for GraphQL:

**Create `spec/support/graphql_helper.rb`:**

```ruby
module GraphqlHelper
  def execute_graphql(query, variables: {}, context: {})
    NonProfitDevsSchema.execute(
      query,
      variables: variables,
      context: context
    )
  end
end

RSpec.configure do |config|
  config.include GraphqlHelper
end
```

### Example test:

**Create `spec/graphql/queries/projects_spec.rb`:**

```ruby
require 'rails_helper'

RSpec.describe 'Projects Query' do
  it 'returns all projects' do
    project = create(:project)

    query = <<~GQL
      query {
        projects {
          id
          name
        }
      }
    GQL

    result = execute_graphql(query)

    expect(result['data']['projects']).to be_present
    expect(result['data']['projects'].first['name']).to eq(project.name)
  end
end
```

**Expected Result:**

- RSpec configured
- GraphQL test helper available

---

## Step 14: Documentation

**Goal:** Export schema and finalize documentation

**Status:** ⬜ Not Started

**Depends on:** Steps 1-13

### Dump GraphQL schema:

```bash
# Generate schema.graphql file
rails graphql:schema:dump

# This creates: schema.graphql in your Rails root
```

### Copy schema to docs:

```bash
cp schema.graphql ../docs/api/schema.graphql
```

### Update documentation:

Mark this README with ✅ for completed steps

**Expected Result:**

- Schema exported for frontend use
- Documentation complete

---

## Running the Application

### Development:

```bash
# Start Rails server
cd backend
rails server -p 3000

# Access GraphiQL
open http://localhost:3000/graphiql

# Run console
rails console
```

### Database commands:

```bash
# Run migrations
rails db:migrate

# Rollback
rails db:rollback

# Reset (⚠️ destructive)
rails db:reset

# Seed data
rails db:seed
```

---

## Project Structure

```
backend/
├── app/
│   ├── controllers/
│   │   └── graphql_controller.rb
│   ├── graphql/
│   │   ├── concerns/
│   │   │   └── authentication.rb
│   │   ├── mutations/
│   │   │   ├── signup.rb
│   │   │   ├── login.rb
│   │   │   ├── update_user.rb
│   │   │   ├── change_password.rb
│   │   │   ├── create_project.rb
│   │   │   ├── add_project_to_user.rb
│   │   │   └── add_user_to_project.rb
│   │   ├── sources/
│   │   │   └── association_loader.rb
│   │   ├── types/
│   │   │   ├── base_enum.rb
│   │   │   ├── base_input_object.rb
│   │   │   ├── base_object.rb
│   │   │   ├── skill_enum.rb
│   │   │   ├── user_type.rb
│   │   │   ├── project_type.rb
│   │   │   ├── token_type.rb
│   │   │   ├── auth_payload_type.rb
│   │   │   ├── signup_input_type.rb
│   │   │   ├── login_input_type.rb
│   │   │   └── ... (other input types)
│   │   ├── query_type.rb
│   │   ├── mutation_type.rb
│   │   └── non_profit_devs_schema.rb
│   └── models/
│       ├── user.rb
│       └── project.rb
├── config/
│   ├── initializers/
│   │   └── cors.rb
│   └── routes.rb
├── db/
│   ├── migrate/
│   │   ├── XXXXX_create_users.rb
│   │   ├── XXXXX_create_projects.rb
│   │   └── XXXXX_create_join_table_projects_users.rb
│   ├── schema.rb
│   └── seeds.rb
├── spec/
│   ├── graphql/
│   │   ├── mutations/
│   │   └── queries/
│   ├── support/
│   │   └── graphql_helper.rb
│   └── spec_helper.rb
├── .env
├── Gemfile
└── README.md
```

---

## Resources

- [GraphQL Ruby Documentation](https://graphql-ruby.org/)
- [GraphQL Ruby - Getting Started](https://graphql-ruby.org/getting_started)
- [GraphQL Ruby - Dataloader](https://graphql-ruby.org/dataloader/overview.html)
- [Rails Guides](https://guides.rubyonrails.org/)
- [JWT Introduction](https://jwt.io/introduction)
- [Apollo Client Documentation](https://www.apollographql.com/docs/react/)
- [API Schema Documentation](../docs/api/SCHEMA.md)

---

## Troubleshooting

### CORS errors from frontend:

- Check `config/initializers/cors.rb` has correct frontend URL
- Restart Rails server after changing CORS config

### GraphiQL not loading:

- Ensure you're in development mode
- Check routes with `rails routes | grep graphql`

### JWT authentication failing:

- Verify `SECRET_KEY_BASE` is set
- Check token format in Authorization header: `Bearer <token>`

### N+1 queries:

- Check Dataloader is enabled in schema
- Use dataloader sources for associations
- Monitor logs for excessive queries

---

## Next Steps After Implementation

1. Add pagination to queries
2. Add filtering/search to queries
3. Add real-time subscriptions
4. Implement rate limiting
5. Add comprehensive error tracking
6. Setup CI/CD pipeline
7. Deploy to production
