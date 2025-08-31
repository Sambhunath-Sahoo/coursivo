import { PrismaClient, CourseStatus } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seed...");

  // Create Rahul Edu educator account
  const educator = await prisma.educator_account.upsert({
    where: { email: "rahul@rahul-edu.com" },
    update: {},
    create: {
      domain: "rahul-edu",
      domain_verified: true,
      name: "Rahul Education",
      email: "rahul@rahul-edu.com",
      password_hash: null, // No password for now
    },
  });

  console.log("✅ Created educator account:", educator.domain);

  // Create courses
  const courses = [
    {
      title: "Complete Web Development Bootcamp",
      slug: "complete-web-development-bootcamp",
      description: "Master modern web development with HTML, CSS, JavaScript, React, Node.js and more. Build real-world projects and learn industry best practices.",
      price_cents: 199900, // INR 1,999
      status: CourseStatus.published,
      thumbnail_url: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
      duration_minutes: 3600, // 60 hours
    },
    {
      title: "Data Structures and Algorithms in Python",
      slug: "data-structures-algorithms-python",
      description: "Learn essential computer science concepts with Python. Master data structures, algorithms, and problem-solving techniques for coding interviews.",
      price_cents: 149900, // INR 1,499
      status: CourseStatus.published,
      thumbnail_url: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4",
      duration_minutes: 2400, // 40 hours
    },
    {
      title: "Machine Learning Fundamentals",
      slug: "machine-learning-fundamentals",
      description: "Start your journey in machine learning. Learn key concepts, algorithms, and practical applications with Python and popular ML libraries.",
      price_cents: 249900, // INR 2,499
      status: CourseStatus.published,
      thumbnail_url: "https://images.unsplash.com/photo-1527474305487-b87b222841cc",
      duration_minutes: 1800, // 30 hours
    },
    {
      title: "UI/UX Design Masterclass",
      slug: "ui-ux-design-masterclass",
      description: "Learn modern UI/UX design principles, tools, and workflows. Create beautiful and user-friendly interfaces using Figma and modern design systems.",
      price_cents: 179900, // INR 1,799
      status: CourseStatus.published,
      thumbnail_url: "https://images.unsplash.com/photo-1561070791-2526d30994b5",
      duration_minutes: 1500, // 25 hours
    },
    {
      title: "Advanced React and Next.js",
      slug: "advanced-react-nextjs",
      description: "Take your React skills to the next level. Learn advanced patterns, server components, and build high-performance web applications.",
      price_cents: 299900, // INR 2,999
      status: CourseStatus.draft,
      thumbnail_url: "https://images.unsplash.com/photo-1633356122544-f134324a6cee",
      duration_minutes: 2100, // 35 hours
    }
  ];

  // Add courses to database
  for (const courseData of courses) {
    const course = await prisma.courses.upsert({
      where: { slug: courseData.slug },
      update: courseData,
      create: {
        ...courseData,
        educator_id: educator.id,
      },
    });
    console.log("✅ Created course:", course.title);
  }

  console.log("🎉 Database seeding completed!");
}

main()
  .catch((e) => {
    console.error("❌ Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });