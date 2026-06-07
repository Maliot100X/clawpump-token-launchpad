import { NextResponse } from 'next/server';
import { getTreasury } from '@/lib/clawpump-api';

export async function GET() {
  try {
    const data = await getTreasury();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(null, { status: 500 });
  }
}
