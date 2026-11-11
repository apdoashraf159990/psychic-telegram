import { NextRequest, NextResponse } from 'next/server';

// Owner credentials
// Username: rooh_admin
// Password: Rooh@2026#Admin
const OWNER_USERNAME = 'rooh_admin';
const OWNER_PASSWORD = 'Rooh@2026#Admin';

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json({ success: false, message: 'بيانات ناقصة' }, { status: 400 });
    }

    // Simple secure comparison (in production, use bcrypt with DB lookup)
    const validUsername = username === OWNER_USERNAME;
    const validPassword = password === OWNER_PASSWORD;

    if (!validUsername || !validPassword) {
      // Generic error — don't reveal which field is wrong
      return NextResponse.json({ success: false, message: 'اسم المستخدم أو كلمة المرور غير صحيحة' }, { status: 401 });
    }

    // Create a simple session token
    const token = Buffer.from(`${username}:${Date.now()}:rooh_secret_2026`).toString('base64');

    return NextResponse.json({
      success: true,
      token,
      name: 'عبودي',
      message: 'تم تسجيل الدخول بنجاح',
    });
  } catch {
    return NextResponse.json({ success: false, message: 'خطأ في الخادم' }, { status: 500 });
  }
}
