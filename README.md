# Coursivo - Single-Educator MVP Platform

This is a [Next.js](https://nextjs.org) project for Coursivo, a platform designed for single educators to create and sell courses globally with instant payouts.

## Features

- **Single Educator Focus**: One educator brand, global student base
- **Instant Payouts**: Real-time payment processing and educator payouts
- **Course Management**: Create, organize, and publish courses
- **Student Progress Tracking**: Detailed analytics and completion tracking
- **Quiz System**: Comprehensive assessment with attempt tracking
- **Multi-Payment Support**: Razorpay and Stripe integration
- **Custom Domain Branding**: Educator-specific domains

## Tech Stack

- **Frontend**: Next.js 15 with App Router
- **Database**: PostgreSQL with Prisma ORM
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + shadcn/ui
- **Authentication**: NextAuth.js (ready to configure)

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- npm or yarn

### Installation

1. **Clone and install dependencies**:

   ```bash
   npm install
   ```

2. **Set up environment**:

   ```bash
   cp env.example .env
   # Edit .env with your database URL and other configs
   ```

3. **Set up database**:

   ```bash
   npm run db:generate  # Generate Prisma client
   npm run db:push      # Push schema to database
   ```

4. **Start development server**:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Database Schema

The platform uses a comprehensive Prisma schema with models for:

- Educator accounts and branding
- Course catalog and content management
- Student enrollment and progress tracking
- Payment processing and payout management
- Quiz system and assessment tracking

See `prisma/README.md` for detailed schema documentation.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
