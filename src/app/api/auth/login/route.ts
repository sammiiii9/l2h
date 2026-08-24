import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const cleanEmail = email.toLowerCase().trim();

    // Verify authorized credentials
    if (password === 'l2h@2026' || password === 'admin123') {
      const user = {
        id: 'usr-1',
        name: cleanEmail.includes('ananya') ? 'Ananya Deshmukh' : cleanEmail.includes('siddharth') ? 'Siddharth Oberoi' : 'Vikram Malhotra',
        email: cleanEmail,
        role: cleanEmail.includes('ananya') ? 'Director — Residential' : cleanEmail.includes('siddharth') ? 'Director — Commercial' : 'Principal Partner',
        phone: '+91 8439654385',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
        token: `l2h_auth_${Date.now()}_${Math.random().toString(36).substring(2)}`
      };

      const response = NextResponse.json({ success: true, user, token: user.token });
      
      // Set secure auth cookie
      response.cookies.set('l2h_admin_session', user.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7 // 7 days
      });

      return response;
    }

    return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
  } catch (error: any) {
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
  }
}
