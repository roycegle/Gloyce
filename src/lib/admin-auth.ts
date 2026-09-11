import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
import { NextResponse } from "next/server";

type Permission = "manage_users" | "manage_payments" | "manage_documents";

export async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session) return { error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
  const role = (session.user as { role?: string }).role;
  if (role !== "admin") return { error: NextResponse.json({ error: "Forbidden" }, { status: 403 }) };
  return { session };
}

export async function requireAdminOrStaff(permission?: Permission) {
  const session = await getServerSession(authOptions);
  if (!session) return { error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
  const user = session.user as { role?: string; permissions?: Permission[] };
  if (user.role === "admin") return { session, role: "admin" as const };
  if (user.role === "staff") {
    if (!permission || (user.permissions ?? []).includes(permission)) {
      return { session, role: "staff" as const };
    }
    return { error: NextResponse.json({ error: "Forbidden" }, { status: 403 }) };
  }
  return { error: NextResponse.json({ error: "Forbidden" }, { status: 403 }) };
}
