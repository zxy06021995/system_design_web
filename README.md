# System Design Web

一个系统设计题库学习网站，前端基于 `React + TypeScript + Vite`，支持：

- 题目列表浏览与筛选
- 单题 Markdown 内容渲染
- 母题与非母题学习映射（由题库元数据驱动）
- 本地开发、构建与部署

## 技术栈

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Radix UI
- React Router

## 本地开发

```bash
npm install
npm run dev
```

默认开发地址通常为：

- `http://localhost:5173`

## 构建与预览

```bash
npm run build
npm run preview
```

## 目录结构

```text
app/
  public/
    questions/          # 题目 Markdown 内容（按 id 命名，如 25.md）
  src/
    data/questions.ts   # 题库元数据（标题、分类、母题映射等）
    pages/              # 页面组件
    components/         # 通用与业务组件
```

## 题目数据来源与加载规则

- 题目元数据：`src/data/questions.ts`
- 题目正文：`public/questions/{id}.md`
- 运行时加载函数：`loadQuestionContent(id)`（按 `id` 拉取 markdown）

## 内容维护规范（建议）

1. 新增/修改题目正文时，文件名必须与题目 `id` 一致。  
2. 先改 `questions.ts` 再补对应 markdown，避免页面出现空内容。  
3. 提交前建议执行一次：

```bash
npm run build
```

## 常见命令

```bash
# 开发
npm run dev

# 构建
npm run build

# 本地预览构建产物
npm run preview

# 代码检查
npm run lint
```

## Git 提交建议

- 提交信息按“范围 + 动作”描述，例如：
  - `docs: rewrite question 37 note`
  - `feat: update question taxonomy mapping`
  - `fix: correct markdown loading path`

## License

仅用于学习与个人项目实践，商业使用请自行评估内容版权与合规要求。
