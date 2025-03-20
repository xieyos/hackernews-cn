import { PrismaClient } from '@prisma/client';
import { HNItem } from './hn';

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export const prisma = global.prisma || new PrismaClient({
  log: ['error'],
});

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

// 添加重试逻辑的包装函数
async function withRetry<T>(operation: () => Promise<T>, maxRetries = 3): Promise<T> {
  let lastError: Error | undefined;
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error as Error;
      if (i === maxRetries - 1) break;
      
      // 等待一段时间后重试
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
  
  throw lastError;
}

export async function createStory(item: HNItem, translation: { titleZh: string; textZh?: string }) {
  return withRetry(() => prisma.story.create({
    data: {
      id: item.id,
      title: item.title || '',
      titleZh: translation.titleZh,
      url: item.url,
      text: item.text,
      textZh: translation.textZh,
      by: item.by || '',
      score: item.score || 0,
      descendants: item.descendants || 0,
      time: new Date((item.time || 0) * 1000),
      type: item.type || 'story',
      dead: item.dead || false,
      deleted: item.deleted || false,
      kids: item.kids || [],
      translated: true,
    },
  }));
}

export type StoryType = 'top' | 'new' | 'best' | 'ask' | 'show' | 'job';

type OrderBy = {
  score?: 'asc' | 'desc';
  time?: 'asc' | 'desc';
}[];

export async function getStoriesByTypes(types: StoryType[], pageSize: number = 8) {
  try {
    const results = await withRetry(async () => {
      const queries = types.map(type => {
        const baseQuery = {
          deleted: false,
          dead: false,
          type: type === 'top' || type === 'new' || type === 'best' ? 'story' : type,
        };

        let orderBy: OrderBy;
        switch (type) {
          case 'top':
            orderBy = [{ score: 'desc' }, { time: 'desc' }];
            break;
          case 'new':
            orderBy = [{ time: 'desc' }];
            break;
          case 'best':
            orderBy = [{ score: 'desc' }];
            break;
          default:
            orderBy = [{ score: 'desc' }, { time: 'desc' }];
        }

        return prisma.story.findMany({
          where: baseQuery,
          orderBy,
          take: pageSize,
        });
      });

      return Promise.all(queries);
    });

    return results;
  } catch (error) {
    console.error('查询文章失败:', error instanceof Error ? error.message : error);
    return types.map(() => []);  // 返回空数组数组
  }
}

export async function getStories(
  type: StoryType = 'top',
  page: number = 1,
  pageSize: number = 20
) {
  const skip = (page - 1) * pageSize;

  try {
    return await withRetry(async () => {
      const baseQuery = {
        deleted: false,
        dead: false,
        type: type === 'top' || type === 'new' || type === 'best' ? 'story' : type,
      };

      let orderBy: OrderBy;
      switch (type) {
        case 'top':
          orderBy = [{ score: 'desc' }, { time: 'desc' }];
          break;
        case 'new':
          orderBy = [{ time: 'desc' }];
          break;
        case 'best':
          orderBy = [{ score: 'desc' }];
          break;
        default:
          orderBy = [{ score: 'desc' }, { time: 'desc' }];
      }

      const stories = await prisma.story.findMany({
        where: baseQuery,
        orderBy,
        skip,
        take: pageSize,
      });

      return stories;
    });
  } catch (error) {
    console.error('查询文章失败:', error instanceof Error ? error.message : error);
    return [];
  }
}

export async function getStory(id: number) {
  return withRetry(() => 
    prisma.story.findUnique({
      where: { id },
    })
  );
}

export async function storyExists(id: number): Promise<boolean> {
  const count: number = await withRetry(() => 
    prisma.story.count({
      where: { id },
    })
  );
  return count > 0;
}

export default prisma; 