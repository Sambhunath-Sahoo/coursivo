# Coursivo Architecture Documentation

## Overview

Coursivo is a multi-tenant learning management system built with modern web technologies. This document outlines the architectural decisions, patterns, and implementation details.

### Project Structure

```
coursivo/
├── app/                          # Next.js 15 app directory
│   ├── [domain]/                 # Dynamic student routes
│   │   ├── achievements/
│   │   ├── courses/
│   │   ├── dashboard/
│   │   ├── profile/
│   │   ├── quiz/
│   │   ├── schedule/
│   │   ├── signin/
│   │   └── signup/
│   ├── api/                      # API routes
│   │   └── auth/
│   ├── dashboard/                # Educator dashboard
│   ├── educator/                 # Educator-specific pages
│   └── layout.tsx                # Root layout
├── components/                   # Reusable UI components
├── lib/                          # Utility libraries
├── types/                        # TypeScript type definitions
├── prisma/                       # Database schema and migrations
└── public/                       # Static assets
```

### Dynamic Routing

- **Student Pages**: Use `[domain]` for dynamic routing, allowing each academy to have its own subdomain.
- **Educator Pages**: Use static routes under `/educator`.

## 🏗️ System Architecture

### High-Level Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend     │    │   Backend      │    │   Database      │
│   (Next.js)    │◄──►│   (Next.js)    │◄──►│   (PostgreSQL)  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Authentication│    │   API Routes    │    │   Prisma ORM    │
│   (NextAuth.js) │    │   (REST/GraphQL)│    │   (Schema)      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Multi-Tenant Architecture

Coursivo implements a **database-per-tenant** approach where:

- Each academy (tenant) has isolated data
- Authentication is tenant-aware
- Users can only access their assigned academy
- Data is completely separated between tenants

#### Tenant Resolution Strategy

```typescript
// Tenant resolution via query parameters
const tenant = searchParams.get('tenant') || 'default'

// Session includes tenant information
interface Session {
  user: {
    id: string
    email: string
    tenant: string
  }
}
```

## 🗄️ Database Design

### Core Models

#### 1. Educator Accounts
```prisma
model educator_account {
  id              String   @id @default(cuid())
  name            String?  @db.VarChar(150)
  email           String   @unique @db.VarChar(255)
  password_hash   String?  @db.VarChar(255)
  domain          String?  @db.VarChar(255)
  domain_verified Boolean  @default(false)
  
  // Relations
  students        students[]
  courses         courses[]
  purchases       purchases[]
}
```

#### 2. Students
```prisma
model students {
  id             String   @id @default(cuid())
  educator_id    String
  name           String?  @db.VarChar(150)
  email          String   @db.VarChar(255)
  password_hash  String?  @db.VarChar(255)
  
  // Relations
  educator       educator_account @relation(fields: [educator_id], references: [id])
  enrollments    student_enrollments[]
  quiz_attempts  quiz_attempts[]
}
```

#### 3. Courses
```prisma
model courses {
  id              String   @id @default(cuid())
  educator_id     String
  title           String   @db.VarChar(255)
  description     String?  @db.Text
  status          CourseStatus @default(draft)
  price           Decimal? @db.Decimal(10, 2)
  
  // Relations
  educator        educator_account @relation(fields: [educator_id], references: [id])
  enrollments     student_enrollments[]
  content         course_content[]
  quizzes         quizzes[]
}
```

### Database Relationships

```
educator_account (1) ──── (N) students
educator_account (1) ──── (N) courses
courses (1) ──── (N) student_enrollments
students (1) ──── (N) student_enrollments
courses (1) ──── (N) course_content
courses (1) ──── (N) quizzes
```

## 🔐 Authentication & Authorization

### NextAuth.js Configuration

```typescript
// lib/auth.ts
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        // Tenant-aware authentication logic
        const tenant = req.query?.tenant as string
        // ... authentication implementation
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Include tenant information in JWT
      if (user) {
        token.tenant = user.tenant
      }
      return token
    },
    async session({ session, token }) {
      // Pass tenant to session
      session.user.tenant = token.tenant
      return session
    }
  }
}
```

### Role-Based Access Control

```typescript
enum UserRole {
  STUDENT = 'student',
  EDUCATOR = 'educator',
  ADMIN = 'admin'
}

interface User {
  id: string
  email: string
  role: UserRole
  tenant: string
}
```

## 🚀 API Design

### RESTful Endpoints

#### Authentication
- `POST /api/auth/signin` - User authentication
- `POST /api/auth/signup` - User registration
- `GET /api/auth/session` - Get current session
- `POST /api/auth/signout` - User logout

#### Courses
- `GET /api/courses` - List courses (tenant-scoped)
- `POST /api/courses` - Create course (educator only)
- `GET /api/courses/[id]` - Get course details
- `PUT /api/courses/[id]` - Update course (educator only)
- `DELETE /api/courses/[id]` - Delete course (educator only)

#### Students
- `GET /api/students` - List students (educator only)
- `POST /api/students` - Create student (educator only)
- `GET /api/students/[id]` - Get student details
- `PUT /api/students/[id]` - Update student

### API Response Format

```typescript
interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// Success Response
{
  "success": true,
  "data": { ... },
  "message": "Operation completed successfully"
}

// Error Response
{
  "success": false,
  "error": "Validation failed",
  "message": "Invalid input data"
}
```

## 🎨 Frontend Architecture

### Component Structure

```
components/
├── ui/                    # Base UI components (Radix UI)
│   ├── button.tsx
│   ├── input.tsx
│   └── card.tsx
├── forms/                 # Form components
│   ├── SignInForm.tsx
│   ├── SignUpForm.tsx
│   └── CourseForm.tsx
├── layout/                # Layout components
│   ├── DashboardLayout.tsx
│   └── Navigation.tsx
└── features/              # Feature-specific components
    ├── courses/
    ├── students/
    └── analytics/
```

### State Management

- **Server State**: React Query for API data
- **Client State**: React Context for global state
- **Form State**: React Hook Form for form management
- **Authentication**: NextAuth.js session management

### Routing Strategy

```typescript
// app directory structure
app/
├── (auth)/                # Authentication group
│   ├── signin/page.tsx
│   └── signup/page.tsx
├── (dashboard)/           # Protected routes group
│   ├── dashboard/page.tsx
│   ├── courses/page.tsx
│   └── profile/page.tsx
├── api/                   # API routes
│   └── auth/[...nextauth]/route.ts
└── layout.tsx             # Root layout
```

## 🔒 Security Considerations

### Data Protection

1. **Tenant Isolation**: Complete data separation between academies
2. **Input Validation**: Comprehensive validation using Zod schemas
3. **SQL Injection Prevention**: Prisma ORM with parameterized queries
4. **XSS Protection**: React's built-in XSS protection
5. **CSRF Protection**: NextAuth.js built-in CSRF tokens

### Authentication Security

1. **Password Hashing**: bcrypt with salt rounds
2. **JWT Security**: Secure token storage and validation
3. **Session Management**: Secure HTTP-only cookies
4. **Rate Limiting**: API request throttling
5. **HTTPS Enforcement**: SSL/TLS encryption

## 📊 Performance Optimization

### Frontend Optimization

1. **Code Splitting**: Next.js automatic code splitting
2. **Image Optimization**: Next.js Image component
3. **Bundle Analysis**: Webpack bundle analyzer
4. **Lazy Loading**: Dynamic imports for components
5. **Caching**: React Query caching strategies

### Backend Optimization

1. **Database Indexing**: Strategic database indexes
2. **Query Optimization**: Efficient Prisma queries
3. **Connection Pooling**: Database connection management
4. **Caching**: Redis caching for frequently accessed data
5. **CDN**: Static asset delivery optimization

## 🧪 Testing Strategy

### Testing Pyramid

```
        /\
       /  \     E2E Tests (Few)
      /____\    
     /      \   Integration Tests (Some)
    /________\  
   /          \  Unit Tests (Many)
  /____________\
```

### Test Types

1. **Unit Tests**: Component and utility function testing
2. **Integration Tests**: API endpoint and database testing
3. **E2E Tests**: User workflow testing
4. **Performance Tests**: Load and stress testing

### Testing Tools

- **Jest**: Unit and integration testing
- **React Testing Library**: Component testing
- **Playwright**: E2E testing
- **MSW**: API mocking
- **Prisma Test Utils**: Database testing utilities

## 🚀 Deployment & DevOps

### Environment Configuration

```bash
# Development
NODE_ENV=development
DATABASE_URL=postgresql://localhost:5432/coursivo_dev

# Production
NODE_ENV=production
DATABASE_URL=postgresql://prod-host:5432/coursivo_prod
```

### CI/CD Pipeline

1. **Code Quality**: ESLint, Prettier, TypeScript checks
2. **Testing**: Automated test execution
3. **Build**: Production build verification
4. **Deploy**: Automated deployment to staging/production
5. **Monitoring**: Health checks and performance monitoring

### Infrastructure

- **Hosting**: Vercel (recommended) or AWS/GCP
- **Database**: PostgreSQL with connection pooling
- **CDN**: Vercel Edge Network or Cloudflare
- **Monitoring**: Vercel Analytics or custom monitoring
- **Backups**: Automated database backups

## 🔮 Future Considerations

### Scalability

1. **Microservices**: Break down into smaller services
2. **Event-Driven Architecture**: Implement event sourcing
3. **Caching Layer**: Redis for session and data caching
4. **Load Balancing**: Multiple server instances
5. **Database Sharding**: Horizontal database scaling

### Features

1. **Real-time Communication**: WebSocket integration
2. **Mobile Apps**: React Native applications
3. **Analytics**: Advanced reporting and insights
4. **AI Integration**: Personalized learning recommendations
5. **Multi-language Support**: Internationalization (i18n)

## 📚 References

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [NextAuth.js Documentation](https://next-auth.js.org/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Documentation](https://react.dev/)
