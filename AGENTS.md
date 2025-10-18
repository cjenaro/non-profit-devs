# AGENTS.md

## Build/Lint/Test Commands

### Frontend (React/TypeScript)
- `cd frontend && bun start` - Start dev server
- `cd frontend && bun run build` - Build for production  
- `cd frontend && bun run lint` - Run Biome linter
- `cd frontend && bun run format` - Format code with Biome
- `cd frontend && bun run generate` - Generate GraphQL types

### Backend (Rails/GraphQL)
- `cd backend && bin/rails test` - Run all tests
- `cd backend && bin/rails test test/path/to_test.rb` - Run single test file
- `cd backend && bundle exec rubocop` - Run Ruby linter
- `cd backend && bundle exec brakeman` - Run security scanner

## Code Style Guidelines

### Frontend
- Use Biome for formatting/linting (2-space indent, 80 char lines)
- Single quotes for strings, double for JSX
- TypeScript strict mode enabled
- React functional components with hooks
- Apollo Client for GraphQL

### Backend  
- Use RuboCop with Rails Omakase style
- GraphQL API with mutations/resolvers pattern
- ActiveRecord models with validations
- Secure password with bcrypt
- JWT authentication

### General
- Branch naming: `bug/<number>` or `feat/<number>`
- Always format frontend code before committing
- Use Bun workspaces for package management