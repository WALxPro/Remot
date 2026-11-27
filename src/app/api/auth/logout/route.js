import { logoutController } from "@/server/modules/auth/auth.controller";

export const runtime = "nodejs";

export async function POST(request) {
  return logoutController(request);
}