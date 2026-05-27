import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/services/db';

export async function POST(req: NextRequest) {
  const token = req.cookies.get('session_token')?.value;

  if (token) {
    // Delete session from db
    try {
      await db.deleteSession(token);
    } catch (err) {
      console.warn('Prisma error during logout session cleanup:', err);
    }
  }

  // Clear cookie response
  const response = NextResponse.json({ success: true });
  response.cookies.delete('session_token');
  return response;
}
