import { NextResponse } from 'next/server';

export async function POST() {
  try {
    const response = NextResponse.json(
      { message: 'Logout successful' },
      { status: 200 }
    );
    
    // Clear cookie
    response.cookies.set('whatssite_phone', '', {
      httpOnly: true,
      maxAge: 0,
      path: '/'
    });

    return response;
  } catch (error) {
    console.error('Error logging out:', error);
    return NextResponse.json(
      { error: 'Server error during logout' },
      { status: 500 }
    );
  }
}
