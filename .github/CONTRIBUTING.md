# Contributing to This Project

Thank you for your interest in contributing! Here are the guidelines to help you get started.

## Code of Conduct
Please be respectful and constructive in all interactions.

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- Git
- npm or yarn

### Setup Development Environment
```bash
# Clone the repository
git clone <repository-url>
cd Chat_NodeJs

# Install dependencies
npm install

# Install server dependencies
cd server && npm install

# Install client dependencies  
cd ../client && npm install
```

## Submitting Changes

### Before You Start
1. Check existing issues and PRs to avoid duplicates
2. Create an issue first to discuss major changes
3. Fork the repository and create a feature branch

### Branch Naming Convention
```
feature/short-description
bugfix/short-description
docs/short-description
chore/short-description
```

### Commit Message Convention
```
type(scope): brief description

Longer explanation if needed.

Related issues: #123
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

Example:
```
feat(server): add authentication middleware

Implements JWT-based authentication for API endpoints.
Includes token generation and validation logic.

Related issues: #45
```

### Creating a Pull Request
1. Push your branch to your fork
2. Use the PR template provided (.github/pull_request_template.md)
3. Link related issues
4. Request reviews from maintainers
5. Address feedback promptly

## Review Process
- All PRs require at least one approval
- All CI/CD checks must pass
- Code must follow the project's style guidelines
- Tests must be included for new features

## Code Style Guidelines

### JavaScript/Node.js
- Use 2-space indentation
- Use `camelCase` for variables and functions
- Use `UPPER_SNAKE_CASE` for constants
- Add JSDoc comments for functions
- Avoid `var`, use `const` and `let`

### Naming Conventions
- Files: lowercase with hyphens (e.g., `server-utils.js`)
- Folders: lowercase with hyphens (e.g., `server-config/`)
- Classes: PascalCase (e.g., `UserManager`)
- Functions: camelCase (e.g., `getUserData()`)

## Testing
- Write tests for all new features
- Ensure all tests pass before submitting PR
- Maintain or improve code coverage
- Include both unit and integration tests when applicable

## Documentation
- Update README.md if adding new features
- Add JSDoc comments to functions
- Update CHANGELOG.md
- Include examples for complex features

## Questions?
- Check existing issues for answers
- Create a new discussion or issue
- Contact maintainers directly

## License
By contributing, you agree that your contributions will be licensed under the project's license.

Thank you for contributing! 🎉
