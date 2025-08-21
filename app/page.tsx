import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 p-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Coursivo
          </h1>
          <p className="text-gray-600 mb-8">
            Multi-tenant learning platform with NextAuth.js
          </p>
        </div>

        <div className="space-y-4">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Alpha Academy</h2>
            <div className="space-y-3">
              <Link
                href="/signin?tenant=alpha"
                className="block w-full text-center py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Sign In to Alpha
              </Link>
              <Link
                href="/signup?tenant=alpha"
                className="block w-full text-center py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Sign Up for Alpha
              </Link>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Beta Academy</h2>
            <div className="space-y-3">
              <Link
                href="/signin?tenant=beta"
                className="block w-full text-center py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Sign In to Beta
              </Link>
              <Link
                href="/signup?tenant=beta"
                className="block w-full text-center py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Sign Up for Beta
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">For Educators</h2>
          <div className="space-y-3">
            <Link
              href="/academy/signin"
              className="block w-full text-center py-2 px-4 bg-purple-600 text-white rounded-md hover:bg-purple-700"
            >
              Academy Sign In
            </Link>
            <Link
              href="/academy/signup"
              className="block w-full text-center py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Create New Academy
            </Link>
          </div>
        </div>

        <div className="text-center text-sm text-gray-500">
          <p>Use tenant query parameters for multi-tenant authentication</p>
          <p className="mt-2">
            Example: <code className="bg-gray-200 px-2 py-1 rounded">/signin?tenant=alpha</code>
          </p>
        </div>
      </div>
    </div>
  );
}
