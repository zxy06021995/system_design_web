import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { questions, coreQuestions, type Difficulty, categories } from '../data/questions';
import { QuestionCard } from '../components/QuestionCard';
import { StatsPanel } from '../components/StatsPanel';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Search, Filter, X, BookOpen, Star, TrendingUp, Zap, FolderOpen, ChevronDown, ChevronRight } from 'lucide-react';

type FilterType = 'all' | Difficulty;

export function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<FilterType>('all');
  const [coreOnly, setCoreOnly] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(categories));

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(category)) {
        newSet.delete(category);
      } else {
        newSet.add(category);
      }
      return newSet;
    });
  };

  const expandAllCategories = () => {
    setExpandedCategories(new Set(categories));
  };

  const collapseAllCategories = () => {
    setExpandedCategories(new Set());
  };

  const filteredQuestions = useMemo(() => {
    return questions.filter(q => {
      const matchesSearch = searchQuery === '' || 
        q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
        q.category.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || q.category === selectedCategory;
      
      const matchesDifficulty = selectedDifficulty === 'all' || q.difficulty === selectedDifficulty;
      const matchesCore = !coreOnly || q.isCoreQuestion;
      
      return matchesSearch && matchesCategory && matchesDifficulty && matchesCore;
    });
  }, [searchQuery, selectedCategory, selectedDifficulty, coreOnly]);

  const coreCoverage = useMemo(() => {
    const coverage = new Map<number, number>();
    questions.forEach((question) => {
      const coreId = question.learningCoreId ?? question.id;
      coverage.set(coreId, (coverage.get(coreId) ?? 0) + 1);
    });

    return coreQuestions.map((coreQuestion) => ({
      coreQuestion,
      coveredCount: coverage.get(coreQuestion.id) ?? 0
    }));
  }, []);

  const groupedByCategory = useMemo(() => {
    const groups: Record<string, typeof questions> = {};
    
    categories.forEach(cat => {
      groups[cat] = [];
    });
    
    filteredQuestions.forEach(q => {
      if (groups[q.category]) {
        groups[q.category].push(q);
      }
    });
    
    return groups;
  }, [filteredQuestions]);

  const stats = useMemo(() => {
    return {
      total: questions.length,
      filtered: filteredQuestions.length,
      byDifficulty: {
        '超高频': questions.filter(q => q.difficulty === '超高频').length,
        '高频': questions.filter(q => q.difficulty === '高频').length,
        '中频': questions.filter(q => q.difficulty === '中频').length,
        '低频': questions.filter(q => q.difficulty === '低频').length,
      }
    };
  }, [filteredQuestions]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedDifficulty('all');
    setCoreOnly(false);
  };

  const hasActiveFilters = searchQuery !== '' || selectedCategory !== 'all' || selectedDifficulty !== 'all' || coreOnly;

  const getCategoryIcon = (category: string) => {
    const iconMap: Record<string, string> = {
      '短链与ID生成': '🔗',
      '网关、限流与负载均衡': '🚦',
      '社交关系与Feed系统': '📱',
      '实时消息与通知系统': '📡',
      '协同编辑与实时文档': '📝',
      '搜索引擎与信息检索': '🔍',
      '推荐排序与广告系统': '🎯',
      '缓存架构与性能优化': '⚡',
      '数据库与存储引擎': '🗄️',
      '文件与对象存储系统': '📁',
      '媒体处理与内容分发': '🎬',
      '消息队列与异步架构': '📬',
      '任务调度与工作流系统': '⏱️',
      '分布式协调与一致性': '🌐',
      '云原生平台与资源编排': '☁️',
      '数据管道与可观测性': '📊',
      '数仓建模与BI分析': '📈',
      '支付交易与资金风控': '💳',
      '电商交易与库存系统': '🛒',
      '预订与票务履约': '🎟️',
      '地理空间与路径调度': '📍',
      '安全身份与内容风控': '🔒',
      '去中心化与P2P网络': '⛓️',
      '通用业务平台与产品能力': '🧩'
    };
    return iconMap[category] || '📁';
  };

  const getDifficultyCount = (categoryQuestions: typeof questions, difficulty: Difficulty) => {
    return categoryQuestions.filter(q => q.difficulty === difficulty).length;
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          系统设计面试题库
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          精心整理的 {questions.length} 道系统设计面试题，按题目类型分类，
          助你系统准备技术面试
        </p>
      </div>

      <StatsPanel stats={stats} />

      <section className="mb-8 rounded-lg border bg-muted/20 p-4">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-lg font-semibold">最小母题学习集</h2>
            <p className="text-sm text-muted-foreground">
              先掌握 {coreQuestions.length} 道母题，可覆盖全部 {questions.length} 道题目
            </p>
          </div>
          <Button
            variant={coreOnly ? 'default' : 'outline'}
            size="sm"
            onClick={() => setCoreOnly(prev => !prev)}
          >
            {coreOnly ? '显示全部题目' : '仅看母题'}
          </Button>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {coreCoverage.map(({ coreQuestion, coveredCount }) => (
            <Link key={coreQuestion.id} to={`/question/${coreQuestion.id}`} className="no-underline">
              <Badge variant="secondary" className="cursor-pointer px-3 py-1.5 text-xs hover:bg-secondary/80">
                #{coreQuestion.id} {coreQuestion.titleEn} · 覆盖 {coveredCount} 题
              </Badge>
            </Link>
          ))}
        </div>
      </section>

      <div className="mb-8 space-y-4">
        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="搜索题目、标签或分类..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-10 h-12 text-base"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Tabs value={selectedDifficulty} onValueChange={(v) => setSelectedDifficulty(v as FilterType)}>
            <TabsList className="h-10">
              <TabsTrigger value="all" className="gap-1.5">
                <Filter className="w-4 h-4" />
                全部
              </TabsTrigger>
              <TabsTrigger value="超高频" className="gap-1.5">
                <Star className="w-4 h-4 text-red-500" />
                超高频
              </TabsTrigger>
              <TabsTrigger value="高频" className="gap-1.5">
                <TrendingUp className="w-4 h-4 text-orange-500" />
                高频
              </TabsTrigger>
              <TabsTrigger value="中频" className="gap-1.5">
                <BookOpen className="w-4 h-4 text-blue-500" />
                中频
              </TabsTrigger>
              <TabsTrigger value="低频" className="gap-1.5">
                <Zap className="w-4 h-4 text-gray-500" />
                低频
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex gap-2">
            <Button
              variant={coreOnly ? "default" : "outline"}
              size="sm"
              onClick={() => setCoreOnly(prev => !prev)}
              className="text-xs"
            >
              仅看母题
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={expandAllCategories}
              className="text-xs"
            >
              展开全部
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={collapseAllCategories}
              className="text-xs"
            >
              收起全部
            </Button>
          </div>

          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-muted-foreground"
            >
              <X className="w-4 h-4 mr-1" />
              清除过滤
            </Button>
          )}
        </div>

        <div className="flex flex-wrap gap-2 justify-center">
          <Badge
            variant={selectedCategory === 'all' ? 'default' : 'outline'}
            className="cursor-pointer px-3 py-1.5 text-sm"
            onClick={() => setSelectedCategory('all')}
          >
            全部分类
          </Badge>
          {categories.map(cat => (
            <Badge
              key={cat}
              variant={selectedCategory === cat ? 'default' : 'outline'}
              className="cursor-pointer px-3 py-1.5 text-sm"
              onClick={() => setSelectedCategory(cat === selectedCategory ? 'all' : cat)}
            >
              {getCategoryIcon(cat)} {cat}
            </Badge>
          ))}
        </div>
      </div>

      <div className="mb-6 text-sm text-muted-foreground">
        共找到 <span className="font-semibold text-foreground">{filteredQuestions.length}</span> 道题目
        {hasActiveFilters && ' (已过滤)'}
      </div>

      {filteredQuestions.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
            <Search className="w-10 h-10 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">没有找到匹配的题目</h3>
          <p className="text-muted-foreground mb-4">尝试调整搜索词或清除过滤器</p>
          <Button onClick={clearFilters}>清除过滤器</Button>
        </div>
      ) : (
        <div className="space-y-6">
          {categories.map(category => {
            const categoryQuestions = groupedByCategory[category];
            if (categoryQuestions.length === 0) return null;
            
            const isExpanded = expandedCategories.has(category);
            const superHighCount = getDifficultyCount(categoryQuestions, '超高频');
            const highCount = getDifficultyCount(categoryQuestions, '高频');
            
            return (
              <section key={category} className="border rounded-lg overflow-hidden">
                <div 
                  className="flex items-center justify-between p-4 bg-muted/30 cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => toggleCategory(category)}
                >
                  <div className="flex items-center gap-3">
                    {isExpanded ? (
                      <ChevronDown className="w-5 h-5 text-muted-foreground" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    )}
                    <span className="text-xl">{getCategoryIcon(category)}</span>
                    <h2 className="text-lg font-bold">{category}</h2>
                    <Badge variant="secondary" className="ml-2">
                      {categoryQuestions.length} 道
                    </Badge>
                    {superHighCount > 0 && (
                      <Badge variant="secondary" className="bg-red-500/10 text-red-500 text-xs">
                        超高频 {superHighCount}
                      </Badge>
                    )}
                    {highCount > 0 && (
                      <Badge variant="secondary" className="bg-orange-500/10 text-orange-500 text-xs">
                        高频 {highCount}
                      </Badge>
                    )}
                  </div>
                  <FolderOpen className="w-5 h-5 text-muted-foreground" />
                </div>
                
                {isExpanded && (
                  <div className="p-4 bg-background">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                      {categoryQuestions.map(q => (
                        <Link key={q.id} to={`/question/${q.id}`} className="no-underline">
                          <QuestionCard question={q} />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}
