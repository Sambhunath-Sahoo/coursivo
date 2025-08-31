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

CREATE TYPE "AttemptStatus" AS ENUM (
  'in_progress',
  'submitted',
  'graded'
);

CREATE TYPE "QuizStatus" AS ENUM (
  'draft',
  'published',
  'completed'
);

CREATE TYPE "ProgressStatus" AS ENUM (
  'not_started',
  'in_progress',
  'completed'
);

CREATE TABLE "educator_account" (
  "id" uuid PRIMARY KEY,
  "name" varchar(150),
  "email" varchar(255) UNIQUE NOT NULL,
  "password_hash" varchar(255),
  "avatar_url" varchar(512),
  "domain" varchar(255),
  "domain_verified" bool NOT NULL DEFAULT (false),
  "domain_provider" varchar(100),
  "created_at" timestamp NOT NULL DEFAULT (now()),
  "updated_at" timestamp NOT NULL DEFAULT (now())
);

CREATE TABLE "students" (
  "id" uuid PRIMARY KEY,
  "educator_id" uuid NOT NULL,
  "name" varchar(150),
  "email" varchar(255) UNIQUE NOT NULL,
  "password_hash" varchar(255),
  "avatar_url" varchar(512),
  "is_active" bool NOT NULL DEFAULT (true),
  "created_at" timestamp NOT NULL DEFAULT (now()),
  "updated_at" timestamp NOT NULL DEFAULT (now())
);

CREATE TABLE "educator_bank" (
  "id" uuid PRIMARY KEY,
  "educator_id" uuid NOT NULL,
  "account_holder" varchar(150),
  "account_number" varchar(34),
  "ifsc" varchar(20),
  "upi_id" varchar(100),
  "is_verified" bool NOT NULL DEFAULT (false),
  "created_at" timestamp NOT NULL DEFAULT (now()),
  "updated_at" timestamp NOT NULL DEFAULT (now())
);

CREATE TABLE "courses" (
  "id" uuid PRIMARY KEY,
  "educator_id" uuid NOT NULL,
  "title" varchar(200) NOT NULL,
  "slug" varchar(220) UNIQUE NOT NULL,
  "description" text,
  "price_cents" int NOT NULL DEFAULT (0),
  "discount_percent" int DEFAULT (0),
  "currency" varchar(3) NOT NULL DEFAULT (INR),
  "status" "CourseStatus" NOT NULL DEFAULT (draft),
  "thumbnail_url" varchar(512),
  "duration_minutes" int,
  "created_at" timestamp NOT NULL DEFAULT (now()),
  "updated_at" timestamp NOT NULL DEFAULT (now())
);

CREATE TABLE "sections" (
  "id" uuid PRIMARY KEY,
  "course_id" uuid NOT NULL,
  "title" varchar(200) NOT NULL,
  "description" text,
  "order_no" int NOT NULL DEFAULT (1),
  "created_at" timestamp NOT NULL DEFAULT (now())
);

CREATE TABLE "content_items" (
  "id" uuid PRIMARY KEY,
  "section_id" uuid NOT NULL,
  "type" "ContentType" NOT NULL,
  "title" varchar(200) NOT NULL,
  "order_no" int NOT NULL DEFAULT (1),
  "is_preview" bool NOT NULL DEFAULT (false),
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
  "total_marks" int DEFAULT (0),
  "duration_minutes" int,
  "status" "QuizStatus" NOT NULL DEFAULT (draft),
  "created_at" timestamp NOT NULL DEFAULT (now())
);

CREATE TABLE "quiz_questions" (
  "id" uuid PRIMARY KEY,
  "quiz_id" uuid NOT NULL,
  "question" text NOT NULL,
  "options" jsonb NOT NULL,
  "correct_index" int NOT NULL,
  "image_url" varchar(512),
  "explanation" text,
  "created_at" timestamp NOT NULL DEFAULT (now())
);

CREATE TABLE "quiz_attempts" (
  "id" uuid PRIMARY KEY,
  "quiz_id" uuid NOT NULL,
  "student_id" uuid NOT NULL,
  "status" "AttemptStatus" NOT NULL DEFAULT (in_progress),
  "started_at" timestamp NOT NULL DEFAULT (now()),
  "submitted_at" timestamp,
  "total_questions" int,
  "total_correct" int,
  "total_incorrect" int,
  "score" int,
  "meta" jsonb
);

CREATE TABLE "quiz_attempted_answers" (
  "id" uuid PRIMARY KEY,
  "attempt_id" uuid NOT NULL,
  "question_id" uuid NOT NULL,
  "selected_index" int,
  "is_correct" bool,
  "time_spent_seconds" int,
  "answered_at" timestamp NOT NULL DEFAULT (now())
);

CREATE TABLE "purchases" (
  "id" uuid PRIMARY KEY,
  "educator_id" uuid NOT NULL,
  "student_id" uuid NOT NULL,
  "course_id" uuid NOT NULL,
  "provider" "PaymentProvider" NOT NULL DEFAULT (razorpay),
  "provider_payment_id" varchar(120) UNIQUE NOT NULL,
  "amount_cents" int NOT NULL,
  "currency" varchar(3) NOT NULL DEFAULT (INR),
  "status" "PaymentStatus" NOT NULL DEFAULT (created),
  "platform_fee_cents" int NOT NULL DEFAULT (0),
  "meta" jsonb,
  "educator_payout_amount_cents" int,
  "educator_payout_status" varchar(20) DEFAULT (pending),
  "educator_payout_at" timestamp,
  "created_at" timestamp NOT NULL DEFAULT (now())
);

CREATE TABLE "enrollments" (
  "id" uuid PRIMARY KEY,
  "student_id" uuid NOT NULL,
  "course_id" uuid NOT NULL,
  "source" "EnrollmentSource" NOT NULL DEFAULT (purchase),
  "status" "EnrollmentStatus" NOT NULL DEFAULT (active),
  "start_at" timestamp NOT NULL DEFAULT (now()),
  "end_at" timestamp,
  "created_at" timestamp NOT NULL DEFAULT (now())
);

CREATE TABLE "course_completion_certificates" (
  "id" uuid PRIMARY KEY,
  "enrollment_id" uuid NOT NULL,
  "certificate_url" varchar(512),
  "certificate_id" varchar(100),
  "issued_at" timestamp NOT NULL DEFAULT (now()),
  "signed_by" varchar(150),
  "revoked_at" timestamp,
  "meta" jsonb
);

CREATE TABLE "enrollment_content_progress" (
  "id" uuid PRIMARY KEY,
  "enrollment_id" uuid NOT NULL,
  "content_item_id" uuid NOT NULL,
  "status" "ProgressStatus" NOT NULL DEFAULT (not_started),
  "progress_percent" int,
  "last_position_seconds" int,
  "attempts_count" int,
  "last_viewed_at" timestamp,
  "completed_at" timestamp,
  "created_at" timestamp NOT NULL DEFAULT (now()),
  "updated_at" timestamp NOT NULL DEFAULT (now())
);

CREATE UNIQUE INDEX ON "students" ("email");

CREATE INDEX ON "students" ("educator_id", "is_active", "created_at");

CREATE UNIQUE INDEX ON "educator_bank" ("educator_id");

CREATE INDEX ON "courses" ("status", "created_at");

CREATE INDEX ON "sections" ("course_id", "order_no");

CREATE INDEX ON "content_items" ("section_id", "order_no");

CREATE INDEX ON "quizzes" ("course_id", "created_at");

CREATE INDEX ON "quiz_questions" ("quiz_id");

CREATE INDEX ON "quiz_attempts" ("quiz_id", "student_id");

CREATE INDEX ON "quiz_attempts" ("student_id", "status", "started_at");

CREATE UNIQUE INDEX ON "quiz_attempted_answers" ("attempt_id", "question_id");

CREATE INDEX ON "quiz_attempted_answers" ("attempt_id");

CREATE INDEX ON "purchases" ("educator_id", "created_at");

CREATE INDEX ON "purchases" ("student_id", "course_id");

CREATE INDEX ON "purchases" ("status", "created_at");

CREATE INDEX ON "purchases" ("course_id", "created_at");

CREATE UNIQUE INDEX ON "enrollments" ("student_id", "course_id");

CREATE INDEX ON "enrollments" ("student_id");

CREATE INDEX ON "enrollments" ("course_id");

CREATE UNIQUE INDEX ON "course_completion_certificates" ("enrollment_id");

CREATE UNIQUE INDEX ON "course_completion_certificates" ("certificate_id");

CREATE UNIQUE INDEX ON "enrollment_content_progress" ("enrollment_id", "content_item_id");

CREATE INDEX ON "enrollment_content_progress" ("enrollment_id");

CREATE INDEX ON "enrollment_content_progress" ("content_item_id");

ALTER TABLE "students" ADD FOREIGN KEY ("educator_id") REFERENCES "educator_account" ("id");

ALTER TABLE "educator_bank" ADD FOREIGN KEY ("educator_id") REFERENCES "educator_account" ("id");

ALTER TABLE "courses" ADD FOREIGN KEY ("educator_id") REFERENCES "educator_account" ("id");

ALTER TABLE "sections" ADD FOREIGN KEY ("course_id") REFERENCES "courses" ("id");

ALTER TABLE "content_items" ADD FOREIGN KEY ("section_id") REFERENCES "sections" ("id");

ALTER TABLE "quizzes" ADD FOREIGN KEY ("course_id") REFERENCES "courses" ("id");

ALTER TABLE "quiz_questions" ADD FOREIGN KEY ("quiz_id") REFERENCES "quizzes" ("id");

ALTER TABLE "quiz_attempts" ADD FOREIGN KEY ("quiz_id") REFERENCES "quizzes" ("id");

ALTER TABLE "quiz_attempts" ADD FOREIGN KEY ("student_id") REFERENCES "students" ("id");

ALTER TABLE "quiz_attempted_answers" ADD FOREIGN KEY ("attempt_id") REFERENCES "quiz_attempts" ("id");

ALTER TABLE "quiz_attempted_answers" ADD FOREIGN KEY ("question_id") REFERENCES "quiz_questions" ("id");

ALTER TABLE "purchases" ADD FOREIGN KEY ("educator_id") REFERENCES "educator_account" ("id");

ALTER TABLE "purchases" ADD FOREIGN KEY ("student_id") REFERENCES "students" ("id");

ALTER TABLE "purchases" ADD FOREIGN KEY ("course_id") REFERENCES "courses" ("id");

ALTER TABLE "enrollments" ADD FOREIGN KEY ("student_id") REFERENCES "students" ("id");

ALTER TABLE "enrollments" ADD FOREIGN KEY ("course_id") REFERENCES "courses" ("id");

ALTER TABLE "course_completion_certificates" ADD FOREIGN KEY ("enrollment_id") REFERENCES "enrollments" ("id");

ALTER TABLE "enrollment_content_progress" ADD FOREIGN KEY ("enrollment_id") REFERENCES "enrollments" ("id");

ALTER TABLE "enrollment_content_progress" ADD FOREIGN KEY ("content_item_id") REFERENCES "content_items" ("id");
