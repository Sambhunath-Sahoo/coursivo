CREATE TYPE "UserRole" AS ENUM (
  'student',
  'educator'
);

CREATE TYPE "CourseStatus" AS ENUM (
  'draft',
  'published',
  'archived'
);

CREATE TYPE "PaymentProvider" AS ENUM (
  'razorpay',
  'stripe'
);

CREATE TYPE "PaymentStatus" AS ENUM (
  'created',
  'paid',
  'failed',
  'refunded'
);

CREATE TYPE "EnrollmentSource" AS ENUM (
  'purchase',
  'admin',
  'coupon'
);

CREATE TYPE "EnrollmentStatus" AS ENUM (
  'active',
  'revoked'
);

CREATE TYPE "ContentType" AS ENUM (
  'video',
  'file',
  'text'
);

CREATE TABLE "users" (
  "id" uuid PRIMARY KEY,
  "name" varchar(150),
  "email" varchar(255) UNIQUE NOT NULL,
  "role" "UserRole" NOT NULL DEFAULT 'student',
  "avatar_url" varchar(512),
  "created_at" timestamp NOT NULL DEFAULT (now()),
  "updated_at" timestamp NOT NULL DEFAULT (now())
);

CREATE TABLE "educator_bank" (
  "id" uuid PRIMARY KEY,
  "user_id" uuid UNIQUE NOT NULL,
  "account_holder" varchar(150),
  "account_number" varchar(34),
  "ifsc" varchar(20),
  "upi_id" varchar(100),
  "is_verified" bool NOT NULL DEFAULT false,
  "created_at" timestamp NOT NULL DEFAULT (now()),
  "updated_at" timestamp NOT NULL DEFAULT (now())
);

CREATE TABLE "courses" (
  "id" uuid PRIMARY KEY,
  "educator_id" uuid NOT NULL,
  "title" varchar(200) NOT NULL,
  "slug" varchar(220) UNIQUE NOT NULL,
  "description" text,
  "price_cents" int NOT NULL DEFAULT 0,
  "currency" varchar(3) NOT NULL DEFAULT 'INR',
  "status" "CourseStatus" NOT NULL DEFAULT 'draft',
  "thumbnail_url" varchar(512),
  "created_at" timestamp NOT NULL DEFAULT (now()),
  "updated_at" timestamp NOT NULL DEFAULT (now())
);

CREATE TABLE "sections" (
  "id" uuid PRIMARY KEY,
  "course_id" uuid NOT NULL,
  "title" varchar(200) NOT NULL,
  "description" text,
  "order_no" int NOT NULL DEFAULT 1,
  "created_at" timestamp NOT NULL DEFAULT (now())
);

CREATE TABLE "content_items" (
  "id" uuid PRIMARY KEY,
  "section_id" uuid NOT NULL,
  "type" "ContentType" NOT NULL,
  "title" varchar(200) NOT NULL,
  "order_no" int NOT NULL DEFAULT 1,
  "is_preview" bool NOT NULL DEFAULT false,
  "created_at" timestamp NOT NULL DEFAULT (now()),
  "video_asset_id" varchar(150),
  "video_playback_id" varchar(150),
  "duration_seconds" int,
  "file_key" varchar(300),
  "file_size_bytes" bigint,
  "mime_type" varchar(120),
  "body_md" text
);

CREATE TABLE "quizzes" (
  "id" uuid PRIMARY KEY,
  "course_id" uuid NOT NULL,
  "title" varchar(200) NOT NULL,
  "total_marks" int DEFAULT 0,
  "created_at" timestamp NOT NULL DEFAULT (now())
);

CREATE TABLE "quiz_questions" (
  "id" uuid PRIMARY KEY,
  "quiz_id" uuid NOT NULL,
  "question" text NOT NULL,
  "options" jsonb NOT NULL,
  "correct_index" int NOT NULL,
  "explanation" text,
  "created_at" timestamp NOT NULL DEFAULT (now())
);

CREATE TABLE "purchases" (
  "id" uuid PRIMARY KEY,
  "user_id" uuid NOT NULL,
  "course_id" uuid NOT NULL,
  "provider" "PaymentProvider" NOT NULL DEFAULT 'razorpay',
  "provider_payment_id" varchar(120) UNIQUE NOT NULL,
  "amount_cents" int NOT NULL,
  "currency" varchar(3) NOT NULL DEFAULT 'INR',
  "status" "PaymentStatus" NOT NULL DEFAULT 'created',
  "platform_fee_cents" int NOT NULL DEFAULT 0,
  "meta" jsonb,
  "educator_payout_amount_cents" int,
  "educator_payout_status" varchar(20) DEFAULT 'pending',
  "educator_payout_at" timestamp,
  "created_at" timestamp NOT NULL DEFAULT (now())
);

CREATE TABLE "enrollments" (
  "id" uuid PRIMARY KEY,
  "user_id" uuid NOT NULL,
  "course_id" uuid NOT NULL,
  "source" "EnrollmentSource" NOT NULL DEFAULT 'purchase',
  "status" "EnrollmentStatus" NOT NULL DEFAULT 'active',
  "start_at" timestamp NOT NULL DEFAULT (now()),
  "end_at" timestamp,
  "created_at" timestamp NOT NULL DEFAULT (now())
);

CREATE INDEX ON "courses" ("educator_id");

CREATE INDEX ON "courses" ("status", "created_at");

CREATE UNIQUE INDEX ON "courses" ("slug");

CREATE INDEX ON "sections" ("course_id", "order_no");

CREATE INDEX ON "content_items" ("section_id", "order_no");

CREATE INDEX ON "purchases" ("user_id", "course_id");

CREATE INDEX ON "purchases" ("status", "created_at");

CREATE UNIQUE INDEX ON "enrollments" ("user_id", "course_id");

ALTER TABLE "educator_bank" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "courses" ADD FOREIGN KEY ("educator_id") REFERENCES "users" ("id");

ALTER TABLE "sections" ADD FOREIGN KEY ("course_id") REFERENCES "courses" ("id");

ALTER TABLE "content_items" ADD FOREIGN KEY ("section_id") REFERENCES "sections" ("id");

ALTER TABLE "quizzes" ADD FOREIGN KEY ("course_id") REFERENCES "courses" ("id");

ALTER TABLE "quiz_questions" ADD FOREIGN KEY ("quiz_id") REFERENCES "quizzes" ("id");

ALTER TABLE "purchases" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "purchases" ADD FOREIGN KEY ("course_id") REFERENCES "courses" ("id");

ALTER TABLE "enrollments" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "enrollments" ADD FOREIGN KEY ("course_id") REFERENCES "courses" ("id");
