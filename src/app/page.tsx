import { getStoriesByTypes, type StoryType } from '@/lib/db';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import { 
  ArrowUpRight, 
  Flame, 
  Clock, 
  Trophy, 
  HelpCircle, 
  Layout, 
  Briefcase,
  Newspaper,
  ExternalLink
} from 'lucide-react';
import { Features } from '@/components/home/Features';
import { FAQ } from '@/components/home/FAQ';

export const dynamic = 'force-dynamic';
export const revalidate = 300; // 每小时重新验证一次

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

interface StoryCardProps {
  title: string;
  type: string;
  stories: Story[];
  icon: React.ReactNode;
}

function StoryCard({ title, type, stories, icon }: StoryCardProps) {
  return (
    <div className="backdrop-blur-md bg-white/30 rounded-3xl overflow-hidden border border-gray-200">
      <div className="bg-gradient-to-r from-white/50 to-white/30 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="text-gray-600">
              {icon}
            </div>
            <h2 className="text-lg font-bold text-gray-800">{title}</h2>
          </div>
          <Link
            href={`/category/${type}`}
            className="text-xs text-blue-600 hover:text-blue-800 transition-colors duration-200 flex items-center gap-1"
          >
            查看更多 <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
      <div className="divide-y divide-gray-100/30">
        {stories.map((story) => (
          <article key={story.id} className="p-4 hover:bg-white/40 transition-colors duration-200">
            <div className="flex items-start gap-2">
              {story.url ? (
                <a
                  href={story.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-gray-800 hover:text-blue-600 transition-colors duration-200 flex items-center gap-1 flex-1"
                >
                  {story.titleZh || story.title}
                  <ArrowUpRight className="w-3 h-3 flex-shrink-0" />
                </a>
              ) : (
                <Link
                  href={`/item/${story.id}`}
                  className="text-sm font-medium text-gray-800 hover:text-blue-600 transition-colors duration-200 flex-1"
                >
                  {story.titleZh || story.title}
                </Link>
              )}
            </div>
            <div className="mt-2 text-xs text-gray-500 flex items-center gap-2">
              <span className="flex items-center gap-1">
                <span className="inline-block w-1 h-1 rounded-full bg-blue-500"></span>
                {story.score} 分
              </span>
              <span className="flex items-center gap-1">
                <span className="inline-block w-1 h-1 rounded-full bg-green-500"></span>
                {story.by}
              </span>
              <span className="flex items-center gap-1">
                <span className="inline-block w-1 h-1 rounded-full bg-purple-500"></span>
                {formatDistanceToNow(story.time, {
                  addSuffix: true,
                  locale: zhCN,
                })}
              </span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default async function Home() {
  const types: Array<{ value: StoryType; label: string; icon: React.ReactNode }> = [
    { value: 'top', label: '热门', icon: <Flame className="w-4 h-4" /> },
    { value: 'new', label: '最新', icon: <Clock className="w-4 h-4" /> },
    { value: 'best', label: '最佳', icon: <Trophy className="w-4 h-4" /> },
    { value: 'ask', label: '问答', icon: <HelpCircle className="w-4 h-4" /> },
    { value: 'show', label: '展示', icon: <Layout className="w-4 h-4" /> },
    { value: 'job', label: '工作', icon: <Briefcase className="w-4 h-4" /> },
  ];

  const allStories = await getStoriesByTypes(types.map(t => t.value));

  return (
    <div className="min-h-screen">
      <section className="pt-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex justify-center mb-8">
              <Newspaper className="w-16 h-16 text-blue-600/80" />
            </div>
            <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              HackerNews 中文版
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              自动翻译 HackerNews 热门内容，让您轻松获取科技圈最新动态。包含热门文章、最新资讯、问答讨论、项目展示等多种内容。
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://aimaker.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm bg-white/50 px-4 py-2 rounded-full backdrop-blur-sm group"
              >
                <span className="font-bold text-gray-900">Sponsored by</span>
                <span className="text-[#8B5CF6] underline decoration-[#8B5CF6] hover:text-[#7C3AED]">AI Maker</span>
                <ExternalLink className="w-4 h-4 text-[#8B5CF6] group-hover:text-[#7C3AED]" />
              </a>
              <div className="inline-flex items-center gap-2 text-sm text-gray-500 bg-white/50 px-4 py-2 rounded-full backdrop-blur-sm">
                <Clock className="w-4 h-4" />
                每小时自动更新
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {types.map((type, index) => (
              <StoryCard
                key={type.value}
                title={type.label}
                type={type.value}
                stories={allStories[index] || []}
                icon={type.icon}
              />
            ))}
          </div>
        </div>
      </div>

      <FAQ />
      <Features />
    </div>
  );
}
