import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Prism from 'prismjs';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-yaml';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-go';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-http';
import 'prismjs/themes/prism-tomorrow.css';

import { questions } from '../data/questions';
import { loadQuestionContent } from '../data/questions';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';

import { Separator } from '../components/ui/separator';
import { 
  Star, 
  TrendingUp, 
  BookOpen, 
  Zap, 
  Loader2,
  Bookmark,
  Share2,
  ChevronLeft,
  Clock,
  Target,
  CheckCircle2
} from 'lucide-react';

const difficultyConfig = {
  '超高频': {
    color: 'bg-red-500/10 text-red-500 border-red-500/20',
    icon: Star,
    label: '超高频',
    description: '面试必考，出现概率极高'
  },
  '高频': {
    color: 'bg-orange-500/10 text-orange-500 border-orange-500/20',
    icon: TrendingUp,
    label: '高频',
    description: '经常出现，建议重点掌握'
  },
  '中频': {
    color: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    icon: BookOpen,
    label: '中频',
    description: '偶尔出现，了解即可'
  },
  '低频': {
    color: 'bg-gray-500/10 text-gray-500 border-gray-500/20',
    icon: Zap,
    label: '低频',
    description: '较少出现，按需学习'
  }
};

export function QuestionPage() {
  const { id } = useParams<{ id: string }>();
  const [content, setContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const contentRef = useRef<HTMLDivElement>(null);

  const question = questions.find(q => q.id === parseInt(id || '0'));

  useEffect(() => {
    if (question) {
      setLoading(true);
      loadQuestionContent(question.id)
        .then(data => {
          setContent(data);
          setLoading(false);
        })
        .catch(() => {
          setContent(null);
          setLoading(false);
        });
    }
  }, [question]);

  // 代码高亮
  useEffect(() => {
    if (content && contentRef.current) {
      Prism.highlightAllUnder(contentRef.current);
    }
  }, [content]);

  if (!question) {
    return (
      <div className="container mx-auto px-4 py-20 max-w-7xl text-center">
        <h1 className="text-2xl font-bold mb-4">题目未找到</h1>
        <p className="text-muted-foreground mb-6">该题目不存在或已被删除</p>
        <Link to="/">
          <Button>
            <ChevronLeft className="w-4 h-4 mr-2" />
            返回首页
          </Button>
        </Link>
      </div>
    );
  }

  const config = difficultyConfig[question.difficulty];
  const DifficultyIcon = config.icon;

  return (
    <div className="min-h-screen bg-background">
      {/* 顶部导航 */}
      <div className="border-b bg-background/95 backdrop-blur sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 max-w-7xl">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="sm">
                <ChevronLeft className="w-4 h-4 mr-2" />
                返回列表
              </Button>
            </Link>
            <Separator orientation="vertical" className="h-6" />
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>#{question.id.toString().padStart(3, '0')}</span>
              <span>/</span>
              <span>{question.domain ? `${question.domain} · ${question.category}` : question.category}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 题目头部 */}
      <div className="border-b bg-muted/30">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="outline" className={`${config.color}`}>
                  <span className="flex items-center gap-1">
                    <DifficultyIcon className="w-3 h-3" />
                    {config.label}
                  </span>
                </Badge>
                {question.domain && <Badge variant="outline">{question.domain}</Badge>}
                <Badge variant="secondary">{question.category}</Badge>
                {question.isCoreQuestion ? (
                  <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                    母题
                  </Badge>
                ) : question.learningCoreId ? (
                  <Badge variant="outline">
                    母题 #{question.learningCoreId}
                  </Badge>
                ) : null}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                {question.title}
              </h1>
              <p className="text-lg text-muted-foreground">
                {question.titleEn}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Bookmark className="w-4 h-4 mr-2" />
                收藏
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                分享
              </Button>
            </div>
          </div>

          {/* 题目概览 */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-4 bg-background rounded-lg border">
              <Clock className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">建议用时</p>
                <p className="font-semibold">45 分钟</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-background rounded-lg border">
              <Target className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">核心考点</p>
                <p className="font-semibold">{question.tags.slice(0, 3).join(', ')}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-background rounded-lg border">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">掌握程度</p>
                <p className="font-semibold">{config.description}</p>
              </div>
            </div>
          </div>

          <div className="mt-4 p-4 bg-background rounded-lg border">
            <p className="text-sm text-muted-foreground mb-2">最小母题学习建议</p>
            <p className="text-sm mb-3">
              {question.learningWhy || '优先掌握同类母题，再补充本题差异知识。'}
            </p>
            {!question.isCoreQuestion && question.learningCoreId ? (
              <Link to={`/question/${question.learningCoreId}`}>
                <Button variant="outline" size="sm">
                  查看母题 #{question.learningCoreId}
                </Button>
              </Link>
            ) : null}
            {question.learningExtraSkills && question.learningExtraSkills.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {question.learningExtraSkills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 内容区域 */}
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* 左侧内容 */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                <span className="ml-3 text-muted-foreground">加载中...</span>
              </div>
            ) : content ? (
              <div ref={contentRef} className="prose prose-slate dark:prose-invert max-w-none">
                <ReactMarkdown 
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h1: ({ children }) => <h1 className="text-2xl font-bold mt-8 mb-4 pb-2 border-b scroll-mt-24">{children}</h1>,
                    h2: ({ children }) => <h2 className="text-xl font-semibold mt-6 mb-3 text-primary scroll-mt-24">{children}</h2>,
                    h3: ({ children }) => <h3 className="text-lg font-semibold mt-4 mb-2 scroll-mt-24">{children}</h3>,
                    h4: ({ children }) => <h4 className="text-base font-semibold mt-3 mb-2 scroll-mt-24">{children}</h4>,
                    p: ({ children }) => <p className="mb-4 leading-relaxed">{children}</p>,
                    ul: ({ children }) => <ul className="list-disc pl-6 mb-4 space-y-1">{children}</ul>,
                    ol: ({ children }) => <ol className="list-decimal pl-6 mb-4 space-y-1">{children}</ol>,
                    li: ({ children }) => <li className="mb-1">{children}</li>,
                    code: ({ children, className }) => {
                      const isInline = !className;
                      const language = className?.replace('language-', '') || 'text';
                      return isInline ? (
                        <code className="px-1.5 py-0.5 bg-muted rounded text-sm font-mono">{children}</code>
                      ) : (
                        <div className="relative my-4">
                          <div className="absolute top-0 right-0 px-3 py-1 text-xs text-muted-foreground bg-muted rounded-bl">
                            {language}
                          </div>
                          <pre className="p-4 bg-[#2d2d2d] rounded-lg overflow-x-auto">
                            <code className={`language-${language} text-sm font-mono`}>{children}</code>
                          </pre>
                        </div>
                      );
                    },
                    table: ({ children }) => (
                      <div className="overflow-x-auto mb-4">
                        <table className="w-full border-collapse border border-border">{children}</table>
                      </div>
                    ),
                    thead: ({ children }) => <thead className="bg-muted">{children}</thead>,
                    th: ({ children }) => <th className="border border-border px-3 py-2 text-left font-semibold">{children}</th>,
                    td: ({ children }) => <td className="border border-border px-3 py-2">{children}</td>,
                    blockquote: ({ children }) => (
                      <blockquote className="border-l-4 border-primary pl-4 italic my-4 text-muted-foreground">
                        {children}
                      </blockquote>
                    ),
                    hr: () => <Separator className="my-6" />,
                  }}
                >
                  {content}
                </ReactMarkdown>
              </div>
            ) : (
              <div className="text-center py-20 text-muted-foreground">
                <p>暂无详细内容</p>
              </div>
            )}
          </div>

          {/* 右侧目录 */}
          <div className="hidden lg:block">
            <div className="sticky top-24">
              <div className="p-4 bg-muted/50 rounded-lg border">
                <h4 className="font-semibold mb-3">题目导航</h4>
                <div className="space-y-1">
                  <Link to={`/question/${Math.max(1, question.id - 1)}`}>
                    <Button variant="ghost" size="sm" className="w-full justify-start" disabled={question.id <= 1}>
                      <ChevronLeft className="w-4 h-4 mr-2" />
                      上一题
                    </Button>
                  </Link>
                  <Link to={`/question/${Math.min(questions.length, question.id + 1)}`}>
                    <Button variant="ghost" size="sm" className="w-full justify-start" disabled={question.id >= questions.length}>
                      下一题
                      <ChevronLeft className="w-4 h-4 ml-2 rotate-180" />
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="mt-4 p-4 bg-muted/50 rounded-lg border">
                <h4 className="font-semibold mb-3">相关标签</h4>
                <div className="flex flex-wrap gap-2">
                  {question.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="mt-4 p-4 bg-muted/50 rounded-lg border">
                <h4 className="font-semibold mb-3">核心要点</h4>
                <ul className="space-y-2 text-sm">
                  {question.keyPoints.map((point, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
