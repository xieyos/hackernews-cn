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
              <span className="flex items-center gap-1">
                <span className="inline-block w-1 h-1 rounded-full bg-orange-500"></span>
                <a
                  href={`https://news.ycombinator.com/item?id=${story.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-600"
                >
                  原帖
                  <ExternalLink className="inline-block w-3 h-3 ml-0.5" />
                </a>
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
    { value: 'top', label: '24小时热榜', icon: <Flame className="w-4 h-4" /> },
    { value: 'week', label: '一周热榜', icon: <Trophy className="w-4 h-4" /> },
    { value: 'new', label: '最新', icon: <Clock className="w-4 h-4" /> },
    { value: 'ask', label: '问答', icon: <HelpCircle className="w-4 h-4" /> },
    { value: 'show', label: '展示', icon: <Layout className="w-4 h-4" /> },
    { value: 'job', label: '工作', icon: <Briefcase className="w-4 h-4" /> },
  ];

  const allStories = await getStoriesByTypes(types.map(t => t.value));

  return (
    <div className="min-h-screen">
      <section className="pt-24">
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
