import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

export interface AuthPayload {
  userId: string;
}

export function getAuthUser(req: NextRequest): AuthPayload {
  const authHeader = req.headers.get("authorization");

  if (!authHeader) {
    throw new Error("Missing Authorization header");
  }

  const [type, token] = authHeader.split(" ");

  if (type !== "Bearer" || !token) {
    throw new Error("Invalid Authorization format");
  }

  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET not configured");
  }

  const decoded = jwt.verify(token, secret) as AuthPayload;

  if (!decoded?.userId) {
    throw new Error("Invalid token payload");
  }

  return decoded;
}
