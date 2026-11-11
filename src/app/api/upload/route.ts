import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "لم يتم تحديد أي ملف للرفع." }, { status: 400 });
    }

    // Validate mime type
    const allowed = ["image/jpeg", "image/png", "image/webp", "audio/webm", "audio/wav", "audio/mpeg"];
    if (!allowed.includes(file.type)) {
      return NextResponse.json({ error: "نوع الملف غير مدعوم. يرجى اختيار صورة JPG أو PNG أو WEBP." }, { status: 400 });
    }

    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const ext = path.extname(file.name) || (file.type.includes("png") ? ".png" : ".jpg");
    const safeName = `rooh_upload_${Date.now()}_${Math.random().toString(36).slice(2, 8)}${ext}`;
    const filePath = path.join(uploadsDir, safeName);

    fs.writeFileSync(filePath, buffer);

    const publicUrl = `/uploads/${safeName}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      fileName: file.name,
      size: file.size,
      mimeType: file.type,
    });
  } catch (err: any) {
    console.error("Upload error:", err);
    return NextResponse.json({ error: "فشل رفع الملف إلى السيرفر." }, { status: 500 });
  }
}

