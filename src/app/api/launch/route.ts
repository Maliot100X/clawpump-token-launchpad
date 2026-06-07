import { NextResponse } from 'next/server';
import { launchToken } from '@/lib/clawpump-api';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = await launchToken(body);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
