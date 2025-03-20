
帮我写一个prompt，我让cursor来写，描述清楚我的技术栈，
我要用next.js来开发这个项目，使用这个API（https://github.com/HackerNews/API），数据库用posgrasql, 部署在vercel，翻译用openai 4omini来翻译，隔一段时间就更新一次
使用shadcn，图标用lucide icon,

----

# Cursor Prompt: 中文版HackerNews开发

我需要开发一个中文版的HackerNews网站，使用HackerNews官方API获取内容，并将内容翻译成中文。请帮我实现这个项目，以下是技术栈和要求：

## 技术栈
- **前端框架**: npx create-next-app@14 .（直接在当前目录中茶u你感觉爱你next.js14）
- **UI组件**: shadcn/ui
- **图标**: Lucide Icons
- **数据库**: PostgreSQL
- **ORM**: Prisma
- **部署平台**: Vercel
- **翻译服务**: OpenAI o4mini API
- **定时更新**: Vercel Cron Jobs

## 功能需求
1. 从HackerNews API (https://github.com/HackerNews/API) 获取内容
2. 将获取的英文内容翻译成中文（标题、正文和评论）
3. 在数据库中存储原始内容和翻译后的内容
4. 定期自动更新和翻译新内容（使用Vercel Cron Jobs）
5. 提供与原版HackerNews类似的用户体验，但所有内容均为中文
6. 支持查看不同类别的内容（热门、最新、最佳、问答等）
7. 支持查看评论树结构

## 数据库设计
需要存储原始内容和翻译后的内容，包括文章、评论和用户信息。

## 翻译策略
使用OpenAI 4o-mini API进行批量翻译，需要考虑API限制和成本优化。

## UI/UX设计
- 保持HackerNews简洁的设计风格
- 使用shadcn/ui组件库确保现代美观的界面
- 使用Lucide Icons提供清晰的图标

## 部署和维护
- 部署在Vercel平台
- 设置定时任务定期更新内容
- 监控翻译API使用情况和成本

请帮我实现这个项目，包括项目结构、核心功能代码、数据库模型、翻译逻辑和定时更新机制。