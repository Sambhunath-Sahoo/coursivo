# Contributing to Coursivo

Thank you for your interest in contributing to Coursivo! This document provides guidelines and information for contributors.

## 🤝 How to Contribute

### Types of Contributions

We welcome various types of contributions:

- **Bug Reports**: Report bugs and issues
- **Feature Requests**: Suggest new features
- **Code Contributions**: Submit pull requests
- **Documentation**: Improve or add documentation
- **Testing**: Help with testing and quality assurance
- **Design**: Contribute to UI/UX improvements

### Before You Start

1. **Check Existing Issues**: Look for existing issues or pull requests
2. **Discuss Changes**: Open an issue to discuss significant changes
3. **Read Documentation**: Familiarize yourself with the project structure
4. **Set Up Development Environment**: Follow the setup instructions

## 🚀 Development Setup

### Prerequisites

- Node.js 18.0.0 or higher
- PostgreSQL 12.0 or higher
- npm 8.0.0 or higher
- Git

### Local Development Setup

1. **Fork the Repository**
   ```bash
   # Fork on GitHub, then clone your fork
   git clone https://github.com/YOUR_USERNAME/coursivo.git
   cd coursivo
   ```

2. **Set Up Upstream Remote**
   ```bash
   git remote add upstream https://github.com/original-owner/coursivo.git
   ```

3. **Install Dependencies**
   ```bash
   npm install
   ```

4. **Environment Setup**
   ```bash
   cp env.example .env.local
   # Edit .env.local with your configuration
   ```

5. **Database Setup**
   ```bash
   npm run db:generate
   npm run db:push
   npm run db:seed
   ```

6. **Start Development Server**
   ```bash
   npm run dev
   ```

## 📝 Code Style Guidelines

### TypeScript

- Use strict TypeScript configuration
- Prefer interfaces over types for object shapes
- Use explicit return types for functions
- Avoid `any` type - use proper typing

```typescript
// Good
interface User {
  id: string
  email: string
  name?: string
}

function getUser(id: string): Promise<User | null> {
  // Implementation
}

// Avoid
function getUser(id: any): any {
  // Implementation
}
```

### React Components

- Use functional components with hooks
- Prefer named exports over default exports
- Use proper TypeScript interfaces for props
- Implement proper error boundaries

```typescript
// Good
interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary'
  disabled?: boolean
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  disabled = false
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`btn btn-${variant}`}
    >
      {children}
    </button>
  )
}
```

### File Naming

- **Components**: PascalCase (e.g., `UserProfile.tsx`)
- **Pages**: lowercase with hyphens (e.g., `user-profile/page.tsx`)
- **Utilities**: camelCase (e.g., `formatDate.ts`)
- **Types**: PascalCase (e.g., `UserTypes.ts`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `API_ENDPOINTS.ts`)

### Code Organization

- Keep components small and focused
- Use meaningful variable and function names
- Group related functionality together
- Separate concerns (UI, logic, data)

## 🔄 Git Workflow

### Branch Naming

Use descriptive branch names:

```bash
# Feature branches
feature/user-authentication
feature/course-management
feature/student-dashboard

# Bug fix branches
fix/login-validation
fix/course-creation-error

# Documentation branches
docs/api-reference
docs/architecture-guide
```

### Commit Messages

Follow conventional commit format:

```bash
# Format: type(scope): description

# Examples:
feat(auth): add OAuth provider support
fix(courses): resolve course deletion issue
docs(api): update authentication endpoints
refactor(components): simplify user profile component
test(auth): add unit tests for login validation
```

### Pull Request Process

1. **Create Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Changes**
   - Write code following style guidelines
   - Add tests for new functionality
   - Update documentation if needed

3. **Commit Changes**
   ```bash
   git add .
   git commit -m "feat(scope): description of changes"
   ```

4. **Push to Your Fork**
   ```bash
   git push origin feature/your-feature-name
   ```

5. **Create Pull Request**
   - Use the PR template
   - Provide clear description of changes
   - Link related issues
   - Request reviews from maintainers

6. **Address Feedback**
   - Respond to review comments
   - Make requested changes
   - Push updates to the same branch

## 🧪 Testing Guidelines

### Test Requirements

- All new features must include tests
- Bug fixes should include regression tests
- Maintain test coverage above 80%
- Tests should be fast and reliable

### Test Structure

```typescript
// __tests__/components/UserProfile.test.tsx
import { render, screen } from '@testing-library/react'
import { UserProfile } from '@/components/UserProfile'

describe('UserProfile', () => {
  const mockUser = {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com'
  }

  it('renders user information correctly', () => {
    render(<UserProfile user={mockUser} />)
    
    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('john@example.com')).toBeInTheDocument()
  })

  it('handles missing user data gracefully', () => {
    render(<UserProfile user={null} />)
    
    expect(screen.getByText('No user data available')).toBeInTheDocument()
  })
})
```

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test -- UserProfile.test.tsx
```

## 📚 Documentation

### Code Documentation

- Document complex functions and classes
- Use JSDoc comments for public APIs
- Keep documentation up to date
- Include examples where helpful

```typescript
/**
 * Creates a new course in the system
 * @param courseData - The course data to create
 * @param educatorId - The ID of the educator creating the course
 * @returns Promise resolving to the created course
 * @throws {ValidationError} When course data is invalid
 * @throws {UnauthorizedError} When user lacks permission
 */
async function createCourse(
  courseData: CreateCourseInput,
  educatorId: string
): Promise<Course> {
  // Implementation
}
```

### README Updates

- Update README.md for new features
- Document breaking changes
- Include usage examples
- Update installation instructions

## 🔍 Code Review Process

### Review Checklist

Before submitting a PR, ensure:

- [ ] Code follows style guidelines
- [ ] Tests are included and passing
- [ ] Documentation is updated
- [ ] No console.log statements remain
- [ ] Error handling is implemented
- [ ] Performance considerations are addressed
- [ ] Security implications are considered

### Review Guidelines

- Be constructive and respectful
- Focus on code quality and functionality
- Suggest improvements when possible
- Approve when requirements are met

## 🐛 Bug Reports

### Bug Report Template

```markdown
## Bug Description
Brief description of the issue

## Steps to Reproduce
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

## Expected Behavior
What you expected to happen

## Actual Behavior
What actually happened

## Environment
- OS: [e.g. macOS, Windows, Linux]
- Browser: [e.g. Chrome, Safari, Firefox]
- Version: [e.g. 22]

## Additional Context
Any other context about the problem
```

## 💡 Feature Requests

### Feature Request Template

```markdown
## Feature Description
Brief description of the requested feature

## Problem Statement
What problem does this feature solve?

## Proposed Solution
How should this feature work?

## Alternative Solutions
Any alternative solutions considered?

## Additional Context
Any other context or screenshots
```

## 🚫 What Not to Do

- Don't submit PRs without tests
- Don't ignore code review feedback
- Don't commit directly to main branch
- Don't submit incomplete features
- Don't ignore linting errors
- Don't commit sensitive information

## 🏆 Recognition

Contributors will be recognized in:

- Project README.md
- Release notes
- Contributor hall of fame
- GitHub contributors list

## 📞 Getting Help

### Communication Channels

- **GitHub Issues**: For bugs and feature requests
- **GitHub Discussions**: For questions and discussions
- **Pull Requests**: For code reviews and feedback

### Resources

- [Project Documentation](docs/)
- [Architecture Guide](docs/ARCHITECTURE.md)
- [Development Guide](docs/DEVELOPMENT.md)
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev/)

## 📄 License

By contributing to Coursivo, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to Coursivo! 🎉
