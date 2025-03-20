import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET(request: Request) {
  try {
    // 获取查询参数
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    
    // 获取每种类型的文章数量和示例
    const types = ['story', 'ask', 'show', 'job'];
    const results = await Promise.all(types.map(async (t) => {
      const count = await prisma.story.count({ where: { type: t } });
      const examples = await prisma.story.findMany({
        where: { type: t },
        select: {
          id: true,
          title: true,
          titleZh: true,
          type: true,
          time: true
        },
        take: 3,
        orderBy: { time: 'desc' }
      });
      return { type: t, count, examples };
    }));

    // 如果指定了类型，返回该类型的所有文章
    if (type) {
      const stories = await prisma.story.findMany({
        where: {
          type: type === 'top' || type === 'new' || type === 'best' 
            ? 'story' 
            : type
        },
        orderBy: [{ score: 'desc' }, { time: 'desc' }],
        select: {
          id: true,
          title: true,
          titleZh: true,
          type: true,
          time: true,
          score: true
        }
      });
      return NextResponse.json({ type, count: stories.length, stories });
    }

    return NextResponse.json({ results });
  } catch (error) {
    console.error('Debug API error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', message: String(error) },
      { status: 500 }
    );
  }
} 