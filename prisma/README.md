# Coursivo Prisma Schema

This directory contains the Prisma schema for the Coursivo platform - a single-educator MVP with instant payouts.

## Overview

The schema is designed for a platform where:
- One educator can create and sell courses globally
- Students can enroll in courses and track progress
- Instant payouts are processed for educators
- Comprehensive quiz and assessment system
- Progress tracking at the content item level

## Key Models

### Identity
- **educator_account**: Main educator profile with domain branding
- **students**: Student accounts linked to the educator
- **educator_bank**: Bank details for payouts

### Catalog
- **courses**: Course information with pricing and status
- **sections**: Course sections for organization
- **content_items**: Individual content pieces (video, file, text)

### Assessment
- **quizzes**: Course quizzes with questions
- **quiz_questions**: Individual quiz questions with options
- **quiz_attempts**: Student quiz attempts
- **quiz_attempted_answers**: Individual question responses

### Commerce
- **purchases**: Payment transactions with payout tracking
- **enrollments**: Student course access

### Progress & Certificates
- **enrollment_content_progress**: Detailed progress tracking
- **course_completion_certificates**: Completion certificates

## Database Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment**:
   - Copy `env.example` to `.env`
   - Update `DATABASE_URL` with your PostgreSQL connection string

3. **Generate Prisma client**:
   ```bash
   npm run db:generate
   ```

4. **Push schema to database**:
   ```bash
   npm run db:push
   ```

5. **Open Prisma Studio** (optional):
   ```bash
   npm run db:studio
   ```

## Usage in Code

```typescript
import { prisma } from '@/lib/prisma'

// Example: Get all published courses
const courses = await prisma.courses.findMany({
  where: { status: 'published' },
  include: {
    educator: true,
    sections: {
      include: {
        content_items: true
      }
    }
  }
})

// Example: Create a new student
const student = await prisma.students.create({
  data: {
    educator_id: 'educator-uuid',
    name: 'John Doe',
    email: 'john@example.com',
    password_hash: 'hashed-password'
  }
})
```

## Key Features

- **Instant Payouts**: Tracks educator payout status and amounts
- **Flexible Content**: Supports video, file, and text content types
- **Progress Tracking**: Normalized progress tracking per content item
- **Quiz System**: Comprehensive assessment with attempt tracking
- **Multi-payment**: Support for Razorpay and Stripe
- **Domain Branding**: Custom domain support for educators

## Naming Convention

The schema uses **snake_case** throughout for consistency:
- Model names: `educator_account`, `content_items`, `quiz_attempts`
- Field names: `password_hash`, `created_at`, `video_asset_id`
- Relation names: `educator_bank`, `course_completion_certificates`

This matches your database design exactly and provides a consistent naming experience.

## Indexes

The schema includes strategic indexes for:
- Course status and creation date
- Student enrollment lookups
- Payment status tracking
- Quiz performance analytics
- Progress tracking queries

## Next Steps

1. Set up your PostgreSQL database
2. Configure your `.env` file
3. Run `npm run db:push` to create tables
4. Start building your application with the generated Prisma client
