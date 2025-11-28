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
- Use function () {} instead of arrow functions for named function declarations
- Use React Hook Form with shadcn/ui Form components for all forms
- Use Zod (zod/mini) for form validation with .check() method pattern
- Use design system CSS variables (var(--primary), var(--background), etc.) instead of custom colors
- Exclude generated folders (src/generated/**) and UI components (src/components/ui/**) from Biome linting

### Backend  
- Use RuboCop with Rails Omakase style
- GraphQL API with mutations/resolvers pattern
- ActiveRecord models with validations
- Secure password with bcrypt
- JWT authentication

### Form Patterns
- Always use React Hook Form with zodResolver for form validation
- Use shadcn/ui Form components (Form, FormField, FormItem, FormLabel, FormControl, FormMessage)
- Implement Zod schemas with zod/mini using .check() method for validation rules
- For multi-select components, use shadcn/ui Command + Popover + Checkbox pattern
- Display selected items smartly (first 2 + "X more" for overflow prevention)

### Component Usage
- SkillsSelector: Self-contained multi-select component with useSkills hook
- Use proper design system colors (var(--primary), var(--background)) in components
- Exclude auto-generated code from linting using Biome overrides

### General
- Branch naming: `bug/<number>` or `feat/<number>`
- Always format frontend code before committing
- Use Bun workspaces for package management