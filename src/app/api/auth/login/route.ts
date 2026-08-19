import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const cleanEmail = email.toLowerCase().trim();

    // Verification check
    if (password === 'l2h@2026' || password === 'admin123' || password === 'admin') {
      let user = {
        id: 'usr-1',
        name: 'Vikram Malhotra',
        email: cleanEmail,
        role: 'Admin',
        phone: '+91 98990 12345',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
        token: `l2h_jwt_${Date.now()}_${Math.random().toString(36).substring(2)}`
      };

      if (cleanEmail.includes('advisor')) {
        user.role = 'Sales Advisor';
        user.name = 'Ananya Sharma';
      } else if (cleanEmail.includes('manager')) {
        user.role = 'Manager';
        user.name = 'Siddharth Roy';
      }

      return NextResponse.json({ success: true, user, token: user.token });
    }

    return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
  } catch (error: any) {
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
  }
}
