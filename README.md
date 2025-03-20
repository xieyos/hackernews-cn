# HackerNews 中文版

这是一个使用现代技术栈构建的 HackerNews 中文版网站，提供实时翻译的英文科技新闻和讨论。

## 项目特点

- 🚀 实时同步 HackerNews 最新内容
- 🤖 使用 OpenAI API 智能翻译
- 💻 现代化的用户界面设计
- ⚡ 快速的加载速度和响应式设计
- 🌐 支持多种内容分类浏览

## 技术栈

### 前端
- **Next.js 14**: React框架，用于构建现代化的服务端渲染应用
- **Tailwind CSS**: 用于样式开发的实用优先的CSS框架
- **shadcn/ui**: 高质量的UI组件库
- **Lucide Icons**: 现代简约风格的图标库

### 后端
- **Next.js API Routes**: 服务端API实现
- **Prisma**: 现代化的ORM工具
- **PostgreSQL**: 主数据库
- **OpenAI API**: 提供高质量的内容翻译服务

### 部署和基础设施
- **Vercel**: 应用托管和自动部署
- **Vercel Cron Jobs**: 定时任务处理
- **Vercel Postgres**: 数据库服务

## 本地开发

1. 克隆项目
\`\`\`bash
git clone [repository-url]
cd hackernews-cn
\`\`\`

2. 安装依赖
\`\`\`bash
pnpm install
\`\`\`

3. 配置环境变量
\`\`\`bash
cp .env.example .env
\`\`\`
然后编辑 .env 文件，填入必要的环境变量：
- DATABASE_URL: PostgreSQL 数据库连接URL
- OPENAI_API_KEY: OpenAI API密钥
- NEXT_PUBLIC_APP_URL: 应用URL
- CRON_SECRET: 定时任务密钥

4. 初始化数据库
\`\`\`bash
pnpm prisma db push
\`\`\`

5. 启动开发服务器
\`\`\`bash
pnpm dev
\`\`\`

访问 http://localhost:3000 查看应用。

## 部署

本项目已配置为可以直接部署到 Vercel 平台。

1. Fork 本项目到你的 GitHub 账号
2. 在 Vercel 中导入项目
3. 配置必要的环境变量
4. 部署完成后即可访问

## 项目结构

\`\`\`
├── src/
│   ├── app/          # Next.js 应用路由和页面
│   ├── components/   # React 组件
│   ├── lib/         # 工具函数和配置
│   └── types/       # TypeScript 类型定义
├── prisma/          # 数据库模型和迁移
├── public/          # 静态资源
└── ...配置文件
\`\`\`

## 功能特性

- 实时同步 HackerNews 最新内容
- 智能翻译文章标题和内容
- 支持查看原文链接
- 评论系统的中英对照
- 多种内容分类（最新、最热、Ask HN等）
- 响应式设计，支持移动端访问
- 快速的页面加载和转换
- 定时更新内容确保信息及时性

## 贡献指南

欢迎提交 Pull Request 或创建 Issue！

## 开源协议

MIT License
