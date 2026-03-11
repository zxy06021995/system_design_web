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

import { basicsPages, loadBasicsContent } from '../data/basics';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Separator } from '../components/ui/separator';
import { BookOpen, ChevronLeft, Loader2, Layers3, GraduationCap } from 'lucide-react';

export function BasicsPage() {
  const { slug } = useParams<{ slug: string }>();
  const [content, setContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const contentRef = useRef<HTMLDivElement>(null);

  const basicsPage = basicsPages.find((page) => page.slug === slug);

  useEffect(() => {
    if (!basicsPage) {
      setLoading(false);
      return;
    }

    setLoading(true);
    loadBasicsContent(basicsPage.slug)
      .then((data) => {
        setContent(data);
        setLoading(false);
      })
      .catch(() => {
        setContent(null);
        setLoading(false);
      });
  }, [basicsPage]);

  useEffect(() => {
    if (content && contentRef.current) {
      Prism.highlightAllUnder(contentRef.current);
    }
  }, [content]);

  if (!basicsPage) {
    return (
      <div className="container mx-auto px-4 py-20 max-w-7xl text-center">
        <h1 className="text-2xl font-bold mb-4">基础知识页未找到</h1>
        <p className="text-muted-foreground mb-6">该知识页不存在或尚未发布</p>
        <Link to="/">
          <Button>
            <ChevronLeft className="w-4 h-4 mr-2" />
            返回首页
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-background/95 backdrop-blur sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 max-w-7xl">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="sm">
                <ChevronLeft className="w-4 h-4 mr-2" />
                返回首页
              </Button>
            </Link>
            <Separator orientation="vertical" className="h-6" />
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>基础知识</span>
              <span>/</span>
              <span>{basicsPage.title}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-b bg-muted/30">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="outline" className="bg-blue-500/10 text-blue-600 border-blue-500/20">
                  <BookOpen className="w-3 h-3 mr-1" />
                  基础知识
                </Badge>
                <Badge variant="secondary">Java 开发复习</Badge>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{basicsPage.title}</h1>
              <p className="text-lg text-muted-foreground">{basicsPage.summary}</p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-4 bg-background rounded-lg border">
              <Layers3 className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">定位</p>
                <p className="font-semibold">基础知识复习页</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-background rounded-lg border">
              <GraduationCap className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">适用场景</p>
                <p className="font-semibold">系统设计 + Java 面试复习</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-background rounded-lg border">
              <BookOpen className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">说明</p>
                <p className="font-semibold">不属于题号体系</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
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
                hr: () => <Separator className="my-6" />
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
    </div>
  );
}
