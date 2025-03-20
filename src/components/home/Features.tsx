import { Sparkles, Globe, Zap, BookOpen } from 'lucide-react';

const features = [
  {
    icon: <Globe className="w-6 h-6" />,
    title: '双语内容',
    description: '自动翻译 HackerNews 热门内容，支持中英文对照阅读，让您轻松理解全球科技动态。'
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: '实时更新',
    description: '每小时自动同步 HackerNews 最新内容，确保您始终获取最新资讯。'
  },
  {
    icon: <BookOpen className="w-6 h-6" />,
    title: '多类型内容',
    description: '包含热门文章、最新资讯、问答讨论、项目展示等多种类型的内容，满足不同阅读需求。'
  },
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: '智能翻译',
    description: '采用先进的 AI 翻译技术，确保翻译质量，让阅读体验更流畅自然。'
  }
];

export function Features() {
  return (
    <section className="py-16 bg-gradient-to-b from-white/50 to-white/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">为什么要看 HackerNews CN？</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            我们致力于为中文用户提供最优质的 HackerNews 内容，让您轻松获取全球科技圈的最新动态，省去使用翻译工具的烦恼。
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="backdrop-blur-md bg-white/30 rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="text-blue-600 mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 