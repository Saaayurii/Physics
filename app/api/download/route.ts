// app/api/download/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { content, filename } = body;

    if (!content?.trim() || !filename?.trim()) {
      return NextResponse.json({ 
        message: 'Нужно передать непустые content и filename' 
      }, { status: 400 });
    }

    const headers = new Headers();
    headers.set('Content-Type', 'application/javascript; charset=utf-8');
    headers.set('Content-Disposition', `attachment; filename="${filename}"`);

    return new NextResponse(content, { status: 200, headers });

  } catch (error) {
    console.error('Download API Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({
      message: 'Ошибка при формировании файла для скачивания',
      error: errorMessage
    }, { status: 500 });
  }
}
