import { cookies } from "next/headers";
import { createHmac, timingSafeEqual } from "crypto";
import AdminLogin from "./AdminLogin";
import AdminDashboard from "./AdminDashboard";

function isAuthenticated(sessionCookie: string | undefined): boolean {
  const adminPassword = process.env.ADMIN_PASSWORD;
  const sessionSecret = process.env.SESSION_SECRET;

  if (!adminPassword || !sessionSecret || !sessionCookie) return false;

  const expected = createHmac("sha256", sessionSecret).update(adminPassword).digest("hex");
  try {
    return timingSafeEqual(Buffer.from(sessionCookie), Buffer.from(expected));
  } catch {
    return false;
  }
}

export default async function AdminPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");
  const authenticated = isAuthenticated(session?.value);

  if (!authenticated) {
    return <AdminLogin />;
  }

  return <AdminDashboard />;
}
