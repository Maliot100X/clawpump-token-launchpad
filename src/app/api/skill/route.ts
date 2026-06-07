import { NextResponse } from 'next/server';
import { readFileSync } from 'fs';
import { join } from 'path';

export async function GET() {
  try {
    const skillPath = join(process.cwd(), 'public', 'SKILL.md');
    const content = readFileSync(skillPath, 'utf-8');
    return new NextResponse(content, {
      headers: { 'Content-Type': 'text/markdown' },
    });
  } catch (error) {
    return NextResponse.json({ error: 'SKILL.md not found' }, { status: 404 });
  }
}
