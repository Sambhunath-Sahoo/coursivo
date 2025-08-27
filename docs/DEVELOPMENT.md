# Coursivo Development Guide

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0.0 or higher
- PostgreSQL 12.0 or higher
- npm 8.0.0 or higher
- Git

### Initial Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/coursivo.git
   cd coursivo
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Set up the database**
   ```bash
   npm run db:generate
   npm run db:push
   npm run db:seed
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

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

- **Student Pages**: Utilize dynamic routing with `[domain]` to handle multi-tenant architecture.
- **Educator Pages**: Located under `app/educator/` for educator-specific functionality.

### Development Workflow

- **Setup**: Follow the updated folder structure for organizing new components and pages.
- **Routing**: Ensure all student pages use the `[domain]` structure for dynamic routing.
- **Testing**: Verify navigation and routing work correctly across different domains.

### File Naming Conventions

- **Components**: PascalCase (e.g., `UserProfile.tsx`)
- **Pages**: lowercase with hyphens (e.g., `user-profile/page.tsx`)
- **API Routes**: lowercase with hyphens (e.g., `user-profile/route.ts`)
- **Utilities**: camelCase (e.g., `formatDate.ts`)
- **Types**: PascalCase (e.g., `UserTypes.ts`)

## 🎨 Component Development

### Component Structure

```typescript
// components/features/courses/CourseCard.tsx
import { FC } from 'react'
import { Course } from '@/types/course'

interface CourseCardProps {
  course: Course
  onEdit?: (course: Course) => void
  onDelete?: (courseId: string) => void
}

export const CourseCard: FC<CourseCardProps> = ({
  course,
  onEdit,
  onDelete
}) => {
  return (
    <div className="rounded-lg border bg-card p-6">
      <h3 className="text-lg font-semibold">{course.title}</h3>
      <p className="text-muted-foreground">{course.description}</p>
      {/* Component content */}
    </div>
  )
}
```

### Component Guidelines

1. **Single Responsibility**: Each component should have one clear purpose
2. **Props Interface**: Always define TypeScript interfaces for props
3. **Default Props**: Use default values for optional props
4. **Error Boundaries**: Wrap components in error boundaries when appropriate
5. **Accessibility**: Include proper ARIA labels and semantic HTML

### Styling Guidelines

- Use Tailwind CSS utility classes
- Follow mobile-first responsive design
- Maintain consistent spacing and typography
- Use CSS variables for theme customization

## 🔐 Authentication Development

### NextAuth.js Configuration

```typescript
// lib/auth.ts
import { NextAuthOptions } from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import CredentialsProvider from 'next-auth/providers/credentials'
import { prisma } from './prisma'
import bcrypt from 'bcryptjs'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = await prisma.students.findUnique({
          where: { email: credentials.email }
        })

        if (!user || !user.password_hash) {
          return null
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password_hash
        )

        if (!isPasswordValid) {
          return null
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: 'student'
        }
      }
    })
  ],
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
        session.user.role = token.role as string
      }
      return session
    }
  },
  pages: {
    signIn: '/signin',
    signUp: '/signup'
  }
}
```

### Protected Routes

```typescript
// components/auth/ProtectedRoute.tsx
'use client'

import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRole?: string
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole
}) => {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (!session) {
    redirect('/signin')
  }

  if (requiredRole && session.user.role !== requiredRole) {
    redirect('/unauthorized')
  }

  return <>{children}</>
}
```

## 🗄️ Database Development

### Prisma Schema Best Practices

```prisma
// prisma/schema.prisma
model students {
  id             String   @id @default(cuid())
  email          String   @unique @db.VarChar(255)
  name           String?  @db.VarChar(150)
  password_hash  String?  @db.VarChar(255)
  
  // Timestamps
  created_at     DateTime @default(now())
  updated_at     DateTime @updatedAt
  
  // Relations
  educator_id    String
  educator       educator_account @relation(fields: [educator_id], references: [id])
  
  // Indexes
  @@index([email])
  @@index([educator_id])
}
```

### Database Operations

```typescript
// lib/courses.ts
import { prisma } from './prisma'
import { Course, CreateCourseInput } from '@/types/course'

export class CourseService {
  static async createCourse(data: CreateCourseInput): Promise<Course> {
    return await prisma.courses.create({
      data: {
        title: data.title,
        description: data.description,
        educator_id: data.educator_id,
        price: data.price,
        status: 'draft'
      }
    })
  }

  static async getCoursesByEducator(educatorId: string): Promise<Course[]> {
    return await prisma.courses.findMany({
      where: { educator_id: educatorId },
      include: {
        enrollments: true,
        content: true
      }
    })
  }

  static async updateCourse(id: string, data: Partial<Course>): Promise<Course> {
    return await prisma.courses.update({
      where: { id },
      data
    })
  }

  static async deleteCourse(id: string): Promise<void> {
    await prisma.courses.delete({
      where: { id }
    })
  }
}
```

## 🚀 API Development

### API Route Structure

```typescript
// app/api/courses/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { CourseService } from '@/lib/courses'
import { validateCreateCourse } from '@/lib/validations'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const educatorId = searchParams.get('educator_id')

    if (!educatorId) {
      return NextResponse.json(
        { error: 'Educator ID is required' },
        { status: 400 }
      )
    }

    const courses = await CourseService.getCoursesByEducator(educatorId)
    
    return NextResponse.json({
      success: true,
      data: courses
    })
  } catch (error) {
    console.error('Error fetching courses:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== 'educator') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const validation = validateCreateCourse(body)

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validation.errors },
        { status: 400 }
      )
    }

    const course = await CourseService.createCourse({
      ...body,
      educator_id: session.user.id
    })

    return NextResponse.json({
      success: true,
      data: course,
      message: 'Course created successfully'
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating course:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
```

### API Response Standards

```typescript
// types/api.ts
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
  pagination?: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export interface ApiError {
  success: false
  error: string
  message?: string
  details?: any
}
```

## 🧪 Testing

### Unit Testing

```typescript
// __tests__/components/CourseCard.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { CourseCard } from '@/components/features/courses/CourseCard'

const mockCourse = {
  id: '1',
  title: 'Test Course',
  description: 'Test Description',
  status: 'published' as const
}

describe('CourseCard', () => {
  it('renders course information correctly', () => {
    render(<CourseCard course={mockCourse} />)
    
    expect(screen.getByText('Test Course')).toBeInTheDocument()
    expect(screen.getByText('Test Description')).toBeInTheDocument()
  })

  it('calls onEdit when edit button is clicked', () => {
    const mockOnEdit = jest.fn()
    render(<CourseCard course={mockCourse} onEdit={mockOnEdit} />)
    
    const editButton = screen.getByRole('button', { name: /edit/i })
    fireEvent.click(editButton)
    
    expect(mockOnEdit).toHaveBeenCalledWith(mockCourse)
  })
})
```

### API Testing

```typescript
// __tests__/api/courses.test.ts
import { createMocks } from 'node-mocks-http'
import { GET, POST } from '@/app/api/courses/route'
import { prisma } from '@/lib/prisma'

jest.mock('@/lib/prisma')

describe('/api/courses', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('GET', () => {
    it('returns courses for valid educator ID', async () => {
      const { req, res } = createMocks({
        method: 'GET',
        query: { educator_id: 'test-educator' }
      })

      const mockCourses = [
        { id: '1', title: 'Course 1' },
        { id: '2', title: 'Course 2' }
      ]

      ;(prisma.courses.findMany as jest.Mock).mockResolvedValue(mockCourses)

      await GET(req)

      expect(res._getStatusCode()).toBe(200)
      expect(JSON.parse(res._getData())).toEqual({
        success: true,
        data: mockCourses
      })
    })
  })
})
```

## 🔧 Development Tools

### Code Quality

1. **ESLint**: Code linting and style enforcement
2. **Prettier**: Code formatting
3. **TypeScript**: Type checking
4. **Husky**: Git hooks for pre-commit checks

### Development Scripts

```json
{
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "prisma generate && next build",
    "start": "next start",
    "lint": "next lint && prettier --check .",
    "lint:fix": "next lint --fix && prettier --write .",
    "format": "prettier --write .",
    "type-check": "tsc --noEmit",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  }
}
```

### Environment Configuration

```bash
# .env.local
NODE_ENV=development
DATABASE_URL="postgresql://username:password@localhost:5432/coursivo_dev"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# Development-specific variables
LOG_LEVEL=debug
ENABLE_SWAGGER=true
```

## 🚀 Performance Optimization

### Frontend Optimization

1. **Code Splitting**: Use dynamic imports for large components
2. **Image Optimization**: Implement Next.js Image component
3. **Bundle Analysis**: Regular bundle size monitoring
4. **Lazy Loading**: Load components and data on demand

### Backend Optimization

1. **Database Indexing**: Strategic database indexes
2. **Query Optimization**: Efficient Prisma queries
3. **Caching**: Implement Redis caching
4. **Connection Pooling**: Database connection management

## 🔒 Security Best Practices

1. **Input Validation**: Validate all user inputs
2. **Authentication**: Implement proper session management
3. **Authorization**: Role-based access control
4. **Data Sanitization**: Sanitize data before database operations
5. **HTTPS**: Enforce HTTPS in production
6. **Rate Limiting**: Implement API rate limiting

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [NextAuth.js Documentation](https://next-auth.js.org/)
