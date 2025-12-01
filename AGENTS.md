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

## Issue Tracking with bd (beads)

**IMPORTANT**: This project uses **bd (beads)** for ALL issue tracking. Do NOT use markdown TODOs, task lists, or other tracking methods.

### Why bd?

- Dependency-aware: Track blockers and relationships between issues
- Git-friendly: Auto-syncs to JSONL for version control
- Agent-optimized: JSON output, ready work detection, discovered-from links
- Prevents duplicate tracking systems and confusion

### Quick Start

**Check for ready work:**
```bash
bd ready --json
```

**Create new issues:**
```bash
bd create "Issue title" -t bug|feature|task -p 0-4 --json
bd create "Issue title" -p 1 --deps discovered-from:bd-123 --json
bd create "Subtask" --parent <epic-id> --json  # Hierarchical subtask (gets ID like epic-id.1)
```

**Claim and update:**
```bash
bd update bd-42 --status in_progress --json
bd update bd-42 --priority 1 --json
```

**Complete work:**
```bash
bd close bd-42 --reason "Completed" --json
```

### Issue Types

- `bug` - Something broken
- `feature` - New functionality
- `task` - Work item (tests, docs, refactoring)
- `epic` - Large feature with subtasks
- `chore` - Maintenance (dependencies, tooling)

### Priorities

- `0` - Critical (security, data loss, broken builds)
- `1` - High (major features, important bugs)
- `2` - Medium (default, nice-to-have)
- `3` - Low (polish, optimization)
- `4` - Backlog (future ideas)

### Workflow for AI Agents

1. **Check ready work**: `bd ready` shows unblocked issues
2. **Claim your task**: `bd update <id> --status in_progress`
3. **Work on it**: Implement, test, document
4. **Discover new work?** Create linked issue:
   - `bd create "Found bug" -p 1 --deps discovered-from:<parent-id>`
5. **Complete**: `bd close <id> --reason "Done"`
6. **Commit together**: Always commit the `.beads/issues.jsonl` file together with the code changes so issue state stays in sync with code state

### Auto-Sync

bd automatically syncs with git:
- Exports to `.beads/issues.jsonl` after changes (5s debounce)
- Imports from JSONL when newer (e.g., after `git pull`)
- No manual export/import needed!

### GitHub Copilot Integration

If using GitHub Copilot, also create `.github/copilot-instructions.md` for automatic instruction loading.
Run `bd onboard` to get the content, or see step 2 of the onboard instructions.

### MCP Server (Recommended)

If using Claude or MCP-compatible clients, install the beads MCP server:

```bash
pip install beads-mcp
```

Add to MCP config (e.g., `~/.config/claude/config.json`):
```json
{
  "beads": {
    "command": "beads-mcp",
    "args": []
  }
}
```

Then use `mcp__beads__*` functions instead of CLI commands.

### Managing AI-Generated Planning Documents

AI assistants often create planning and design documents during development:
- PLAN.md, IMPLEMENTATION.md, ARCHITECTURE.md
- DESIGN.md, CODEBASE_SUMMARY.md, INTEGRATION_PLAN.md
- TESTING_GUIDE.md, TECHNICAL_DESIGN.md, and similar files

**Best Practice: Use a dedicated directory for these ephemeral files**

**Recommended approach:**
- Create a `history/` directory in the project root
- Store ALL AI-generated planning/design docs in `history/`
- Keep the repository root clean and focused on permanent project files
- Only access `history/` when explicitly asked to review past planning

**Example .gitignore entry (optional):**
```
# AI planning documents (ephemeral)
history/
```

**Benefits:**
- ✅ Clean repository root
- ✅ Clear separation between ephemeral and permanent documentation
- ✅ Easy to exclude from version control if desired
- ✅ Preserves planning history for archeological research
- ✅ Reduces noise when browsing the project

### CLI Help

Run `bd <command> --help` to see all available flags for any command.
For example: `bd create --help` shows `--parent`, `--deps`, `--assignee`, etc.

### Important Rules

- ✅ Use bd for ALL task tracking
- ✅ Always use `--json` flag for programmatic use
- ✅ Link discovered work with `discovered-from` dependencies
- ✅ Check `bd ready` before asking "what should I work on?"
- ✅ Store AI planning docs in `history/` directory
- ✅ Run `bd <cmd> --help` to discover available flags
- ❌ Do NOT create markdown TODO lists
- ❌ Do NOT use external issue trackers
- ❌ Do NOT duplicate tracking systems
- ❌ Do NOT clutter repo root with planning documents

For more details, see README.md and QUICKSTART.md.

### General
- Branch naming: `bug/<number>` or `feat/<number>`
- Always format frontend code before committing
- Use Bun workspaces for package management
