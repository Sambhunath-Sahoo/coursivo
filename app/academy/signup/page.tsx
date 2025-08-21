"use client";

import { signIn, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function EducatorSignupPage() {
  const [formData, setFormData] = useState({ 
    name: "", 
    email: "", 
    password: "", 
    domain: "" 
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const domain = searchParams.get("domain") || "";

  useEffect(() => {
    if (domain) {
      setFormData(prev => ({ ...prev, domain }));
    }
  }, [domain]);

  useEffect(() => {
    if (status === "authenticated" && session) {
      router.push(`/academy/dashboard?domain=${formData.domain}`);
    }
  }, [status, session, router, formData.domain]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Use the educator credentials provider
      const result = await signIn("educator-credentials", {
        email: formData.email,
        password: formData.password,
        name: formData.name,
        domain: formData.domain,
        action: "signup",
        redirect: false,
      });

      if (result?.error) {
        setError(result.error);
      }
    } catch (error) {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-6">
        <div>
          <h2 className="text-center text-3xl font-bold">Create Academy</h2>
          <p className="text-center text-gray-600 mt-2">Set up your new learning academy</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="text-red-600 text-center">{error}</div>
          )}
          
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Academy Name
            </label>
            <input
              id="name"
              type="text"
              required
              placeholder="e.g., Alpha Academy, Beta School"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          
          <div>
            <label htmlFor="domain" className="block text-sm font-medium text-gray-700 mb-1">
              Academy Domain
            </label>
            <input
              id="domain"
              type="text"
              required
              placeholder="e.g., alpha, beta, myschool"
              value={formData.domain}
              onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
              className="w-full px-3 py-2 border rounded-md"
            />
            <p className="text-xs text-gray-500 mt-1">
              This will be used in URLs like: /signin?tenant=alpha
            </p>
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Admin Email
            </label>
            <input
              id="email"
              type="email"
              required
              placeholder="admin@academy.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Admin Password
            </label>
            <input
              id="password"
              type="password"
              required
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-green-600 text-white rounded-md disabled:opacity-50 hover:bg-green-700"
          >
            {loading ? "Creating Academy..." : "Create Academy"}
          </button>
        </form>
        
        <div className="text-center">
          <a href={`/academy/signin?domain=${formData.domain}`} className="text-blue-600 hover:underline">
            Already have an academy? Sign in
          </a>
        </div>
        
        <div className="text-center">
          <a href="/" className="text-gray-500 hover:underline">
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}
