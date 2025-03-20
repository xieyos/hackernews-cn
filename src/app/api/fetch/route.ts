import { NextResponse } from 'next/server';
import { fetchStories, fetchMultipleStories } from '@/lib/hn';
import { translateStory } from '@/lib/translate';
import { createStory, storyExists } from '@/lib/db';

interface Story {
  id: number;
  title: string;
  titleZh: string | null;
}

export async function GET() {
  try {
    // 先获取 new 类型的最新文章
    console.log('正在获取最新文章...');
    const newStoryIds = await fetchStories('new');
    console.log('获取到的最新故事IDs:', newStoryIds.slice(0, 30));
    
    const newStories = await fetchMultipleStories(newStoryIds.slice(0, 30));
    console.log('获取到的最新故事详情:', newStories.map(s => ({ id: s.id, title: s.title })));
    
    const results: Array<{ id: number; title: string }> = [];
    
    // 处理每个故事
    for (const story of newStories) {
      try {
        if (!story) {
          console.log('跳过空故事');
          continue;
        }

        const exists = await storyExists(story.id);
        console.log(`故事 ${story.id} ${exists ? '已存在' : '不存在'}`);

        if (!exists) {
          // 翻译故事
          console.log(`开始翻译故事 ${story.id}`);
          const translation = await translateStory(story);
          console.log(`故事 ${story.id} 翻译完成:`, translation);

          // 保存故事
          const savedStory = await createStory(story, translation) as Story;
          console.log(`故事 ${story.id} 保存完成`);

          results.push({
            id: savedStory.id,
            title: savedStory.titleZh || savedStory.title
          });
        }
      } catch (err) {
        console.error('处理故事时出错:', story?.id, err);
        continue;
      }
    }

    return NextResponse.json({ 
      success: true, 
      message: `成功获取内容：${results.length} 篇文章`,
      results 
    });
  } catch (error) {
    console.error('Manual fetch error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', message: String(error) }, 
      { status: 500 }
    );
  }
}

// 配置路由处理程序
export const dynamic = 'force-dynamic';
export const maxDuration = 300; // 设置最大执行时间为5分钟