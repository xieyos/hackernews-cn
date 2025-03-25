import { getStories, type StoryType } from '@/lib/db';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import { ArrowUpRight, ArrowLeft, ExternalLink } from 'lucide-react';

export const dynamic = 'force-dynamic';

interface Story {
  id: number;
  title: string;
  titleZh: string | null;
  url: string | null;
  text: string | null;
  textZh: string | null;
  by: string;
  score: number;
  time: Date;
}

const typeMap: Record<StoryType, string> = {
  top: '24小时热榜',
  new: '最新',
  week: '一周热榜',
  ask: '问答',
  show: '展示',
  job: '工作',
};

function isValidStoryType(type: string): type is StoryType {
  return type in typeMap;
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: { type: string };
  searchParams: { page?: string };
}) {
  const page = parseInt(searchParams.page || '1', 10);
  const pageSize = 20; // 每页显示20篇文章
  const type = isValidStoryType(params.type) ? params.type : 'top';
  
  try {
    const { stories, totalPages } = await getStories(type, page, pageSize);

    // 如果请求的页码超出范围，重定向到第一页
    if (page > totalPages && totalPages > 0) {
      return {
        redirect: {
          destination: `/category/${params.type}?page=1`,
          permanent: false,
        },
      };
    }

    if (!stories || stories.length === 0) {
      return (
        <main className="container mx-auto max-w-7xl px-4 pt-24 pb-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">暂无数据</h1>
            <p className="text-gray-600">该分类下暂时没有文章，请稍后再试。</p>
            <Link href="/" className="mt-4 inline-block text-blue-600 hover:text-blue-800">
              返回首页
            </Link>
          </div>
        </main>
      );
    }

    // 计算分页范围
    const maxDisplayPages = 5;
    const startPage = Math.max(1, page - Math.floor(maxDisplayPages / 2));
    const endPage = Math.min(totalPages, startPage + maxDisplayPages - 1);

    return (
      <main className="container mx-auto max-w-7xl px-4 pt-24 pb-8">
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/"
            className="flex items-center gap-2 text-gray-600 hover:text-black"
          >
            <ArrowLeft className="w-4 h-4" />
            返回首页
          </Link>
          <h1 className="text-3xl font-bold">
            {typeMap[type]}
          </h1>
        </div>

        <div className="space-y-6">
          {stories.map((story: Story) => (
            <article key={story.id} className="bg-white/50 rounded-2xl border border-gray-100 p-4">
              <div className="flex items-start gap-2">
                {story.url ? (
                  <a
                    href={story.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-md font-medium hover:text-blue-600 flex items-center gap-1 flex-1"
                  >
                    {story.titleZh || story.title}
                    <ArrowUpRight className="w-4 h-4 flex-shrink-0" />
                  </a>
                ) : (
                  <Link
                    href={`/item/${story.id}`}
                    className="text-lg font-medium hover:text-blue-600 flex-1"
                  >
                    {story.titleZh || story.title}
                  </Link>
                )}
              </div>
              <div className="mt-2 text-sm text-gray-500">
                <span>{story.score} 分</span>
                <span className="mx-2">•</span>
                <span>作者: {story.by}</span>
                <span className="mx-2">•</span>
                <span>
                  {formatDistanceToNow(story.time, {
                    addSuffix: true,
                    locale: zhCN,
                  })}
                </span>
                <span className="mx-2">•</span>
                <a
                  href={`https://news.ycombinator.com/item?id=${story.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-600 inline-flex items-center"
                >
                  原帖
                  <ExternalLink className="w-3 h-3 ml-0.5" />
                </a>
              </div>
              {story.text && story.textZh && (
                <div className="mt-3 text-sm text-gray-700">{story.textZh}</div>
              )}
            </article>
          ))}
        </div>

        <div className="flex justify-center items-center gap-2 mt-8">
          {page > 1 && (
            <a
              href={`/category/${params.type}?page=${page - 1}`}
              className="px-4 py-2 rounded-lg border hover:bg-gray-50"
            >
              上一页
            </a>
          )}
          
          {page > 2 && (
            <a
              href={`/category/${params.type}?page=1`}
              className="px-4 py-2 rounded-lg border hover:bg-gray-50"
            >
              1
            </a>
          )}
          
          {page > 3 && <span className="px-2">...</span>}
          
          {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map(p => (
            <a
              key={p}
              href={`/category/${params.type}?page=${p}`}
              className={`px-4 py-2 rounded-lg border ${
                p === page
                  ? 'bg-blue-50 text-blue-600 border-blue-200'
                  : 'hover:bg-gray-50'
              }`}
            >
              {p}
            </a>
          ))}
          
          {page < totalPages - 2 && <span className="px-2">...</span>}
          
          {page < totalPages - 1 && (
            <a
              href={`/category/${params.type}?page=${totalPages}`}
              className="px-4 py-2 rounded-lg border hover:bg-gray-50"
            >
              {totalPages}
            </a>
          )}
          
          {page < totalPages && (
            <a
              href={`/category/${params.type}?page=${page + 1}`}
              className="px-4 py-2 rounded-lg border hover:bg-gray-50"
            >
              下一页
            </a>
          )}
        </div>
      </main>
    );
  } catch (error) {
    console.error('加载分类页面失败:', error);
    return (
      <main className="container mx-auto max-w-7xl px-4 pt-24 pb-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">出错了</h1>
          <p className="text-gray-600">加载数据时发生错误，请刷新页面重试。</p>
          <Link href="/" className="mt-4 inline-block text-blue-600 hover:text-blue-800">
            返回首页
          </Link>
        </div>
      </main>
    );
  }
}