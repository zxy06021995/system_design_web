import { Heart, Github, Twitter } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t bg-muted/30 mt-auto">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <p className="text-sm text-muted-foreground">
              系统设计面试题库 - 助你攻克技术面试
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              共收录 103 道经典系统设计题目
            </p>
          </div>

          <div className="flex items-center gap-4">
            <a 
              href="#" 
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a 
              href="#" 
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="border-t mt-6 pt-6 text-center">
          <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
            Made with <Heart className="w-3 h-3 text-red-500 fill-red-500" /> for system design interview preparation
          </p>
        </div>
      </div>
    </footer>
  );
}
