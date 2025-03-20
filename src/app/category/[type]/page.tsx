import { getStories, type StoryType } from '@/lib/db';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import { ArrowUpRight, ArrowLeft } from 'lucide-react';

export const dynamic = 'force-dynamic';
export const revalidate = 300; // 每5分钟重新验证一次

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
  top: '热门',
  new: '最新',
  best: '最佳',
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
  const stories = await getStories(type, page, pageSize);

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
            </div>
            {story.text && story.textZh && (
              <div className="mt-3 text-sm text-gray-700">{story.textZh}</div>
            )}
          </article>
        ))}
      </div>

      <div className="flex justify-between items-center mt-8">
        <Link
          href={`/category/${params.type}?page=${Math.max(1, page - 1)}`}
          className={`px-4 py-2 rounded-lg border ${
            page === 1
              ? 'opacity-50 cursor-not-allowed'
              : 'hover:bg-gray-50'
          }`}
        >
          上一页
        </Link>
        <span className="text-sm text-gray-500">第 {page} 页</span>
        <Link
          href={`/category/${params.type}?page=${page + 1}`}
          className="px-4 py-2 rounded-lg border hover:bg-gray-50"
        >
          下一页
        </Link>
      </div>
    </main>
  );
} 