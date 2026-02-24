import { useState, useEffect, useMemo } from 'react';
import type { Question } from '../data/questions';
import { loadQuestionContent } from '../data/questions';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { highlightText, highlightStyles } from '../utils/highlightConfig';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from './ui/dialog';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';
import { 
  Star, 
  TrendingUp, 
  BookOpen, 
  Zap, 
  Loader2,
  Bookmark,
  Share2,
  FileText,
  Highlighter
} from 'lucide-react';

interface QuestionDetailProps {
  question: Question | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

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

export function QuestionDetail({ question, open, onOpenChange }: QuestionDetailProps) {
  const [content, setContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [highlightEnabled, setHighlightEnabled] = useState(true);

  const highlightedContent = useMemo(() => {
    if (!content || !highlightEnabled) return content;
    return highlightText(content);
  }, [content, highlightEnabled]);

  useEffect(() => {
    if (question && open) {
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
    } else {
      setContent(null);
    }
  }, [question, open]);

  if (!question) return null;

  const config = difficultyConfig[question.difficulty];
  const DifficultyIcon = config.icon;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] p-0 gap-0 overflow-hidden">
        <DialogHeader className="p-6 pb-4 border-b shrink-0">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm font-mono text-muted-foreground">
                  #{question.id.toString().padStart(3, '0')}
                </span>
                <Badge 
                  variant="outline" 
                  className={`${config.color}`}
                >
                  <span className="flex items-center gap-1">
                    <DifficultyIcon className="w-3 h-3" />
                    {config.label}
                  </span>
                </Badge>
                {question.domain && <Badge variant="outline">{question.domain}</Badge>}
                <Badge variant="secondary">{question.category}</Badge>
              </div>
              <DialogTitle className="text-2xl leading-tight">
                {question.title}
              </DialogTitle>
              <DialogDescription className="text-base mt-1">
                {question.titleEn}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-hidden" style={{ maxHeight: 'calc(90vh - 180px)' }}>
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
              <span className="ml-3 text-muted-foreground">加载中...</span>
            </div>
          ) : content ? (
            <ScrollArea className="h-full">
              <style>{highlightStyles}</style>
              <div className="p-6">
                <div className={`p-4 rounded-lg ${config.color} bg-opacity-10 mb-6`}>
                  <p className="text-sm">{config.description}</p>
                </div>

                <div className="prose prose-slate dark:prose-invert max-w-none">
                  <ReactMarkdown 
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                    skipHtml={false}
                    components={{
                      h1: ({ children }) => <h1 className="text-2xl font-bold mt-8 mb-4 pb-2 border-b">{children}</h1>,
                      h2: ({ children }) => <h2 className="text-xl font-semibold mt-6 mb-3 text-primary">{children}</h2>,
                      h3: ({ children }) => <h3 className="text-lg font-semibold mt-4 mb-2">{children}</h3>,
                      h4: ({ children }) => <h4 className="text-base font-semibold mt-3 mb-2">{children}</h4>,
                      p: ({ children }) => <p className="mb-4 leading-relaxed">{children}</p>,
                      ul: ({ children }) => <ul className="list-disc pl-6 mb-4 space-y-1">{children}</ul>,
                      ol: ({ children }) => <ol className="list-decimal pl-6 mb-4 space-y-1">{children}</ol>,
                      li: ({ children }) => <li className="mb-1">{children}</li>,
                      code: ({ children, className }) => {
                        const isInline = !className;
                        return isInline ? (
                          <code className="px-1.5 py-0.5 bg-muted rounded text-sm font-mono">{children}</code>
                        ) : (
                          <pre className="p-4 bg-muted rounded-lg overflow-x-auto mb-4">
                            <code className={`${className} text-sm font-mono`}>{children}</code>
                          </pre>
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
                    {highlightedContent || ''}
                  </ReactMarkdown>
                </div>
              </div>
            </ScrollArea>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
              <FileText className="w-12 h-12 mb-4 opacity-50" />
              <p>暂无详细内容</p>
            </div>
          )}
        </div>

        {/* 底部操作栏 */}
        <div className="p-4 border-t flex items-center justify-between shrink-0 bg-background">
          <div className="flex items-center gap-2">
            <Button 
              variant={highlightEnabled ? "default" : "outline"} 
              size="sm"
              onClick={() => setHighlightEnabled(!highlightEnabled)}
            >
              <Highlighter className="w-4 h-4 mr-2" />
              {highlightEnabled ? '高亮已开启' : '开启高亮'}
            </Button>
            <Button variant="outline" size="sm">
              <Bookmark className="w-4 h-4 mr-2" />
              收藏
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="w-4 h-4 mr-2" />
              分享
            </Button>
          </div>
          <div className="text-sm text-muted-foreground">
            {content ? '内容已加载' : '加载失败'}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
