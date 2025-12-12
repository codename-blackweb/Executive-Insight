import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// ---------------------------------------------------------------------------
// Utility: Tailwind classname merger (your existing function)
// ---------------------------------------------------------------------------
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ---------------------------------------------------------------------------
// API Helper: Prevent frontend crashes when NO backend exists (Netlify deploy)
// In development  -> uses your real Express API on /api
// In production   -> uses mock API responses so the UI still renders
// ---------------------------------------------------------------------------

export const API_BASE = import.meta.env.PROD ? "/mock-api" : "/api";

// Optional mock handler for production builds
// This ensures ANY fetch to /api/* won't break the UI on Netlify
export async function apiFetch(path: string, options?: RequestInit) {
  // Development → call real backend
  if (!import.meta.env.PROD) {
    return fetch(`${API_BASE}${path}`, options);
  }

  // Production → return harmless placeholder data
  console.warn(`Mock API hit: ${path}`);

  // You can expand this switch as needed for demo data
  switch (path) {
    case "/dashboard":
      return new Response(
        JSON.stringify({
          traffic: { visits: 12000, change: "+14%" },
          conversions: { rate: 3.2, change: "+0.8%" },
          engagement: { score: 78, change: "+5%" },
        }),
        { status: 200 }
      );

    default:
      return new Response(
        JSON.stringify({ message: "Mock API OK", path }),
        { status: 200 }
      );
  }
}
