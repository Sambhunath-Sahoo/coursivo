"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const tenant = searchParams.get("tenant") || "alpha";

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push(`/signin?tenant=${tenant}`);
    }
  }, [status, router, tenant]);

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push(`/signin?tenant=${tenant}`);
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "unauthenticated") {
    return <div>Redirecting...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Dashboard - {tenant} Academy</h1>
            <button
              onClick={handleSignOut}
              className="px-4 py-2 bg-red-600 text-white rounded-md"
            >
              Sign Out
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h2 className="text-lg font-semibold mb-2">User Info</h2>
              <p><strong>Email:</strong> {session?.user?.email}</p>
              <p><strong>Name:</strong> {session?.user?.name}</p>
              <p><strong>Role:</strong> {session?.user?.role}</p>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <h2 className="text-lg font-semibold mb-2">Tenant Info</h2>
              <p><strong>Tenant:</strong> {session?.user?.tenant}</p>
              <p><strong>Educator ID:</strong> {session?.user?.educatorId}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
