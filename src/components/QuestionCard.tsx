import type { Question } from '../data/questions';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader } from './ui/card';
import { Star, TrendingUp, BookOpen, Zap } from 'lucide-react';

interface QuestionCardProps {
  question: Question;
}

const difficultyConfig = {
  '超高频': {
    color: 'bg-red-500/10 text-red-500 border-red-500/20',
    icon: <Star className="w-3 h-3" />,
    label: '超高频'
  },
  '高频': {
    color: 'bg-orange-500/10 text-orange-500 border-orange-500/20',
    icon: <TrendingUp className="w-3 h-3" />,
    label: '高频'
  },
  '中频': {
    color: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    icon: <BookOpen className="w-3 h-3" />,
    label: '中频'
  },
  '低频': {
    color: 'bg-gray-500/10 text-gray-500 border-gray-500/20',
    icon: <Zap className="w-3 h-3" />,
    label: '低频'
  }
};

export function QuestionCard({ question }: QuestionCardProps) {
  const config = difficultyConfig[question.difficulty];

  return (
    <Card 
      className="group cursor-pointer hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/30 hover:-translate-y-0.5 h-full"
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono text-muted-foreground">
                #{question.id.toString().padStart(3, '0')}
              </span>
              <Badge 
                variant="outline" 
                className={`text-xs ${config.color}`}
              >
                <span className="flex items-center gap-1">
                  {config.icon}
                  {config.label}
                </span>
              </Badge>
              {question.isCoreQuestion ? (
                <Badge variant="secondary" className="text-xs bg-primary/10 text-primary border-primary/20">
                  母题
                </Badge>
              ) : question.learningCoreId ? (
                <Badge variant="outline" className="text-xs">
                  母题 #{question.learningCoreId}
                </Badge>
              ) : null}
            </div>
            <h3 className="font-semibold text-base leading-tight group-hover:text-primary transition-colors">
              {question.title}
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              {question.titleEn}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {question.summary}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {question.tags.slice(0, 4).map((tag) => (
            <span 
              key={tag}
              className="text-xs px-2 py-0.5 bg-secondary/50 text-secondary-foreground rounded-full"
            >
              {tag}
            </span>
          ))}
          {question.tags.length > 4 && (
            <span className="text-xs px-2 py-0.5 bg-secondary/30 text-muted-foreground rounded-full">
              +{question.tags.length - 4}
            </span>
          )}
        </div>
        {!question.isCoreQuestion && question.learningExtraSkills && question.learningExtraSkills.length > 0 && (
          <p className="text-xs text-muted-foreground mt-3 line-clamp-2">
            差异补充：{question.learningExtraSkills.slice(0, 2).join(' · ')}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
