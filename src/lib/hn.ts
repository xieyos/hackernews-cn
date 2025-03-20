import axios from 'axios';

const BASE_URL = 'https://hacker-news.firebaseio.com/v0';
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

export interface HNItem {
  id: number;
  type: 'story' | 'comment' | 'job' | 'poll' | 'pollopt';
  by?: string;
  time: number;
  text?: string;
  dead?: boolean;
  parent?: number;
  poll?: number;
  kids?: number[];
  url?: string;
  score?: number;
  title?: string;
  parts?: number[];
  descendants?: number;
  deleted?: boolean;
  titleZh?: string;
  textZh?: string;
}

export interface HNUser {
  id: string;
  created: number;
  karma: number;
  about?: string;
  submitted?: number[];
}

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // 10 seconds timeout
});

async function fetchWithRetry<T>(url: string, retries = MAX_RETRIES): Promise<T | null> {
  try {
    const response = await instance.get<T>(url);
    return response.data;
  } catch (error) {
    if (retries > 0) {
      console.log(`Retrying... ${retries} attempts left`);
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
      return fetchWithRetry<T>(url, retries - 1);
    }
    console.error(`Failed to fetch ${url}:`, error);
    return null;
  }
}

// Fetch story IDs by type (top, new, best, etc.)
export async function fetchStories(type: string): Promise<number[]> {
  const stories = await fetchWithRetry<number[]>(`/${type}stories.json`);
  return stories || [];
}

// Fetch a single item by ID
async function fetchItem(id: number): Promise<HNItem | null> {
  return fetchWithRetry<HNItem>(`/item/${id}.json`);
}

// Fetch multiple stories by their IDs
export async function fetchMultipleStories(ids: number[]): Promise<HNItem[]> {
  const stories = await Promise.all(
    ids.map(id => fetchItem(id))
  );
  return stories.filter((story): story is HNItem => story !== null);
}

export async function fetchUser(id: string): Promise<HNUser | null> {
  return fetchWithRetry<HNUser>(`/user/${id}.json`);
}

// 批量获取评论
export async function fetchComments(ids: number[]): Promise<HNItem[]> {
  const comments = await Promise.all(
    ids.map(id => fetchItem(id))
  );
  return comments.filter((comment): comment is HNItem => 
    comment !== null && comment.type === 'comment'
  );
} 