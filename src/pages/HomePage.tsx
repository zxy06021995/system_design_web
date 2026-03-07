import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { questions, coreQuestions, type Difficulty, type Question, categories, domains } from '../data/questions';
import { QuestionCard } from '../components/QuestionCard';
import { StatsPanel } from '../components/StatsPanel';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Search, Filter, X, BookOpen, Star, TrendingUp, Zap, FolderOpen, ChevronDown, ChevronRight } from 'lucide-react';

type FilterType = 'all' | Difficulty;
type FineCategory = (typeof categories)[number];

type CategoryGroup = {
  name: FineCategory;
  questions: Question[];
};

type DomainGroup = {
  domain: string;
  questions: Question[];
  categories: CategoryGroup[];
};

export function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDomain, setSelectedDomain] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<'all' | FineCategory>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<FilterType>('all');
  const [coreOnly, setCoreOnly] = useState(false);
  const [expandedDomains, setExpandedDomains] = useState<Set<string>>(new Set(domains));

  const domainCategoryMap = useMemo(() => {
    const map = new Map<string, FineCategory[]>();

    domains.forEach((domain) => {
      map.set(domain, []);
    });

    questions.forEach((question) => {
      if (!question.domain) {
        return;
      }

      const domainCategories = map.get(question.domain) ?? [];
      const fineCategory = question.category as FineCategory;
      if (!domainCategories.includes(fineCategory)) {
        domainCategories.push(fineCategory);
      }
      map.set(question.domain, domainCategories);
    });

    domains.forEach((domain) => {
      const orderedCategories = (map.get(domain) ?? []).sort(
        (left, right) => categories.indexOf(left) - categories.indexOf(right)
      );
      map.set(domain, orderedCategories);
    });

    return map;
  }, []);

  const availableCategories = useMemo(() => {
    if (selectedDomain === 'all') {
      return [];
    }

    return domainCategoryMap.get(selectedDomain) ?? [];
  }, [domainCategoryMap, selectedDomain]);

  useEffect(() => {
    if (selectedCategory !== 'all' && !availableCategories.includes(selectedCategory)) {
      setSelectedCategory('all');
    }
  }, [availableCategories, selectedCategory]);

  const toggleDomain = (domain: string) => {
    setExpandedDomains((prev) => {
      const next = new Set(prev);
      if (next.has(domain)) {
        next.delete(domain);
      } else {
        next.add(domain);
      }
      return next;
    });
  };

  const handleDomainSelect = (domain: string) => {
    setSelectedDomain((prev) => {
      const nextDomain = prev === domain ? 'all' : domain;

      if (nextDomain === 'all') {
        setSelectedCategory('all');
      } else {
        setExpandedDomains((expanded) => {
          const nextExpanded = new Set(expanded);
          nextExpanded.add(nextDomain);
          return nextExpanded;
        });
      }

      return nextDomain;
    });
  };

  const expandAllDomains = () => {
    setExpandedDomains(new Set(domains));
  };

  const collapseAllDomains = () => {
    setExpandedDomains(new Set());
  };

  const filteredQuestions = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return questions.filter((question) => {
      const searchText = [
        question.title,
        question.titleEn,
        question.domain ?? '',
        question.category,
        question.tags.join(' ')
      ]
        .join(' ')
        .toLowerCase();

      const matchesSearch = normalizedQuery === '' || searchText.includes(normalizedQuery);
      const matchesDomain = selectedDomain === 'all' || question.domain === selectedDomain;
      const matchesCategory = selectedCategory === 'all' || question.category === selectedCategory;
      const matchesDifficulty = selectedDifficulty === 'all' || question.difficulty === selectedDifficulty;
      const matchesCore = !coreOnly || question.isCoreQuestion;

      return matchesSearch && matchesDomain && matchesCategory && matchesDifficulty && matchesCore;
    });
  }, [searchQuery, selectedDomain, selectedCategory, selectedDifficulty, coreOnly]);

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

  const groupedByDomain = useMemo<DomainGroup[]>(() => {
    return domains
      .map((domain) => {
        const domainQuestions = filteredQuestions
          .filter((question) => question.domain === domain)
          .sort((left, right) => left.id - right.id);

        const categoriesInDomain = domainCategoryMap.get(domain) ?? [];
        const groupedCategories = categoriesInDomain
          .map((category) => ({
            name: category,
            questions: domainQuestions.filter((question) => question.category === category)
          }))
          .filter((categoryGroup) => categoryGroup.questions.length > 0);

        return {
          domain,
          questions: domainQuestions,
          categories: groupedCategories
        };
      })
      .filter((group) => group.questions.length > 0);
  }, [domainCategoryMap, filteredQuestions]);

  const visibleDomainGroups = useMemo(() => {
    if (selectedDomain === 'all') {
      return groupedByDomain;
    }

    return groupedByDomain.filter((group) => group.domain === selectedDomain);
  }, [groupedByDomain, selectedDomain]);

  const stats = useMemo(() => {
    return {
      total: questions.length,
      filtered: filteredQuestions.length,
      byDifficulty: {
        '超高频': questions.filter((question) => question.difficulty === '超高频').length,
        '高频': questions.filter((question) => question.difficulty === '高频').length,
        '中频': questions.filter((question) => question.difficulty === '中频').length,
        '低频': questions.filter((question) => question.difficulty === '低频').length
      }
    };
  }, [filteredQuestions]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedDomain('all');
    setSelectedCategory('all');
    setSelectedDifficulty('all');
    setCoreOnly(false);
  };

  const hasActiveFilters =
    searchQuery !== '' ||
    selectedDomain !== 'all' ||
    selectedCategory !== 'all' ||
    selectedDifficulty !== 'all' ||
    coreOnly;

  const getDomainIcon = (domain: string) => {
    const iconMap: Record<string, string> = {
      '流量入口与访问控制': '🚦',
      '搜索、知识与智能发现': '🔍',
      '推荐、广告与聚合': '🎯',
      '社交、互动与协作': '💬',
      '存储、数据库与缓存': '🗄️',
      '分布式基础组件': '⚙️',
      '云平台与计算基础设施': '☁️',
      '数据平台与可观测': '📊',
      '媒体、内容与创作者平台': '🎬',
      '电商、市场与业务应用': '🛒',
      '金融、支付与交易': '💳',
      '安全、身份与治理': '🔒',
      '预订、资源与调度履约': '🎟️',
      '位置、出行与本地服务': '📍',
      '去中心化网络与链上系统': '⛓️'
    };

    return iconMap[domain] ?? '📁';
  };

  const getDifficultyCount = (domainQuestions: Question[], difficulty: Difficulty) => {
    return domainQuestions.filter((question) => question.difficulty === difficulty).length;
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          系统设计面试题库
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          精心整理的 {questions.length} 道系统设计面试题，先看大类，再钻到细分类，
          让学习路径和题目差异都更清楚
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
            onClick={() => setCoreOnly((prev) => !prev)}
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
            placeholder="搜索题目、标签、细分类或大类..."
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
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
          <Tabs value={selectedDifficulty} onValueChange={(value) => setSelectedDifficulty(value as FilterType)}>
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
              variant={coreOnly ? 'default' : 'outline'}
              size="sm"
              onClick={() => setCoreOnly((prev) => !prev)}
              className="text-xs"
            >
              仅看母题
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={expandAllDomains}
              className="text-xs"
            >
              展开全部大类
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={collapseAllDomains}
              className="text-xs"
            >
              收起全部大类
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

        <div className="space-y-3 rounded-lg border bg-muted/20 p-4">
          <div>
            <p className="text-sm font-medium mb-2">按大类筛选</p>
            <div className="flex flex-wrap gap-2">
              <Badge
                variant={selectedDomain === 'all' ? 'default' : 'outline'}
                className="cursor-pointer px-3 py-1.5 text-sm"
                onClick={() => {
                  setSelectedDomain('all');
                  setSelectedCategory('all');
                }}
              >
                全部大类
              </Badge>
              {domains.map((domain) => (
                <Badge
                  key={domain}
                  variant={selectedDomain === domain ? 'default' : 'outline'}
                  className="cursor-pointer px-3 py-1.5 text-sm"
                  onClick={() => handleDomainSelect(domain)}
                >
                  {getDomainIcon(domain)} {domain}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-medium mb-2">细分类筛选</p>
            {selectedDomain === 'all' ? (
              <p className="text-sm text-muted-foreground">
                先选择一个大类，再看该大类下的细分类，避免一次展开 40+ 分类。
              </p>
            ) : (
              <div className="flex flex-wrap gap-2">
                <Badge
                  variant={selectedCategory === 'all' ? 'default' : 'outline'}
                  className="cursor-pointer px-3 py-1.5 text-sm"
                  onClick={() => setSelectedCategory('all')}
                >
                  全部细分类
                </Badge>
                {availableCategories.map((category) => (
                  <Badge
                    key={category}
                    variant={selectedCategory === category ? 'default' : 'outline'}
                    className="cursor-pointer px-3 py-1.5 text-sm"
                    onClick={() => setSelectedCategory((prev) => (prev === category ? 'all' : category))}
                  >
                    {category}
                  </Badge>
                ))}
              </div>
            )}
          </div>
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
          {visibleDomainGroups.map((group) => {
            const isExpanded = expandedDomains.has(group.domain);
            const superHighCount = getDifficultyCount(group.questions, '超高频');
            const highCount = getDifficultyCount(group.questions, '高频');

            return (
              <section key={group.domain} className="border rounded-lg overflow-hidden">
                <div
                  className="flex items-center justify-between p-4 bg-muted/30 cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => toggleDomain(group.domain)}
                >
                  <div className="flex items-center gap-3 flex-wrap">
                    {isExpanded ? (
                      <ChevronDown className="w-5 h-5 text-muted-foreground" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    )}
                    <span className="text-xl">{getDomainIcon(group.domain)}</span>
                    <h2 className="text-lg font-bold">{group.domain}</h2>
                    <Badge variant="secondary">{group.questions.length} 道</Badge>
                    <Badge variant="outline">{group.categories.length} 个细分类</Badge>
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
                  <div className="p-4 bg-background space-y-5">
                    {group.categories.map((categoryGroup) => (
                      <div key={categoryGroup.name} className="rounded-lg border bg-muted/10">
                        <div className="flex items-center justify-between gap-3 border-b px-4 py-3">
                          <div className="min-w-0">
                            <h3 className="font-semibold">{categoryGroup.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              母题 #{categoryGroup.questions[0]?.learningCoreId ?? categoryGroup.questions[0]?.id}
                            </p>
                          </div>
                          <Badge variant="secondary">{categoryGroup.questions.length} 题</Badge>
                        </div>
                        <div className="p-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {categoryGroup.questions.map((question) => (
                              <Link key={question.id} to={`/question/${question.id}`} className="no-underline">
                                <QuestionCard question={question} />
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
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
