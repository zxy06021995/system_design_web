# system_design_web 长时间工作手册

## 1. 目标
在长时间连续执行中保持三件事稳定：
1. 不中断：中断后可从断点恢复。
2. 不降质：每题都过固定质量门禁。
3. 不返工：每一步有记录、有校验、有回滚。

---

## 2. 适用范围
本手册用于 `app/` 仓库内的内容重写任务（如 `public/questions/{id}.md`）。

运行时 API 不变：
1. `src/data/questions.ts` 维护题目元信息。
2. `loadQuestionContent(id)` 读取 `/questions/{id}.md`。

---

## 3. 会话开始（Start）
每次开始前固定做以下动作：

1. 查看当前状态
```bash
git status --short
git log --oneline -n 5
```

2. 阅读 agent 工件
1. `agent/progress.md`
2. `agent/feature_list.json`
3. `agent/quality_gate.md`
4. `agent/session_checklist.md`
5. `agent/runbook.md`

3. 做健康检查
```bash
npm run build
npm run test:e2e:smoke
```

如果 build/smoke 不通过，先修复环境问题，再开始写题。

---

## 4. 单题执行循环（核心）
严格一题一题，单次只改一个文件：`public/questions/{id}.md`。

### Step 1：题意对齐
从 `src/data/questions.ts` 读取该题：
1. `title`
2. `tags`
3. `keyPoints`
4. `learningCoreId`

### Step 2：写作（22节）
每题必须有完整 22 节：
1. 三句话题目本质
2. 真实场景故事
3. 术语白话表（>=10）
4. 需求澄清（功能/非功能/不做范围/SLO）
5. 容量估算（数字推导）
6. 架构（简版+完整版）
7. API 设计（请求/响应/错误码/幂等）
8. 数据模型（实体/索引/分片）
9. 核心流程（正常/高峰/故障恢复）
10. 一致性与事务边界
11. 可用性与容错（含 RTO/RPO）
12. 可观测性（指标+阈值+处置动作）
13. 安全与合规
14. 成本与取舍
15. Java 关键代码（>=5）
16. 前端功能代码（React JS >=2，仅 API 协作）
17. 测试策略
18. 丰富例子（>=10）
19. 面试追问 + 可复述回答
20. 新手学习路线
21. 上场前 Checklist
22. 与母题差异（对应母题/共性/差异/新增知识/话术）

### Step 3：代码深度门禁
Java 至少 5 段，覆盖：
1. 核心算法/状态转移
2. 幂等或去重
3. 重试退避/失败处理
4. 一致性边界（事务/补偿）
5. 观测触发或回滚判定

React JS 至少 2 段，必须包含：
1. API 调用
2. 成功/失败分支
3. loading/error/done 状态流转
4. 协作机制（轮询/重试/幂等键/降级之一）

禁止：
1. `return null` 占位
2. 空方法体
3. 纯 TODO 壳代码

### Step 4：自审评分（100）
1. 完整性 20
2. 易懂性 20
3. 面试可讲性 20
4. 技术深度 20
5. 工程落地性 20

通过条件：
1. 总分 >= 95
2. 无一票否决

一票否决：
1. 缺任一章节
2. Java < 5 或前端 JS < 2
3. 无告警阈值或无恢复路径
4. 与母题差异不具体
5. 模板化复读明显

不通过就当题重写，不允许进入下一题。

---

## 5. 长时节拍（防质量下滑）
1. 每题完成后：做结构门禁 + 自评分。
2. 每 3 题：跑一次 smoke。
```bash
npm run test:e2e:smoke
```
3. 每 10 题：跑一次 build。
```bash
npm run build
```
4. 每批结束（例如 15 题）：做横向去模板化比对，至少比较最近 3 题主线差异。

---

## 6. Playwright 与 MCP 使用策略
优先级顺序：
1. Playwright CLI（必跑，作为硬门禁）
2. MCP（可选增强，不阻塞主流程）

### Playwright 必跑命令
```bash
npm run test:e2e:smoke
```

### MCP 建议用途
1. 自动打开题目页做可视化检查。
2. 截图保存失败现场。
3. 记录“页面可读性”证据。

如果 MCP 不可用：
1. 不阻塞任务；
2. 继续使用 Playwright CLI；
3. 在进度记录中写明 MCP 故障原因。

---

## 7. 故障处理（Runbook 摘要）
1. 构建失败：先修复再继续写题。
```bash
npm run build
```

2. smoke 失败：先定位路由/渲染/内容加载，再重跑。
```bash
npm run test:e2e:smoke
```

3. 推送失败：保留本地提交，网络恢复后重推。
```bash
git push origin main
```

4. 开发端口占用（5173/5174/5175）：先清理端口再启动服务。

---

## 8. 会话结束（End）
结束前固定动作：

1. 校验：
```bash
npm run test:e2e:smoke
```

2. 提交与推送：
```bash
git add .
git commit -m "docs: update question notes with long-running quality gates"
git push origin main
```

3. 写清楚“当前完成到哪一题、下一题是什么”。

---

## 9. 推荐执行模式（给长时任务）
建议按批次推进，不按“想到哪写到哪”：
1. 固定题号列表（升序）。
2. 每批 10 题。
3. 每批结束必须 build + smoke。
4. 每批结束提交一次，避免大提交难回滚。

---

## 10. 一句话原则
“单题闭环、强制门禁、失败即修、按批提交”。

