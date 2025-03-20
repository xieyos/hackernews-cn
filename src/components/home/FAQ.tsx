'use client';

import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

const faqs = [
  {
    question: 'HackerNews 中文版是什么？',
    answer: 'HackerNews 中文版是一个自动翻译 HackerNews 热门内容的平台，为中文用户提供便捷的科技资讯阅读体验。我们精选并翻译 HackerNews 上的优质内容，包括技术文章、创业故事、问答讨论等。'
  },
  {
    question: '内容更新频率如何？',
    answer: '我们每小时自动同步一次 HackerNews 的最新内容，确保您能及时获取最新的科技资讯。所有内容都会经过智能翻译，并保持原文链接，方便您查看原始内容。'
  },
  {
    question: '如何参与讨论？',
    answer: '由于我们是一个内容聚合平台，讨论功能暂时未开放。如果您想参与讨论，可以点击文章链接跳转到 HackerNews 原页面进行评论。我们会在每篇文章中保留原文链接，方便您直接访问。'
  },
  {
    question: '内容是否完全准确？',
    answer: '我们使用先进的 AI 翻译技术，并经过人工审核，确保翻译质量。但如果您发现任何不准确的地方，欢迎随时反馈，我们会及时修正。'
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">常见问题</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            关于 HackerNews 中文版，您可能想了解的问题
          </p>
        </div>
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="backdrop-blur-md bg-white/30 rounded-2xl border border-gray-200 overflow-hidden"
            >
              <button
                className="w-full px-6 py-4 flex items-center justify-between text-left"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-medium text-gray-900">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 