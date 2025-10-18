# Frontend Revamp Migration Plan

## Overview
This plan outlines the steps to revamp the frontend by replacing Emotion with Tailwind CSS, converting JSX files to TSX, and updating outdated packages while maintaining existing styles through a custom Tailwind theme.

## Current Stack Analysis
- **Styling:** Emotion (@emotion/react, @emotion/styled) used extensively
  - CSS variables: `--lavender: #f9e8e8`, `--ember: #c42e2e`
  - Fonts: Hind Madurai (body), Montserrat (headings)
  - Global styles in Layout.jsx
  - Styled components in Button.jsx, Logo.jsx
  - Inline CSS with jsx pragma in most components
- **Files:** 30+ .jsx files in src/components/ and src/views/
- **Packages:** Many outdated versions (e.g., @testing-library/jest-dom 4.2.4, react-testing-library 9.3.2, i18next 19.5.1)

## Migration Steps

### 1. Update Existing Stack
- Update package.json: remove @emotion/react, @emotion/styled, @swc/plugin-emotion
- Add Tailwind CSS dependencies: tailwindcss, autoprefixer, postcss
- Replace Prettier and ESLint with Biome: remove prettier, eslint, add @biomejs/biome
- Update outdated packages to latest versions (e.g., @testing-library/*, i18next, etc.)
- Run npm install to update lockfile

### 2. Tailwind Theme Configuration
Create `tailwind.config.js` with custom theme:
```js
module.exports = {
  theme: {
    extend: {
      colors: {
        lavender: '#f9e8e8',
        ember: '#c42e2e',
      },
      fontFamily: {
        'hind-madurai': ['Hind Madurai', 'sans-serif'],
        'montserrat': ['Montserrat', 'sans-serif'],
      },
      maxWidth: {
        'container-sm': 'calc(430px - 20px)',
        'container-md': 'calc(650px - 20px)',
        'container-lg': 'calc(800px - 20px)',
      },
    },
  },
}
```

### 3. Migrate Components
- **Convert JSX to TSX:** Rename all .jsx to .tsx, add TypeScript interfaces for props
- **Replace Emotion Styles:**
  - Remove all `@emotion/react` and `@emotion/styled` imports
  - Convert styled components to regular elements with Tailwind classes
  - Replace inline `css` with Tailwind utility classes
  - Move Global styles to Tailwind's base layer or separate CSS file

### 4. Update Build Configuration
- Remove Emotion jsxImportSource from vite.config.ts
- Ensure TypeScript configuration supports .tsx
- Update package.json scripts for TypeScript build
- Configure Biome: create biome.json with lint/format rules

### 5. Testing & Validation
- Run `npm run build` to ensure compilation
- Run `biome check` and `biome format` for linting/formatting
- Run `npm run typecheck` for TypeScript
- Manual testing to verify UI matches original design
- Update any failing tests

## Key Component Migrations

### Button Component
**Before:** Styled component with complex CSS
**After:** Button element with Tailwind classes
```tsx
// Example classes: px-2 py-1 text-sm font-bold uppercase border border-ember text-ember bg-lavender cursor-pointer w-max relative
```

### Layout Component
**Before:** Global styles with Emotion
**After:** Tailwind base styles + custom CSS for fonts/colors

### Header Component
**Before:** Inline css with conditional styles
**After:** Tailwind classes with responsive variants

### Title Component
**Before:** Complex css with ::after and text-stroke
**After:** Simplified Tailwind with after pseudo

## Migration Tracker

### Components
- [x] Button.jsx - Replace styled component with Tailwind classes
- [x] Header.jsx - Convert inline css to Tailwind classes
- [x] Logo.jsx - Replace styled Link with Tailwind classes
- [x] Input.jsx - Convert css template to Tailwind classes
- [x] Language.jsx - Replace css with Tailwind classes
- [x] Title.jsx - Simplify css to Tailwind classes
- [x] Layout.jsx - Move Global styles to main.css (already done)
- [x] UserContext.jsx - Convert to TSX with proper types
- [x] Steps.jsx - Convert css to Tailwind classes
- [x] Darr.jsx - Convert css to Tailwind classes
- [x] Divider.jsx - Convert css to Tailwind classes
- [x] ErrorMessage.jsx - Convert css to Tailwind classes
- [x] Select.jsx - Convert css to Tailwind classes (TypeScript issues with Downshift v5)
- [x] ProjectItem.jsx - Convert css to Tailwind classes
- [x] Spinner.jsx - Convert css to Tailwind classes

### Views
- [x] login.jsx - Convert section/form css to Tailwind and TSX
- [x] signup.jsx - Convert css to Tailwind (created signup.tsx)
- [ ] profile.jsx - Convert css to Tailwind
- [ ] projects.jsx - Convert css to Tailwind
- [ ] project.jsx - Convert css to Tailwind
- [x] pitch.jsx - Convert css to Tailwind
- [ ] home/index.jsx - Convert css to Tailwind
- [x] home/hero.jsx - Convert css to Tailwind
- [x] home/who-we-are.jsx - Convert css to Tailwind
- [x] home/how-it-works.jsx - Convert css to Tailwind
- [ ] not-found.jsx - Convert css to Tailwind

### Other
- [ ] index.jsx - Update imports if needed
- [ ] Convert all .jsx to .tsx and add TypeScript types
- [ ] Test build and fix any issues

## Timeline
- **Completed:** Package updates, Tailwind v4 setup with @font-face, Biome config, GraphQL codegen fix, core components migration, additional components (ErrorMessage, Select, ProjectItem, Spinner), signup view
- **Remaining:** Complete remaining views migration (profile, projects, project, home/index, not-found), fix TypeScript errors (Downshift types, React Router types, GraphQL types), full testing

## Risks & Considerations
- Ensure all custom styles are captured in Tailwind theme
- Test responsive behavior matches original CSS vars
- Verify font loading and custom animations work
- Update any Emotion-specific build optimizations
- Resolve TypeScript errors due to outdated packages (Downshift v5, React Router v5, GraphQL types)
- Many files still have .jsx extensions and need renaming to .tsx
- Imports need updating to remove .jsx/.tsx extensions