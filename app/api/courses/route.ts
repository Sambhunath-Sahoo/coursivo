import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const domain = searchParams.get("domain");

    if (!domain) {
      return NextResponse.json(
        { error: "Domain parameter is required" },
        { status: 400 }
      );
    }

    // Get educator by domain
    const educator = await prisma.educator_account.findFirst({
      where: { domain },
    });

    if (!educator) {
      return NextResponse.json(
        { error: "Educator not found" },
        { status: 404 }
      );
    }

    // Get published courses for this educator
    const courses = await prisma.courses.findMany({
      where: {
        educator_id: educator.id,
        status: "published",
      },
      select: {
        id: true,
        title: true,
        description: true,
        price_cents: true,
        currency: true,
        thumbnail_url: true,
        duration_minutes: true,
      },
      orderBy: {
        created_at: "desc",
      },
    });

    return NextResponse.json({
      success: true,
      courses,
    });
  } catch (error) {
    console.error("Error fetching courses:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
