"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function EducatorDashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const domain = searchParams.get("domain") || "";

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push(`/academy/signin?domain=${domain}`);
    }
  }, [status, router, domain]);

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push(`/academy/signin?domain=${domain}`);
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "unauthenticated") {
    return <div>Redirecting...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Educator Dashboard - {domain} Academy</h1>
            <button
              onClick={handleSignOut}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Sign Out
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h2 className="text-lg font-semibold mb-2">Academy Info</h2>
              <p><strong>Name:</strong> {session?.user?.name}</p>
              <p><strong>Domain:</strong> {domain}</p>
              <p><strong>Admin Email:</strong> {session?.user?.email}</p>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <h2 className="text-lg font-semibold mb-2">Quick Actions</h2>
              <div className="space-y-2">
                <button className="w-full text-left text-blue-600 hover:underline">
                  View Students
                </button>
                <button className="w-full text-left text-blue-600 hover:underline">
                  Manage Courses
                </button>
                <button className="w-full text-left text-blue-600 hover:underline">
                  Academy Settings
                </button>
              </div>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg">
              <h2 className="text-lg font-semibold mb-2">Student Access</h2>
              <p className="text-sm text-gray-600 mb-2">Share these links with your students:</p>
              <div className="space-y-1 text-xs">
                <p><strong>Sign In:</strong> /signin?tenant={domain}</p>
                <p><strong>Sign Up:</strong> /signup?tenant={domain}</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Welcome to Your Academy Dashboard</h2>
            <p className="text-gray-600 mb-4">
              You&apos;re now managing <strong>{domain} Academy</strong>. 
              This is where you can oversee your students, manage courses, and monitor progress.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded border">
                <h3 className="font-semibold mb-2">Getting Started</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Share student signup links with your class</li>
                  <li>• Monitor student registrations</li>
                  <li>• Set up your first course</li>
                </ul>
              </div>
              <div className="bg-white p-4 rounded border">
                <h3 className="font-semibold mb-2">Next Steps</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Customize your academy settings</li>
                  <li>• Add course content</li>
                  <li>• Track student progress</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
