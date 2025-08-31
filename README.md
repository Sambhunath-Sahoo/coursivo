# Coursivo - Multi-Tenant Learning Platform

[![Next.js](https://img.shields.io/badge/Next.js-15.4.6-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-6.14.0-blue)](https://www.prisma.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A modern, scalable learning management system built with Next.js 15, featuring multi-tenant architecture, real-time authentication, and comprehensive course management capabilities.

## 🚀 Features

### Core Platform
- **Multi-tenant Architecture**: Support for multiple academies with isolated data
- **Modern Authentication**: NextAuth.js with JWT sessions and role-based access control
- **Real-time Updates**: Live progress tracking and notifications
- **Responsive Design**: Mobile-first approach with Tailwind CSS

### Learning Management
- **Course Management**: Create, publish, and manage courses with rich content
- **Student Progress Tracking**: Comprehensive analytics and progress monitoring
- **Quiz System**: Interactive assessments with automated grading
- **Content Delivery**: Support for video, text, and file-based learning materials

### Business Features
- **Payment Integration**: Stripe and Razorpay support
- **Instant Payouts**: Automated revenue distribution to educators
- **Analytics Dashboard**: Detailed insights into course performance and student engagement

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Database Setup](#database-setup)
- [Development](#development)
- [Testing](#testing)
- [Deployment](#deployment)
- [Architecture](#architecture)
- [API Reference](#api-reference)
- [Contributing](#contributing)
- [License](#license)

## 🔧 Prerequisites

- **Node.js**: 18.0.0 or higher
- **PostgreSQL**: 12.0 or higher
- **npm**: 8.0.0 or higher (or yarn)
- **Git**: For version control

## 🛠️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/coursivo.git
cd coursivo
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Copy the environment template and configure your variables:

```bash
cp env.example .env.local
```

Edit `.env.local` with your configuration:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/coursivo"

# Authentication
NEXTAUTH_SECRET="your-super-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"

# Payment Providers (Optional)
STRIPE_SECRET_KEY="sk_test_..."
RAZORPAY_KEY_ID="rzp_test_..."
RAZORPAY_KEY_SECRET="your-razorpay-secret"
```

## 🗄️ Database Setup

### 1. Generate Prisma Client

```bash
npm run db:generate
```

### 2. Push Schema to Database

```bash
npm run db:push
```

### 3. Seed Initial Data

```bash
npm run db:seed
```

### 4. (Optional) Run Migrations

```bash
npm run db:migrate
```

## 🚀 Development

### Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with Turbopack |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint and Prettier checks |
| `npm run lint:fix` | Fix ESLint and Prettier issues |
| `npm run format` | Format code with Prettier |
| `npm run db:generate` | Generate Prisma client |
| `npm run db:push` | Push schema changes to database |
| `npm run db:migrate` | Run database migrations |
| `npm run db:studio` | Open Prisma Studio |
| `npm run db:seed` | Seed database with initial data |

## 🧪 Testing

### Run Tests

```bash
npm test
```

### Run Tests in Watch Mode

```bash
npm run test:watch
```

### Run Tests with Coverage

```bash
npm run test:coverage
```

## 🚀 Deployment

### Production Build

```bash
npm run build
npm start
```

### Environment Variables for Production

Ensure all required environment variables are set in your production environment:

- `DATABASE_URL`
- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL`
- Payment provider keys (if applicable)

### Docker Deployment

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

## 🏗️ Architecture

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

### Technology Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS 4, Radix UI components
- **Authentication**: NextAuth.js 4
- **Database**: PostgreSQL with Prisma ORM
- **Payment**: Stripe, Razorpay
- **Deployment**: Vercel, Docker

### Data Flow

```
User Request → Next.js Route → API Handler → Prisma Client → PostgreSQL
                ↓
            Response ← Component ← Data Fetching ← Database Result
```

## 📚 API Reference

### Authentication Endpoints

- `POST /api/auth/signin` - User sign in
- `POST /api/auth/signup` - User registration
- `GET /api/auth/session` - Get current session
- `POST /api/auth/signout` - User sign out

### Course Management

- `GET /api/courses` - List courses
- `POST /api/courses` - Create course
- `GET /api/courses/[id]` - Get course details
- `PUT /api/courses/[id]` - Update course
- `DELETE /api/courses/[id]` - Delete course

### Student Management

- `GET /api/students` - List students
- `POST /api/students` - Create student
- `GET /api/students/[id]` - Get student details
- `PUT /api/students/[id]` - Update student

## 🔒 Security Features

- **JWT Authentication**: Secure token-based sessions
- **Password Hashing**: bcrypt with salt rounds
- **CSRF Protection**: Built-in NextAuth.js security
- **Tenant Isolation**: Data separation between academies
- **Input Validation**: Comprehensive form validation
- **Rate Limiting**: API request throttling

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Standards

- Follow TypeScript best practices
- Use ESLint and Prettier for code formatting
- Write meaningful commit messages
- Include tests for new features
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: [docs.coursivo.com](https://docs.coursivo.com)
- **Issues**: [GitHub Issues](https://github.com/your-username/coursivo/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-username/coursivo/discussions)
- **Email**: support@coursivo.com

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) team for the amazing framework
- [Prisma](https://www.prisma.io/) for the excellent ORM
- [Vercel](https://vercel.com/) for hosting and deployment
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework

---

**Made with ❤️ by the Coursivo Team**
