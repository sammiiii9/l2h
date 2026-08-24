import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Max 5MB per upload
const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024;
const ALLOWED_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.svg', '.gif']);

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const files = formData.getAll('files') as File[];

    if (!files || files.length === 0) {
      return NextResponse.json({ error: 'No files provided' }, { status: 400 });
    }

    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const uploadedUrls: { url: string; caption?: string }[] = [];

    for (const file of files) {
      if (file.size > MAX_FILE_SIZE_BYTES) {
        return NextResponse.json({ error: `File "${file.name}" exceeds maximum allowed size of 5MB` }, { status: 400 });
      }

      const rawExt = path.extname(file.name).toLowerCase();
      if (!ALLOWED_EXTENSIONS.has(rawExt)) {
        return NextResponse.json({ error: `Unsupported file format "${rawExt}". Only image files (.jpg, .jpeg, .png, .webp, .svg) are allowed.` }, { status: 400 });
      }

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const cleanName = `${Date.now()}-${Math.random().toString(36).substring(2, 10)}${rawExt}`;
      const filePath = path.join(uploadsDir, cleanName);

      fs.writeFileSync(filePath, buffer);
      uploadedUrls.push({
        url: `/uploads/${cleanName}`,
        caption: file.name.replace(rawExt, '').replace(/[^a-zA-Z0-9\s_-]/g, '').trim()
      });
    }

    return NextResponse.json({
      success: true,
      images: uploadedUrls
    }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to upload files', details: error.message }, { status: 500 });
  }
}
