import React from 'react';
import { cookies } from 'next/headers';
import { db } from '@/services/db';
import DashboardClient from './DashboardClient';

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('session_token')?.value;

  if (!token) {
    return null; // Secured by layout auth redirect/render
  }

  const session = await db.getSession(token);
  if (!session || !session.user) {
    return null; // Secured by layout
  }

  const user = session.user;
  
  // Retrieve websites registered for this user phone number
  const websites = await db.getWebsitesByUserId(user.id);

  return (
    <DashboardClient
      user={{ id: user.id, phoneNumber: user.phoneNumber }}
      initialWebsites={websites}
    />
  );
}
