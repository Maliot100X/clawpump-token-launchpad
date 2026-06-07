import { NextResponse } from 'next/server';
import { getLaunches } from '@/lib/clawpump-api';

export async function GET() {
  try {
    const data = await getLaunches();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ launches: [] }, { status: 500 });
  }
}
