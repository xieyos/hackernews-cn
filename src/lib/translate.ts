import OpenAI from 'openai';
import { HNItem } from './hn';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function translateText(text: string): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content: "你是一个专业的翻译器，需要将英文内容翻译成地道的中文。保持专业术语的准确性，同时确保翻译后的内容通俗易懂。"
        },
        {
          role: "user",
          content: `请将以下内容翻译成中文：\n\n${text}`
        }
      ],
      temperature: 0.3,
    });

    return response.choices[0]?.message?.content || text;
  } catch (error) {
    console.error('Translation error:', error);
    return text;
  }
}

export async function translateStory(story: HNItem): Promise<{ titleZh: string; textZh?: string }> {
  const titleZh = await translateText(story.title || '');
  const textZh = story.text ? await translateText(story.text) : undefined;

  return {
    titleZh,
    textZh,
  };
}

export async function translateComment(comment: HNItem): Promise<{ textZh: string }> {
  const textZh = await translateText(comment.text || '');
  return { textZh };
}

// 批量翻译，使用延迟来避免超出API限制
export async function batchTranslate<T, R>(
  items: T[],
  translateFn: (item: T) => Promise<R>,
  delayMs: number = 1000
): Promise<(R | null)[]> {
  const results: (R | null)[] = [];
  
  for (const item of items) {
    try {
      const result = await translateFn(item);
      results.push(result);
      await new Promise(resolve => setTimeout(resolve, delayMs));
    } catch (error) {
      console.error('Batch translation error:', error);
      results.push(null);
    }
  }

  return results;
} 