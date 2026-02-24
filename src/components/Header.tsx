import { Github, BookOpen, Code2 } from 'lucide-react';
import { Button } from './ui/button';

export function Header() {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-7xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center">
            <Code2 className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight">System Design</h1>
            <p className="text-xs text-muted-foreground">面试题库</p>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <a 
            href="#" 
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            首页
          </a>
          <a 
            href="#" 
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            题目列表
          </a>
          <a 
            href="#" 
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            学习路线
          </a>
          <a 
            href="#" 
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            关于
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="hidden sm:flex">
            <BookOpen className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Github className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
