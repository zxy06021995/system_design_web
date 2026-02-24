import { Card, CardContent } from './ui/card';
import { Star, TrendingUp, BookOpen, Zap, Target } from 'lucide-react';

interface Stats {
  total: number;
  filtered: number;
  byDifficulty: {
    '超高频': number;
    '高频': number;
    '中频': number;
    '低频': number;
  };
}

interface StatsPanelProps {
  stats: Stats;
}

export function StatsPanel({ stats }: StatsPanelProps) {
  const difficultyStats = [
    {
      label: '超高频',
      count: stats.byDifficulty['超高频'],
      icon: Star,
      color: 'text-red-500',
      bgColor: 'bg-red-500/10',
      progressColor: 'bg-red-500'
    },
    {
      label: '高频',
      count: stats.byDifficulty['高频'],
      icon: TrendingUp,
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10',
      progressColor: 'bg-orange-500'
    },
    {
      label: '中频',
      count: stats.byDifficulty['中频'],
      icon: BookOpen,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
      progressColor: 'bg-blue-500'
    },
    {
      label: '低频',
      count: stats.byDifficulty['低频'],
      icon: Zap,
      color: 'text-gray-500',
      bgColor: 'bg-gray-500/10',
      progressColor: 'bg-gray-500'
    }
  ];

  return (
    <Card className="mb-8 border-border/50">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <Target className="w-5 h-5 text-primary" />
          <h3 className="font-semibold">题目统计</h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {difficultyStats.map((item) => {
            const percentage = (item.count / stats.total) * 100;
            const Icon = item.icon;
            
            return (
              <div key={item.label} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-lg ${item.bgColor} flex items-center justify-center`}>
                      <Icon className={`w-4 h-4 ${item.color}`} />
                    </div>
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>
                  <span className="text-lg font-bold">{item.count}</span>
                </div>
                <div className="relative h-2 bg-secondary rounded-full overflow-hidden">
                  <div 
                    className={`absolute left-0 top-0 h-full rounded-full ${item.progressColor} transition-all duration-500`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground text-right">
                  {percentage.toFixed(1)}%
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-6 pt-4 border-t flex items-center justify-between text-sm">
          <span className="text-muted-foreground">总题目数</span>
          <span className="font-bold text-lg">{stats.total} 道</span>
        </div>
      </CardContent>
    </Card>
  );
}
