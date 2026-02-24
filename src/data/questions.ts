export type Difficulty = '超高频' | '高频' | '中频' | '低频';

export interface Question {
  id: number;
  title: string;
  titleEn: string;
  difficulty: Difficulty;
  domain?: string;
  category: string;
  tags: string[];
  summary: string;
  keyPoints: string[];
  isCoreQuestion?: boolean;
  learningCoreId?: number;
  learningCoreTitle?: string;
  learningWhy?: string;
  learningExtraSkills?: string[];
}

export async function loadQuestionContent(id: number): Promise<string | null> {
  try {
    const response = await fetch(`/questions/${id}.md`);
    if (!response.ok) {
      console.error(`Failed to load question ${id}: ${response.status}`);
      return null;
    }
    return await response.text();
  } catch (error) {
    console.error('Failed to load question content:', error);
    return null;
  }
}

const rawQuestions: Question[] = [
  {
    id: 1,
    title: 'Pastebin / Bit.ly - 短链接系统',
    titleEn: 'Pastebin / Bit.ly',
    difficulty: '超高频',
    category: 'URL缩短/分享系统',
    tags: ['Base62编码', '布隆过滤器', '一致性哈希', '读写分离', '短链接生成'],
    summary: '设计一个URL短链服务，将长URL转换为短链接，支持高并发访问和海量数据存储。',
    keyPoints: ['Base62编码生成短链', '布隆过滤器去重', '一致性哈希分片', '读写分离架构', '缓存热点数据']
  },
  {
    id: 2,
    title: 'Twitter Timeline - 推特时间线与搜索',
    titleEn: 'Twitter Timeline & Search',
    difficulty: '超高频',
    category: '社交媒体/新闻feed系统',
    tags: ['Fan-out', 'Push/Pull', '大V问题', 'Timeline', '关注关系'],
    summary: '设计类似Twitter的信息流系统，支持用户发布内容、查看关注者动态和搜索推文。',
    keyPoints: ['Fan-out推拉模型', '大V特殊处理', '预计算Feed', '时间线排序', '全文搜索']
  },
  {
    id: 3,
    title: 'Web Crawler - 网络爬虫',
    titleEn: 'Web Crawler',
    difficulty: '超高频',
    category: '爬虫系统',
    tags: ['Bloom Filter', '礼貌抓取', '分布式队列', 'URL去重', '增量爬取'],
    summary: '设计一个分布式网络爬虫，高效抓取网页内容并存储，支持URL去重和礼貌抓取。',
    keyPoints: ['布隆过滤器URL去重', '优先级队列调度', 'robots.txt遵守', '增量更新策略', '分布式架构']
  },
  {
    id: 4,
    title: 'Mint.com - 个人财务管理',
    titleEn: 'Mint.com',
    difficulty: '超高频',
    category: '金融/支付系统',
    tags: ['账户聚合', '交易分类', '预算管理', '数据同步', '银行API'],
    summary: '设计个人财务管理平台，聚合多银行账户、自动分类交易、预算追踪。',
    keyPoints: ['银行API集成', 'ML交易分类', '预算追踪', '数据安全', '实时同步']
  },
  {
    id: 5,
    title: 'Social Network - 社交网络数据结构',
    titleEn: 'Social Network Data Structures',
    difficulty: '超高频',
    category: '社交媒体/新闻feed系统',
    tags: ['图数据库', '好友关系', '共同好友', '六度分隔', '社交图谱'],
    summary: '设计社交网络数据结构，支持好友关系存储、共同好友计算、社交推荐。',
    keyPoints: ['图数据库存储', '好友关系建模', '共同好友算法', '六度分隔理论', '社交推荐']
  },
  {
    id: 6,
    title: 'Query Cache - 搜索引擎查询缓存',
    titleEn: 'Query Cache for Search Engine',
    difficulty: '超高频',
    category: '缓存系统',
    tags: ['LRU缓存', '查询缓存', '缓存更新', '缓存穿透', '热点查询'],
    summary: '设计搜索引擎查询缓存系统，加速热门查询响应，减少后端压力。',
    keyPoints: ['LRU缓存策略', '查询结果缓存', '缓存更新机制', '缓存穿透防护', '热点查询识别']
  },
  {
    id: 7,
    title: 'Amazon Sales Ranking - 亚马逊销售排名',
    titleEn: 'Amazon Sales Ranking',
    difficulty: '高频',
    category: '电商系统',
    tags: ['排行榜', '实时统计', 'TopK', '销售数据', '分类排名'],
    summary: '设计亚马逊销售排名系统，实时统计商品销量并生成排行榜。',
    keyPoints: ['Redis Sorted Set', '实时销量统计', '分类排行榜', '定时任务更新', '缓存策略']
  },
  {
    id: 8,
    title: 'AWS Scaling - 百万用户扩展系统',
    titleEn: 'Scaling to Millions on AWS',
    difficulty: '高频',
    category: '分布式系统',
    tags: ['水平扩展', '负载均衡', '数据库分片', '缓存层', 'CDN'],
    summary: '设计支持百万用户的系统架构，涵盖负载均衡、缓存、数据库分片等核心组件。',
    keyPoints: ['负载均衡策略', '数据库读写分离', 'Redis缓存层', 'CDN加速', '自动扩缩容']
  },
  {
    id: 10,
    title: '秒杀系统',
    titleEn: 'Flash Sale System',
    difficulty: '超高频',
    category: '电商系统',
    tags: ['高并发', '库存扣减', '限流', '防超卖', '消息队列'],
    summary: '设计秒杀系统，支持高并发抢购、库存准确扣减、防止超卖。',
    keyPoints: ['Redis预扣库存', '消息队列削峰', '限流防刷', '分布式锁', '异步下单']
  },
  {
    id: 11,
    title: '订票系统',
    titleEn: 'Ticket Booking System',
    difficulty: '高频',
    category: '预订/票务系统',
    tags: ['座位锁定', '分布式锁', '防超卖', '选座', '订单超时'],
    summary: '设计票务系统，支持选座购票、座位锁定、防止超卖。',
    keyPoints: ['座位状态管理', '分布式锁选座', '订单超时释放', '支付流程', '库存同步']
  },
  {
    id: 12,
    title: '用户系统设计',
    titleEn: 'User System Design',
    difficulty: '高频',
    category: '用户系统',
    tags: ['用户注册', '登录认证', '权限管理', 'SSO', '用户画像'],
    summary: '设计用户系统，支持注册登录、权限管理、单点登录等功能。',
    keyPoints: ['JWT认证', 'OAuth2.0', 'RBAC权限', 'SSO单点登录', '用户数据安全']
  },
  {
    id: 15,
    title: '数据库拆分与一致性哈希',
    titleEn: 'Database Sharding & Consistent Hashing',
    difficulty: '超高频',
    category: '数据库相关',
    tags: ['分库分表', '一致性哈希', '数据迁移', '路由策略', '跨分片查询'],
    summary: '设计数据库分片方案，使用一致性哈希实现数据均匀分布和最小迁移。',
    keyPoints: ['哈希分片策略', '虚拟节点', '数据迁移方案', '路由表设计', '分布式事务']
  },
  {
    id: 16,
    title: 'RateLimiter + Grafana - 限流监控',
    titleEn: 'Rate Limiter & Grafana',
    difficulty: '超高频',
    category: '限流系统',
    tags: ['令牌桶', '滑动窗口', '监控告警', '限流策略', '可视化'],
    summary: '设计限流器与监控系统，支持多种限流算法和实时监控告警。',
    keyPoints: ['令牌桶算法', '滑动窗口计数', 'Redis限流', 'Grafana监控', '告警规则']
  },
  {
    id: 17,
    title: 'GFS分布式文件系统',
    titleEn: 'Google File System (GFS)',
    difficulty: '高频',
    category: '分布式文件系统',
    tags: ['分布式存储', 'Master-Slave', 'ChunkServer', '数据冗余', '一致性'],
    summary: '设计Google文件系统，支持大规模分布式文件存储。',
    keyPoints: ['Master节点设计', 'Chunk分块存储', '副本冗余', '一致性模型', '故障恢复']
  },
  {
    id: 18,
    title: '文档协同编辑系统',
    titleEn: 'Collaborative Document Editing',
    difficulty: '高频',
    category: '协同编辑系统',
    tags: ['OT算法', 'CRDT', 'WebSocket', '冲突解决', '实时同步'],
    summary: '设计在线文档协同编辑系统，支持多人实时编辑同一文档。',
    keyPoints: ['OT操作转换', 'CRDT数据结构', 'WebSocket通信', '冲突解决策略', '版本控制']
  },
  {
    id: 19,
    title: '跳表 (Skip List)',
    titleEn: 'Skip List',
    difficulty: '中频',
    category: '数据结构/算法',
    tags: ['跳表', '概率数据结构', '有序集合', 'O(log n)', 'Redis'],
    summary: '设计跳表数据结构，支持高效的插入、删除和范围查询操作。',
    keyPoints: ['多层索引', '概率晋升', '时间复杂度分析', 'Redis ZSet实现', '并发跳表']
  },
  {
    id: 20,
    title: 'Bigtable - 大规模结构化数据存储',
    titleEn: 'Bigtable',
    difficulty: '高频',
    category: '数据结构/算法',
    tags: ['LSM-Tree', '列族存储', 'SSTable', 'MemTable', '分布式表'],
    summary: '设计Bigtable分布式结构化数据存储系统。',
    keyPoints: ['LSM-Tree存储', '列族设计', 'SSTable文件', 'MemTable内存表', 'Compaction合并']
  },
  {
    id: 21,
    title: '聊天系统 (Chat System)',
    titleEn: 'Chat System',
    difficulty: '超高频',
    category: '聊天/消息系统',
    tags: ['WebSocket', '消息推送', '消息同步', '群聊', '消息存储'],
    summary: '设计即时通讯系统，支持单聊、群聊、消息同步和离线消息。',
    keyPoints: ['WebSocket长连接', '消息ID生成', '消息确认机制', '多端同步', '离线消息存储']
  },
  {
    id: 22,
    title: '视频流系统 (YouTube)',
    titleEn: 'Video Streaming (YouTube)',
    difficulty: '高频',
    category: '视频系统',
    tags: ['HLS/DASH', '视频转码', 'CDN分发', '自适应码率', '视频存储'],
    summary: '设计视频流媒体服务，支持视频上传、转码、存储和播放。',
    keyPoints: ['视频分片存储', '多码率转码', 'HLS/DASH协议', 'CDN加速', '播放器优化']
  },
  {
    id: 23,
    title: 'Uber地理位置服务',
    titleEn: 'Uber Geolocation Service',
    difficulty: '超高频',
    category: '地理位置服务',
    tags: ['Geohash', '邻近搜索', '实时定位', '调度算法', 'ETA计算'],
    summary: '设计打车系统地理位置服务，支持司机乘客定位、邻近搜索和调度。',
    keyPoints: ['Geohash编码', '邻近司机搜索', '实时位置更新', '调度匹配算法', 'ETA预估']
  },
  {
    id: 24,
    title: 'MapReduce - 分布式计算框架',
    titleEn: 'MapReduce',
    difficulty: '高频',
    category: '数据结构/算法',
    tags: ['Map', 'Reduce', 'Shuffle', '分布式计算', 'Hadoop'],
    summary: '设计MapReduce分布式计算框架，支持大规模数据处理。',
    keyPoints: ['Map阶段设计', 'Reduce阶段设计', 'Shuffle排序', '任务调度', '容错机制']
  },
  {
    id: 25,
    title: '推特搜索系统',
    titleEn: 'Twitter Search',
    difficulty: '高频',
    category: '搜索系统',
    tags: ['倒排索引', '实时搜索', '全文检索', '搜索排序', '索引更新'],
    summary: '设计Twitter搜索系统，支持实时推文搜索和高级搜索功能。',
    keyPoints: ['倒排索引构建', '实时索引更新', '搜索相关性排序', '高级搜索语法', '搜索缓存']
  },
  {
    id: 26,
    title: 'PageRank - 网页排名算法',
    titleEn: 'PageRank',
    difficulty: '高频',
    category: '数据结构/算法',
    tags: ['图算法', '迭代计算', '链接分析', '分布式', '网页重要性'],
    summary: '设计PageRank网页排名算法，计算网页重要性得分。',
    keyPoints: ['图遍历算法', '迭代收敛', '阻尼因子', '分布式计算', '增量更新']
  },
  {
    id: 27,
    title: '搜索引擎技术 (Crawler + Typeahead)',
    titleEn: 'Search Engine (Crawler + Typeahead)',
    difficulty: '超高频',
    category: '爬虫系统',
    tags: ['爬虫', '倒排索引', '自动补全', 'Trie树', '搜索建议'],
    summary: '设计搜索引擎核心组件，包括爬虫、索引和自动补全。',
    keyPoints: ['分布式爬虫', '倒排索引', 'Trie树自动补全', '搜索排序', '索引更新']
  },
  {
    id: 28,
    title: '数据库索引',
    titleEn: 'Database Index',
    difficulty: '高频',
    category: '数据库相关',
    tags: ['B+树', '哈希索引', '倒排索引', '索引优化', '查询计划'],
    summary: '设计数据库索引系统，支持多种索引类型和查询优化。',
    keyPoints: ['B+树结构', '哈希索引', '复合索引', '索引选择', '查询优化']
  },
  {
    id: 29,
    title: '数据库事务',
    titleEn: 'Database Transaction',
    difficulty: '高频',
    category: '数据库相关',
    tags: ['ACID', '隔离级别', 'MVCC', '锁机制', '分布式事务'],
    summary: '设计数据库事务系统，保证数据一致性和并发控制。',
    keyPoints: ['ACID特性', '隔离级别', 'MVCC实现', '锁机制', '分布式事务']
  },
  {
    id: 30,
    title: '评论区设计',
    titleEn: 'Comment System Design',
    difficulty: '中频',
    category: '评论系统',
    tags: ['评论树', '分页加载', '点赞', '回复通知', '评论排序'],
    summary: '设计评论区系统，支持评论发布、回复、点赞和排序。',
    keyPoints: ['评论树结构', '懒加载分页', '点赞计数', '回复通知', '热评排序']
  },
  {
    id: 31,
    title: 'Design Dropbox - 文件同步系统',
    titleEn: 'Dropbox - File Sync System',
    difficulty: '高频',
    category: '分布式文件系统',
    tags: ['文件分块', '增量同步', '去重', '版本控制', '冲突解决'],
    summary: '设计云存储文件同步系统，支持跨设备文件同步和版本管理。',
    keyPoints: ['文件分块上传', '增量同步', '数据去重', '版本历史', '冲突处理']
  },
  {
    id: 32,
    title: 'Design Google Search Engine',
    titleEn: 'Google Search Engine',
    difficulty: '超高频',
    category: '爬虫系统',
    tags: ['爬虫', '倒排索引', 'PageRank', '搜索排序', '分布式存储'],
    summary: '设计Google搜索引擎，支持网页抓取、索引和搜索排序。',
    keyPoints: ['分布式爬虫', '倒排索引', 'PageRank算法', '搜索排序', '索引分片']
  },
  {
    id: 34,
    title: 'Design Redis',
    titleEn: 'Redis - In-Memory Database',
    difficulty: '超高频',
    category: '缓存系统',
    tags: ['内存数据库', '数据结构', '持久化', '主从复制', '集群'],
    summary: '设计Redis内存数据库，支持多种数据结构和持久化。',
    keyPoints: ['数据结构实现', 'RDB/AOF持久化', '主从复制', 'Sentinel高可用', 'Cluster集群']
  },
  {
    id: 35,
    title: 'Design Memcached',
    titleEn: 'Memcached',
    difficulty: '高频',
    category: '缓存系统',
    tags: ['内存缓存', 'LRU', '分布式缓存', '一致性哈希', '多线程'],
    summary: '设计Memcached分布式内存缓存系统。',
    keyPoints: ['Slab分配器', 'LRU淘汰', '一致性哈希', '多线程模型', '内存管理']
  },
  {
    id: 36,
    title: 'Design Amazon Recommendation System',
    titleEn: 'Amazon Recommendation',
    difficulty: '高频',
    category: '推荐系统',
    tags: ['协同过滤', '矩阵分解', '商品推荐', '个性化', '实时推荐'],
    summary: '设计亚马逊商品推荐系统，支持个性化商品推荐。',
    keyPoints: ['协同过滤算法', '矩阵分解', '特征工程', '实时推荐', 'A/B测试']
  },
  {
    id: 45,
    title: 'Design Random ID Generation',
    titleEn: 'Random ID Generation',
    difficulty: '高频',
    category: 'URL缩短/分享系统',
    tags: ['Snowflake', 'UUID', '分布式ID', '趋势递增', '唯一性'],
    summary: '设计分布式唯一ID生成器，支持高并发和趋势递增。',
    keyPoints: ['Snowflake算法', 'Leaf号段模式', '时钟回拨处理', '分布式协调', '性能优化']
  },
  {
    id: 47,
    title: 'Design Multi-Data Center System',
    titleEn: 'Multi-Data Center',
    difficulty: '高频',
    category: '分布式系统',
    tags: ['数据复制', '就近访问', '故障转移', '一致性', '多活'],
    summary: '设计多数据中心系统，支持数据同步和容灾。',
    keyPoints: ['数据复制策略', '就近路由', '故障转移', '一致性保证', '多活架构']
  },
  {
    id: 50,
    title: 'Design API Rate Limiter',
    titleEn: 'API Rate Limiter',
    difficulty: '超高频',
    category: '限流系统',
    tags: ['令牌桶', '漏桶', '滑动窗口', '分布式限流', 'API保护'],
    summary: '设计API限流器，保护后端服务免受流量冲击。',
    keyPoints: ['令牌桶算法', '滑动窗口', '分布式限流', '限流策略', '降级处理']
  },
  {
    id: 51,
    title: 'Design Stock Exchange',
    titleEn: 'Stock Exchange',
    difficulty: '高频',
    category: '金融/支付系统',
    tags: ['撮合引擎', '订单簿', '低延迟', '高可用', '交易系统'],
    summary: '设计股票交易所系统，支持订单撮合和交易执行。',
    keyPoints: ['撮合算法', '订单簿设计', '低延迟架构', '高可用设计', '交易一致性']
  },
  {
    id: 53,
    title: 'Design Conference Room Booking System',
    titleEn: 'Conference Room Booking',
    difficulty: '中频',
    category: '其他系统',
    tags: ['日历集成', '冲突检测', '资源管理', '提醒通知', '会议室'],
    summary: '设计会议室预订系统，支持日历集成和冲突检测。',
    keyPoints: ['时间冲突检测', '日历同步', '资源管理', '提醒通知', '审批流程']
  },
  {
    id: 54,
    title: 'Design Real-Time Notification System',
    titleEn: 'Real-Time Notification',
    difficulty: '高频',
    category: '实时系统',
    tags: ['推送通知', 'WebSocket', '消息队列', '多通道', '实时性'],
    summary: '设计实时通知系统，支持多渠道消息推送。',
    keyPoints: ['WebSocket推送', '消息队列', '多通道通知', '推送策略', '消息存储']
  },
  {
    id: 55,
    title: 'Design Image Hosting Service',
    titleEn: 'Image Hosting Service',
    difficulty: '中频',
    category: '存储系统',
    tags: ['对象存储', '图片处理', 'CDN', '去重', '缩略图'],
    summary: '设计图片托管服务，支持图片上传、处理和分发。',
    keyPoints: ['对象存储', '图片压缩', '缩略图生成', 'CDN加速', '图片去重']
  },
  {
    id: 56,
    title: 'Design Web Analytics Tool (Google Analytics)',
    titleEn: 'Google Analytics',
    difficulty: '高频',
    category: '监控/分析系统',
    tags: ['数据采集', '实时分析', '报表', '用户行为', '漏斗分析'],
    summary: '设计网站分析工具，支持用户行为追踪和数据分析。',
    keyPoints: ['数据采集SDK', '实时数据处理', '数据仓库', '报表生成', '漏斗分析']
  },
  {
    id: 58,
    title: 'Design Distributed Job Scheduler',
    titleEn: 'Distributed Job Scheduler',
    difficulty: '中频',
    category: '分布式系统',
    tags: ['定时任务', '分布式调度', '任务分片', '故障转移', '任务依赖'],
    summary: '设计分布式任务调度系统，支持定时任务和任务编排。',
    keyPoints: ['任务调度算法', '分片执行', '故障转移', '任务依赖', '监控告警']
  },
  {
    id: 59,
    title: 'Design Voting System',
    titleEn: 'Voting System',
    difficulty: '中频',
    category: '其他系统',
    tags: ['投票', '防刷', '匿名', '实时统计', '多选'],
    summary: '设计投票系统，支持匿名投票和实时统计。',
    keyPoints: ['防刷机制', '匿名保护', '实时统计', '多选支持', '结果验证']
  },
  {
    id: 60,
    title: 'Design Task Management Application',
    titleEn: 'Task Management',
    difficulty: '中频',
    category: '其他系统',
    tags: ['看板', '任务管理', '协作', '提醒', '进度追踪'],
    summary: '设计任务管理应用，支持看板视图和团队协作。',
    keyPoints: ['看板设计', '任务状态机', '协作通知', '进度追踪', '权限管理']
  },
  {
    id: 61,
    title: 'Design Cloud Infrastructure',
    titleEn: 'Cloud Infrastructure',
    difficulty: '低频',
    category: '其他系统',
    tags: ['虚拟化', 'SDN', '存储', '计算', '网络'],
    summary: '设计云基础设施，支持虚拟化和弹性计算。',
    keyPoints: ['KVM虚拟化', 'SDN网络', '分布式存储', '资源调度', '计费系统']
  },
  {
    id: 62,
    title: 'Design Container Orchestration System',
    titleEn: 'Container Orchestration',
    difficulty: '中频',
    category: '其他系统',
    tags: ['K8s', '容器', '编排', '调度', '服务发现'],
    summary: '设计容器编排系统，支持容器调度和服务管理。',
    keyPoints: ['Pod调度', 'Service发现', 'Deployment管理', '自动扩缩容', '健康检查']
  },
  {
    id: 63,
    title: 'Design Cloud Storage Gateway',
    titleEn: 'Cloud Storage Gateway',
    difficulty: '低频',
    category: '存储系统',
    tags: ['存储网关', '缓存', '同步', '协议转换', '分层存储'],
    summary: '设计云存储网关，连接本地存储和云端存储。',
    keyPoints: ['本地缓存', '云端同步', '协议转换', '分层存储', '数据加密']
  },
  {
    id: 64,
    title: 'Design Cloud-Based Backup Solution',
    titleEn: 'Cloud Backup Solution',
    difficulty: '低频',
    category: '存储系统',
    tags: ['备份', '增量备份', '去重', '加密', '恢复'],
    summary: '设计云端备份方案，支持增量备份和数据恢复。',
    keyPoints: ['增量备份', '数据去重', '加密传输', '快速恢复', '版本管理']
  },
  {
    id: 66,
    title: 'Design Serverless Architecture System',
    titleEn: 'Serverless Architecture',
    difficulty: '中频',
    category: '其他系统',
    tags: ['FaaS', '冷启动', '自动扩缩', '事件触发', '无服务器'],
    summary: '设计Serverless无服务器架构平台。',
    keyPoints: ['FaaS函数计算', '冷启动优化', '自动扩缩容', '事件触发器', '资源隔离']
  },
  {
    id: 67,
    title: 'Design Cloud Service Brokerage System',
    titleEn: 'Cloud Service Brokerage',
    difficulty: '低频',
    category: '其他系统',
    tags: ['多云管理', '服务代理', '成本优化', '统一接口', '服务编排'],
    summary: '设计云服务代理系统，统一管理多云资源。',
    keyPoints: ['多云适配', '成本分析', '服务编排', '统一监控', '权限管理']
  },
  {
    id: 68,
    title: 'Design Video View Count System',
    titleEn: 'Video View Count',
    difficulty: '中频',
    category: '视频系统',
    tags: ['计数', '实时统计', '去重', '分布式计数', '视频统计'],
    summary: '设计视频播放量统计系统，支持高并发计数和去重。',
    keyPoints: ['分布式计数', 'Redis计数', '去重策略', '定时聚合', '数据一致性']
  },
  {
    id: 69,
    title: 'Design Distributed Counter',
    titleEn: 'Distributed Counter',
    difficulty: '高频',
    category: '分布式系统',
    tags: ['CRDT', 'G-Counter', '分布式计数', '最终一致', '合并'],
    summary: '设计分布式计数器，支持高并发计数和最终一致性。',
    keyPoints: ['CRDT数据结构', 'G-Counter', 'PN-Counter', 'Redis原子操作', '合并策略']
  },
  {
    id: 71,
    title: 'Design Task Scheduler',
    titleEn: 'Task Scheduler',
    difficulty: '中频',
    category: '分布式系统',
    tags: ['定时任务', '延迟队列', '任务调度', '分布式', '重试'],
    summary: '设计任务调度系统，支持定时任务和延迟执行。',
    keyPoints: ['时间轮算法', '延迟队列', '分布式协调', '任务重试', '监控告警']
  },
  {
    id: 75,
    title: 'Design Smart Home System',
    titleEn: 'Smart Home System',
    difficulty: '低频',
    category: '智能家居',
    tags: ['IoT', '设备管理', '场景联动', '语音控制', '自动化'],
    summary: '设计智能家居系统，支持设备管理和场景联动。',
    keyPoints: ['MQTT协议', '设备发现', '场景自动化', '语音集成', '远程控制']
  },
  {
    id: 76,
    title: 'Design Blockchain-Based System',
    titleEn: 'Blockchain System',
    difficulty: '低频',
    category: '区块链系统',
    tags: ['区块链', '共识算法', '智能合约', '加密', '分布式账本'],
    summary: '设计区块链系统，支持共识算法和智能合约。',
    keyPoints: ['PoW/PoS共识', '默克尔树', '智能合约', '钱包安全', '交易验证']
  },
  {
    id: 77,
    title: 'Design High-Performance Computing Cluster',
    titleEn: 'HPC Cluster',
    difficulty: '低频',
    category: '其他系统',
    tags: ['MPI', '并行计算', '作业调度', '高性能', '集群'],
    summary: '设计高性能计算集群，支持并行计算和作业调度。',
    keyPoints: ['MPI通信', '作业调度', '并行计算', '共享存储', '资源管理']
  },
  {
    id: 78,
    title: 'Design Movie Reviews Aggregator',
    titleEn: 'Movie Reviews Aggregator',
    difficulty: '中频',
    category: '其他系统',
    tags: ['评论聚合', '评分', '情感分析', '数据抓取', '推荐'],
    summary: '设计电影评论聚合平台，从多个来源收集评论和评分。',
    keyPoints: ['数据抓取', '评论聚合', '情感分析', '评分加权', '反作弊']
  },
  {
    id: 79,
    title: 'Design Online Collaborative Spreadsheet',
    titleEn: 'Collaborative Spreadsheet',
    difficulty: '高频',
    category: '协同编辑系统',
    tags: ['协同编辑', 'OT/CRDT', '电子表格', '公式计算', '实时同步'],
    summary: '设计在线协同电子表格系统，支持多人实时编辑。',
    keyPoints: ['OT/CRDT算法', '单元格锁定', '公式计算', '版本控制', '实时同步']
  },
  {
    id: 80,
    title: 'Design Ad Click Aggregation System',
    titleEn: 'Ad Click Aggregation',
    difficulty: '中频',
    category: '其他系统',
    tags: ['点击统计', '实时聚合', '数据分析', '广告系统', '流处理'],
    summary: '设计广告点击聚合系统，支持实时统计和数据分析。',
    keyPoints: ['流式处理', '实时聚合', '数据存储', '报表生成', '数据一致性']
  },
  {
    id: 81,
    title: 'Design Log Collection and Analysis System',
    titleEn: 'Log Collection & Analysis',
    difficulty: '高频',
    category: '监控/分析系统',
    tags: ['ELK', '日志采集', '日志分析', '实时处理', '告警'],
    summary: '设计日志收集和分析系统，支持日志采集、存储和查询。',
    keyPoints: ['Filebeat采集', 'Kafka缓冲', 'ES存储', 'Kibana可视化', '告警规则']
  },
  {
    id: 82,
    title: 'Design Large-Scale Graph Processing System',
    titleEn: 'Graph Processing System',
    difficulty: '低频',
    category: '其他系统',
    tags: ['图计算', '分布式', 'PageRank', '图遍历', '社交网络'],
    summary: '设计大规模图处理系统，支持图算法和社交网络分析。',
    keyPoints: ['图分区', '分布式计算', '图算法', '迭代计算', '内存管理']
  },
  {
    id: 83,
    title: 'Design E-commerce Website (Amazon)',
    titleEn: 'E-commerce Website (Amazon)',
    difficulty: '高频',
    category: '电商系统',
    tags: ['商品管理', '购物车', '订单系统', '支付', '库存'],
    summary: '设计电商网站，支持商品展示、购物车、订单和支付。',
    keyPoints: ['商品目录', '购物车设计', '订单状态机', '支付集成', '库存管理']
  },
  {
    id: 84,
    title: 'Design Online Payment System (PayPal)',
    titleEn: 'Online Payment (PayPal)',
    difficulty: '高频',
    category: '金融/支付系统',
    tags: ['支付系统', '幂等性', '对账', '风控', '资金安全'],
    summary: '设计在线支付系统，支持多渠道支付和对账。',
    keyPoints: ['支付流程', '幂等性设计', '对账机制', '风控系统', '资金安全']
  },
  {
    id: 85,
    title: 'Design Inventory Management System',
    titleEn: 'Inventory Management',
    difficulty: '高频',
    category: '电商系统',
    tags: ['库存管理', '库存扣减', '预占', '防超卖', '库存同步'],
    summary: '设计库存管理系统，支持库存扣减和防止超卖。',
    keyPoints: ['库存预占', '分布式锁', '库存同步', '防超卖', '库存预警']
  },
  {
    id: 86,
    title: 'Design Music Streaming Service (Spotify)',
    titleEn: 'Music Streaming (Spotify)',
    difficulty: '高频',
    category: '视频系统',
    tags: ['音频流', '推荐系统', '播放列表', 'DRM', 'CDN'],
    summary: '设计音乐流媒体服务，支持在线播放和个性化推荐。',
    keyPoints: ['音频流传输', 'DRM保护', '推荐算法', '播放列表', '离线下载']
  },
  {
    id: 87,
    title: 'Design Ebook Distribution Platform',
    titleEn: 'Ebook Distribution Platform',
    difficulty: '中频',
    category: '其他系统',
    tags: ['电子书', 'DRM', '格式转换', '阅读进度', '推荐'],
    summary: '设计电子书分发平台，支持多格式和版权保护。',
    keyPoints: ['DRM保护', '格式转换', '阅读进度同步', '内容推荐', '版权管理']
  },
  {
    id: 88,
    title: 'Design Video Conferencing System',
    titleEn: 'Video Conferencing',
    difficulty: '高频',
    category: '视频系统',
    tags: ['WebRTC', 'SFU', '屏幕共享', '录制', '低延迟'],
    summary: '设计视频会议系统，支持多人视频和屏幕共享。',
    keyPoints: ['WebRTC协议', 'SFU架构', 'NAT穿透', '屏幕共享', '会议录制']
  },
  {
    id: 89,
    title: 'Design Cloud Gaming Service',
    titleEn: 'Cloud Gaming Service',
    difficulty: '低频',
    category: '视频系统',
    tags: ['云游戏', '视频流', '低延迟', '边缘计算', '游戏渲染'],
    summary: '设计云游戏服务，支持游戏云端运行和视频流传输。',
    keyPoints: ['视频编码', '低延迟传输', '边缘部署', '输入同步', '资源调度']
  },
  {
    id: 90,
    title: 'Design Peer-to-Peer Network',
    titleEn: 'Peer-to-Peer Network',
    difficulty: '低频',
    category: '其他系统',
    tags: ['P2P', 'DHT', 'BitTorrent', 'NAT穿透', '节点发现'],
    summary: '设计P2P网络系统，支持文件共享和分布式存储。',
    keyPoints: ['DHT路由', 'BitTorrent协议', 'NAT穿透', '节点发现', '数据分片']
  },
  {
    id: 91,
    title: 'Design Real-Time Sports Scoring System',
    titleEn: 'Real-Time Sports Scoring',
    difficulty: '中频',
    category: '实时系统',
    tags: ['实时推送', '比分更新', 'WebSocket', '赛事数据', '统计'],
    summary: '设计实时体育比分系统，支持比赛数据实时更新和推送。',
    keyPoints: ['实时数据采集', 'WebSocket推送', '比分计算', '统计展示', '历史数据']
  },
  {
    id: 92,
    title: 'Design GPS Navigation System',
    titleEn: 'GPS Navigation System',
    difficulty: '中频',
    category: '地理位置服务',
    tags: ['GPS', '路径规划', '地图', '导航', '实时路况'],
    summary: '设计GPS导航系统，支持路径规划和实时导航。',
    keyPoints: ['地图数据', '路径规划算法', '实时路况', '语音导航', '离线地图']
  },
  {
    id: 93,
    title: 'Design Fraud Detection System',
    titleEn: 'Fraud Detection System',
    difficulty: '高频',
    category: '安全系统',
    tags: ['风控', '规则引擎', '机器学习', '实时检测', '反欺诈'],
    summary: '设计欺诈检测系统，支持实时风险识别和预警。',
    keyPoints: ['规则引擎', 'ML模型', '实时检测', '特征工程', '黑白名单']
  },
  {
    id: 94,
    title: 'Design Secure Payment Gateway',
    titleEn: 'Secure Payment Gateway',
    difficulty: '高频',
    category: '金融/支付系统',
    tags: ['支付网关', '安全', '加密', 'PCI-DSS', '风控'],
    summary: '设计安全支付网关，保护支付数据安全。',
    keyPoints: ['数据加密', 'PCI-DSS合规', '风控规则', '安全认证', '日志审计']
  },
  {
    id: 95,
    title: 'Design Secure Identity Management System',
    titleEn: 'Identity Management System',
    difficulty: '高频',
    category: '用户系统',
    tags: ['身份管理', 'SSO', 'OAuth', 'RBAC', '认证'],
    summary: '设计身份管理系统，支持单点登录和权限管理。',
    keyPoints: ['SSO设计', 'OAuth2.0', 'RBAC权限', '多因素认证', '审计日志']
  },
  {
    id: 96,
    title: 'Design Hotel Booking System',
    titleEn: 'Hotel Booking System',
    difficulty: '高频',
    category: '预订/票务系统',
    tags: ['酒店预订', '库存管理', '价格策略', '搜索', '订单'],
    summary: '设计酒店预订系统，支持搜索预订和库存管理。',
    keyPoints: ['库存预占', '价格策略', 'ES搜索', '订单管理', '超售处理']
  },
  {
    id: 97,
    title: 'Design Coupons and Deals Platform',
    titleEn: 'Coupons and Deals Platform',
    difficulty: '中频',
    category: '优惠券/促销系统',
    tags: ['优惠券', '促销', '发放策略', '核销', '防刷'],
    summary: '设计优惠券平台，支持优惠券发放和核销。',
    keyPoints: ['优惠券生成', '发放策略', '核销流程', '防刷机制', '统计分析']
  },
  {
    id: 98,
    title: 'Design Podcast Hosting Platform',
    titleEn: 'Podcast Hosting Platform',
    difficulty: '中频',
    category: '内容管理系统',
    tags: ['播客', 'RSS', '音频托管', '订阅', '发现'],
    summary: '设计播客托管平台，支持RSS订阅和内容分发。',
    keyPoints: ['RSS生成', '音频CDN', '订阅管理', '内容发现', '统计报表']
  },
  {
    id: 99,
    title: 'Design Digital Media Store',
    titleEn: 'Digital Media Store',
    difficulty: '中频',
    category: '内容管理系统',
    tags: ['应用商店', '数字商品', '支付', '下载', 'DRM'],
    summary: '设计数字媒体商店，支持应用和数字商品销售。',
    keyPoints: ['应用分发', '数字版权', '支付集成', '版本管理', '评论系统']
  },
  {
    id: 100,
    title: 'Design Load Balancer',
    titleEn: 'Load Balancer',
    difficulty: '高频',
    category: '负载均衡',
    tags: ['负载均衡', 'LVS', 'Nginx', '健康检查', '算法'],
    summary: '设计负载均衡器，支持多种负载均衡算法。',
    keyPoints: ['轮询算法', '最少连接', 'IP哈希', '健康检查', '会话保持']
  },
  {
    id: 101,
    title: 'Design Craigslist',
    titleEn: 'Craigslist',
    difficulty: '中频',
    category: '内容管理系统',
    tags: ['分类信息', '搜索', '地域', '发布', '反垃圾'],
    summary: '设计分类信息网站，支持分类发布和本地搜索。',
    keyPoints: ['分类管理', '地域过滤', '搜索优化', '反垃圾', '用户认证']
  },
  {
    id: 102,
    title: 'Design Food Delivery Service',
    titleEn: 'Food Delivery Service',
    difficulty: '高频',
    category: '预订/票务系统',
    tags: ['外卖', '订单调度', '配送', '实时定位', '商家管理'],
    summary: '设计外卖配送服务，支持订单调度和配送追踪。',
    keyPoints: ['订单调度', '配送路径规划', '实时定位', '商家管理', '骑手分配']
  },
  {
    id: 103,
    title: 'Design Message Queue System',
    titleEn: 'Message Queue System',
    difficulty: '超高频',
    category: '其他系统',
    tags: ['消息队列', 'Kafka', '分区', '消费者组', '持久化'],
    summary: '设计消息队列系统，支持消息持久化和高吞吐。',
    keyPoints: ['Topic分区', '消费者组', 'Offset管理', '消息持久化', '高可用设计']
  },
  {
    id: 9,
    title: 'Design Message Queue - 消息队列',
    titleEn: 'Message Queue',
    difficulty: '超高频',
    category: '分布式系统',
    tags: ['消息队列', '发布订阅', '消费者组', '顺序消费', '削峰填谷'],
    summary: '设计高吞吐消息队列系统，支持可靠投递、顺序消费和水平扩展。',
    keyPoints: ['Topic分区设计', '消息持久化', '消费者组再均衡', '重试与死信队列', 'Exactly-once权衡']
  },
  {
    id: 13,
    title: 'Design Distributed Counter - 分布式计数器',
    titleEn: 'Distributed Counter',
    difficulty: '高频',
    category: '分布式系统',
    tags: ['分布式计数', '原子性', '最终一致性', '高并发', '聚合'],
    summary: '设计分布式计数系统，支持高并发写入和低延迟读取。',
    keyPoints: ['分片计数', '原子递增', '批量聚合', '热点打散', '一致性模型选择']
  },
  {
    id: 14,
    title: 'Design Social Network - 社交网络',
    titleEn: 'Social Network',
    difficulty: '高频',
    category: '社交媒体/新闻feed系统',
    tags: ['关注关系', '动态流', '好友推荐', '社交图谱', '隐私'],
    summary: '设计社交网络系统，支持关系链、动态流和推荐能力。',
    keyPoints: ['关注关系建模', 'Feed生成策略', '图查询优化', '内容审核', '隐私权限控制']
  },
  {
    id: 33,
    title: 'Distributed Configuration (分布式配置中心)',
    titleEn: 'Distributed Configuration',
    difficulty: '高频',
    category: '分布式系统',
    tags: ['配置中心', '动态推送', '版本管理', '灰度发布', '一致性'],
    summary: '设计分布式配置中心，支持配置管理、实时下发和回滚。',
    keyPoints: ['配置版本化', '灰度生效', '监听推送', '权限审计', '高可用存储']
  },
  {
    id: 37,
    title: 'API Rate Limiter (API限流器)',
    titleEn: 'API Rate Limiter',
    difficulty: '超高频',
    category: '限流系统',
    tags: ['令牌桶', '滑动窗口', '多维限流', '网关限流', '降级'],
    summary: '设计API限流系统，保障服务稳定并防止流量冲击。',
    keyPoints: ['限流算法选型', '分布式计数', '多级限流', '熔断降级', '实时监控告警']
  },
  {
    id: 38,
    title: 'Distributed Cache (分布式缓存)',
    titleEn: 'Distributed Cache',
    difficulty: '高频',
    category: '缓存系统',
    tags: ['缓存一致性', '缓存穿透', '热点缓存', '淘汰策略', '集群'],
    summary: '设计分布式缓存系统，提升读性能并降低数据库压力。',
    keyPoints: ['分片与副本', '一致性策略', '缓存击穿防护', '淘汰策略', '多级缓存架构']
  },
  {
    id: 39,
    title: 'Distributed Session (分布式会话)',
    titleEn: 'Distributed Session',
    difficulty: '中频',
    category: '用户系统',
    tags: ['Session共享', '无状态服务', '会话存储', '登录态', '安全'],
    summary: '设计分布式会话管理方案，支持多实例共享登录状态。',
    keyPoints: ['Session集中存储', '会话续期', '跨域登录态', '并发登录控制', '安全加固']
  },
  {
    id: 40,
    title: 'Distributed Transaction (分布式事务)',
    titleEn: 'Distributed Transaction',
    difficulty: '高频',
    category: '分布式系统',
    tags: ['2PC', 'TCC', 'Saga', '补偿事务', '一致性'],
    summary: '设计分布式事务方案，保证跨服务数据一致性。',
    keyPoints: ['事务边界划分', '一致性级别', '补偿机制', '幂等与去重', '失败恢复']
  },
  {
    id: 41,
    title: 'Data Pipeline (数据管道)',
    titleEn: 'Data Pipeline',
    difficulty: '中频',
    category: '监控/分析系统',
    tags: ['数据采集', '流批一体', 'ETL', '数据质量', '调度'],
    summary: '设计数据管道系统，支持稳定采集、处理和下游分发。',
    keyPoints: ['数据接入层', '流处理与批处理', '数据质量校验', '任务编排', '可观测性']
  },
  {
    id: 42,
    title: 'Log Aggregation (日志聚合)',
    titleEn: 'Log Aggregation',
    difficulty: '高频',
    category: '监控/分析系统',
    tags: ['日志采集', '索引检索', '实时分析', '告警', '可观测性'],
    summary: '设计日志聚合平台，支持海量日志采集、检索和分析。',
    keyPoints: ['采集链路解耦', '日志结构化', '索引分片', '冷热分层存储', '告警联动']
  },
  {
    id: 43,
    title: 'Task Scheduler (任务调度器)',
    titleEn: 'Task Scheduler',
    difficulty: '中频',
    category: '分布式系统',
    tags: ['定时任务', '延迟队列', '重试', '分片执行', '高可用'],
    summary: '设计分布式任务调度器，支持定时执行、失败重试与依赖编排。',
    keyPoints: ['触发器模型', '执行器分片', '失败重试机制', '幂等保障', '任务监控']
  },
  {
    id: 44,
    title: 'Feature Flag (功能开关)',
    titleEn: 'Feature Flag',
    difficulty: '中频',
    category: '其他系统',
    tags: ['灰度发布', 'A/B测试', '开关管理', '动态配置', '回滚'],
    summary: '设计功能开关系统，支持按人群灰度和快速回滚。',
    keyPoints: ['规则引擎', '实时开关下发', '实验分流', '审计日志', '故障兜底']
  },
  {
    id: 46,
    title: 'Real-time Bidding (实时竞价)',
    titleEn: 'Real-time Bidding',
    difficulty: '高频',
    category: '其他系统',
    tags: ['广告竞价', '低延迟', '特征召回', '预算控制', '归因'],
    summary: '设计实时竞价广告系统，在毫秒级完成竞价决策与投放。',
    keyPoints: ['毫秒级请求链路', '多阶段召回排序', '预算与频控', '反作弊', '日志归因']
  },
  {
    id: 48,
    title: 'Image Hosting (图片托管)',
    titleEn: 'Image Hosting',
    difficulty: '中频',
    category: '存储系统',
    tags: ['对象存储', '图片处理', 'CDN', '缩略图', '去重'],
    summary: '设计图片托管服务，支持上传、处理、存储和全球分发。',
    keyPoints: ['上传链路优化', '异步处理流水线', 'CDN缓存策略', '访问鉴权', '成本优化']
  },
  {
    id: 49,
    title: 'Stock Exchange (股票交易所)',
    titleEn: 'Stock Exchange',
    difficulty: '高频',
    category: '金融/支付系统',
    tags: ['撮合引擎', '订单簿', '低延迟', '高可用', '风控'],
    summary: '设计股票交易系统，支持撮合、清算和风控能力。',
    keyPoints: ['订单簿结构', '撮合优先级', '低延迟网络', '风控限价', '灾备容灾']
  },
  {
    id: 52,
    title: 'Docker Container Platform (容器平台)',
    titleEn: 'Docker Container Platform',
    difficulty: '中频',
    category: '分布式系统',
    tags: ['容器', '镜像管理', '编排', '调度', '隔离'],
    summary: '设计容器平台，支持镜像管理、调度编排和弹性伸缩。',
    keyPoints: ['镜像仓库', '容器调度', '资源隔离', '服务发现', '监控告警']
  },
  {
    id: 57,
    title: 'Time Series Database (时序数据库)',
    titleEn: 'Time Series Database',
    difficulty: '中频',
    category: '数据库相关',
    tags: ['时序存储', '压缩', '下采样', '写入优化', '查询聚合'],
    summary: '设计时序数据库，支持高写入吞吐和时间窗口聚合查询。',
    keyPoints: ['时间分区', '列式压缩', '降采样策略', '保留策略', '多维标签索引']
  },
  {
    id: 65,
    title: 'Content Moderation (内容审核)',
    titleEn: 'Content Moderation',
    difficulty: '高频',
    category: '安全系统',
    tags: ['内容审核', '规则引擎', '机器学习', '人工复审', '合规'],
    summary: '设计内容审核系统，支持文本图片视频的自动与人工审核。',
    keyPoints: ['多模态识别', '审核队列分级', '策略配置中心', '误杀率控制', '申诉回溯']
  },
  {
    id: 70,
    title: 'Full-text Search (全文搜索)',
    titleEn: 'Full-text Search',
    difficulty: '高频',
    category: '搜索系统',
    tags: ['倒排索引', '分词', '相关性', '检索排序', '高亮'],
    summary: '设计全文搜索系统，支持海量文本检索和相关性排序。',
    keyPoints: ['倒排索引构建', '分词与同义词', '召回与排序', '索引更新策略', '搜索性能优化']
  },
  {
    id: 72,
    title: 'Data Warehouse (数据仓库)',
    titleEn: 'Data Warehouse',
    difficulty: '中频',
    category: '监控/分析系统',
    tags: ['数仓建模', '星型模型', 'OLAP', '维度分析', '指标体系'],
    summary: '设计数据仓库体系，支持统一指标和分析查询。',
    keyPoints: ['主题域建模', '宽表与维度表', '指标口径治理', '离线与实时融合', '权限控制']
  },
  {
    id: 73,
    title: 'ETL Pipeline (ETL管道)',
    titleEn: 'ETL Pipeline',
    difficulty: '中频',
    category: '监控/分析系统',
    tags: ['ETL', '数据清洗', '任务调度', '数据校验', '血缘'],
    summary: '设计ETL管道，完成多源数据抽取、转换和装载。',
    keyPoints: ['抽取策略', '数据清洗规则', '任务依赖编排', '质量校验', '元数据与血缘']
  },
  {
    id: 74,
    title: 'Business Intelligence (商业智能)',
    titleEn: 'Business Intelligence',
    difficulty: '中频',
    category: '监控/分析系统',
    tags: ['BI报表', '指标看板', '钻取分析', '自助分析', '权限'],
    summary: '设计BI系统，支持多角色数据看板和自助分析。',
    keyPoints: ['指标定义与口径', '看板搭建', '多维钻取', '权限隔离', '性能与缓存']
  }
];

const taxonomyCategories = [
  'URL/网关/流量治理',
  '社交/内容分发/实时通信',
  '搜索/检索/推荐与排序',
  '爬虫与数据采集',
  '存储系统与数据库',
  '缓存体系与缓存模式',
  '消息队列与事件驱动架构',
  '分布式基础组件与一致性',
  '系统可靠性与容错模式',
  '数据平台/分析/监控',
  '工程平台与云原生',
  '业务系统设计（交易/出行/电商/媒体）',
  '内容/文件/协同与产品能力'
] as const;

const fineCategories = [
  '短链与ID生成',
  '网关、限流与负载均衡',
  '社交关系与Feed系统',
  '实时消息与通知系统',
  '协同编辑与实时文档',
  '搜索引擎与信息检索',
  '推荐排序与广告系统',
  '缓存架构与性能优化',
  '数据库与存储引擎',
  '文件与对象存储系统',
  '媒体处理与内容分发',
  '消息队列与异步架构',
  '任务调度与工作流系统',
  '分布式协调与一致性',
  '云原生平台与资源编排',
  '数据管道与可观测性',
  '数仓建模与BI分析',
  '支付交易与资金风控',
  '电商交易与库存系统',
  '预订与票务履约',
  '地理空间与路径调度',
  '安全身份与内容风控',
  '去中心化与P2P网络',
  '通用业务平台与产品能力'
] as const;

type TaxonomyCategory = (typeof taxonomyCategories)[number];
type FineCategory = (typeof fineCategories)[number];

const fineCategoryById: Record<number, FineCategory> = {
  1: '短链与ID生成',
  2: '社交关系与Feed系统',
  3: '搜索引擎与信息检索',
  4: '支付交易与资金风控',
  5: '社交关系与Feed系统',
  6: '缓存架构与性能优化',
  7: '推荐排序与广告系统',
  8: '云原生平台与资源编排',
  9: '消息队列与异步架构',
  10: '电商交易与库存系统',
  11: '预订与票务履约',
  12: '通用业务平台与产品能力',
  13: '分布式协调与一致性',
  14: '社交关系与Feed系统',
  15: '数据库与存储引擎',
  16: '网关、限流与负载均衡',
  17: '文件与对象存储系统',
  18: '协同编辑与实时文档',
  19: '数据库与存储引擎',
  20: '数据库与存储引擎',
  21: '实时消息与通知系统',
  22: '媒体处理与内容分发',
  23: '地理空间与路径调度',
  24: '数仓建模与BI分析',
  25: '搜索引擎与信息检索',
  26: '搜索引擎与信息检索',
  27: '搜索引擎与信息检索',
  28: '数据库与存储引擎',
  29: '数据库与存储引擎',
  30: '社交关系与Feed系统',
  31: '文件与对象存储系统',
  32: '搜索引擎与信息检索',
  33: '分布式协调与一致性',
  34: '缓存架构与性能优化',
  35: '缓存架构与性能优化',
  36: '推荐排序与广告系统',
  37: '网关、限流与负载均衡',
  38: '缓存架构与性能优化',
  39: '分布式协调与一致性',
  40: '分布式协调与一致性',
  41: '数据管道与可观测性',
  42: '数据管道与可观测性',
  43: '任务调度与工作流系统',
  44: '通用业务平台与产品能力',
  45: '短链与ID生成',
  46: '推荐排序与广告系统',
  47: '分布式协调与一致性',
  48: '媒体处理与内容分发',
  49: '支付交易与资金风控',
  50: '网关、限流与负载均衡',
  51: '支付交易与资金风控',
  52: '云原生平台与资源编排',
  53: '预订与票务履约',
  54: '实时消息与通知系统',
  55: '媒体处理与内容分发',
  56: '数据管道与可观测性',
  57: '数据库与存储引擎',
  58: '任务调度与工作流系统',
  59: '通用业务平台与产品能力',
  60: '任务调度与工作流系统',
  61: '云原生平台与资源编排',
  62: '云原生平台与资源编排',
  63: '文件与对象存储系统',
  64: '文件与对象存储系统',
  65: '安全身份与内容风控',
  66: '云原生平台与资源编排',
  67: '云原生平台与资源编排',
  68: '媒体处理与内容分发',
  69: '分布式协调与一致性',
  70: '搜索引擎与信息检索',
  71: '任务调度与工作流系统',
  72: '数仓建模与BI分析',
  73: '数仓建模与BI分析',
  74: '数仓建模与BI分析',
  75: '通用业务平台与产品能力',
  76: '去中心化与P2P网络',
  77: '云原生平台与资源编排',
  78: '推荐排序与广告系统',
  79: '协同编辑与实时文档',
  80: '推荐排序与广告系统',
  81: '数据管道与可观测性',
  82: '云原生平台与资源编排',
  83: '电商交易与库存系统',
  84: '支付交易与资金风控',
  85: '电商交易与库存系统',
  86: '媒体处理与内容分发',
  87: '媒体处理与内容分发',
  88: '媒体处理与内容分发',
  89: '媒体处理与内容分发',
  90: '去中心化与P2P网络',
  91: '实时消息与通知系统',
  92: '地理空间与路径调度',
  93: '安全身份与内容风控',
  94: '支付交易与资金风控',
  95: '安全身份与内容风控',
  96: '预订与票务履约',
  97: '电商交易与库存系统',
  98: '媒体处理与内容分发',
  99: '媒体处理与内容分发',
  100: '网关、限流与负载均衡',
  101: '通用业务平台与产品能力',
  102: '地理空间与路径调度',
  103: '消息队列与异步架构'
};

const domainByFineCategory: Record<FineCategory, TaxonomyCategory> = {
  '短链与ID生成': 'URL/网关/流量治理',
  '网关、限流与负载均衡': 'URL/网关/流量治理',
  '社交关系与Feed系统': '社交/内容分发/实时通信',
  '实时消息与通知系统': '社交/内容分发/实时通信',
  '协同编辑与实时文档': '内容/文件/协同与产品能力',
  '搜索引擎与信息检索': '搜索/检索/推荐与排序',
  '推荐排序与广告系统': '搜索/检索/推荐与排序',
  '缓存架构与性能优化': '缓存体系与缓存模式',
  '数据库与存储引擎': '存储系统与数据库',
  '文件与对象存储系统': '存储系统与数据库',
  '媒体处理与内容分发': '业务系统设计（交易/出行/电商/媒体）',
  '消息队列与异步架构': '消息队列与事件驱动架构',
  '任务调度与工作流系统': '内容/文件/协同与产品能力',
  '分布式协调与一致性': '分布式基础组件与一致性',
  '云原生平台与资源编排': '工程平台与云原生',
  '数据管道与可观测性': '数据平台/分析/监控',
  '数仓建模与BI分析': '数据平台/分析/监控',
  '支付交易与资金风控': '业务系统设计（交易/出行/电商/媒体）',
  '电商交易与库存系统': '业务系统设计（交易/出行/电商/媒体）',
  '预订与票务履约': '业务系统设计（交易/出行/电商/媒体）',
  '地理空间与路径调度': '业务系统设计（交易/出行/电商/媒体）',
  '安全身份与内容风控': '系统可靠性与容错模式',
  '去中心化与P2P网络': '分布式基础组件与一致性',
  '通用业务平台与产品能力': '内容/文件/协同与产品能力'
};

function mapToFineCategory(question: Question): FineCategory {
  return fineCategoryById[question.id] ?? '通用业务平台与产品能力';
}

function mapToTaxonomyCategory(question: Question): TaxonomyCategory {
  return domainByFineCategory[mapToFineCategory(question)];
}

function getSearchText(question: Question): string {
  return `${question.title} ${question.titleEn} ${question.tags.join(' ')}`.toLowerCase();
}

function containsAny(text: string, keywords: string[]): boolean {
  return keywords.some((keyword) => text.includes(keyword));
}

const coreByFineCategory: Record<FineCategory, number> = {
  '短链与ID生成': 1,
  '网关、限流与负载均衡': 16,
  '社交关系与Feed系统': 2,
  '实时消息与通知系统': 21,
  '协同编辑与实时文档': 18,
  '搜索引擎与信息检索': 32,
  '推荐排序与广告系统': 36,
  '缓存架构与性能优化': 34,
  '数据库与存储引擎': 15,
  '文件与对象存储系统': 31,
  '媒体处理与内容分发': 22,
  '消息队列与异步架构': 9,
  '任务调度与工作流系统': 43,
  '分布式协调与一致性': 13,
  '云原生平台与资源编排': 62,
  '数据管道与可观测性': 41,
  '数仓建模与BI分析': 72,
  '支付交易与资金风控': 84,
  '电商交易与库存系统': 83,
  '预订与票务履约': 11,
  '地理空间与路径调度': 23,
  '安全身份与内容风控': 93,
  '去中心化与P2P网络': 90,
  '通用业务平台与产品能力': 60
};

export const coreQuestionIds = [
  1, 2, 9, 11, 13, 15, 16, 18, 21, 22, 23, 31,
  32, 34, 36, 41, 43, 60, 62, 72, 83, 84, 90, 93
] as const;

const baselineSkillsByFineCategory: Record<FineCategory, string[]> = {
  '短链与ID生成': ['短链编码与冲突避免', 'ID生成与时钟回拨处理', '重定向与缓存策略'],
  '网关、限流与负载均衡': ['网关鉴权与路由', '多级限流与熔断', '负载均衡与健康检查'],
  '社交关系与Feed系统': ['关系图建模', 'Feed推拉模型', '热点内容分发'],
  '实时消息与通知系统': ['长连接管理', '消息投递确认', '多通道通知策略'],
  '协同编辑与实时文档': ['OT/CRDT冲突解决', '多端同步', '版本回溯与审计'],
  '搜索引擎与信息检索': ['倒排索引', '召回与排序', '索引更新与重建'],
  '推荐排序与广告系统': ['特征工程', '多阶段排序', '在线评估与实验'],
  '缓存架构与性能优化': ['多级缓存架构', '一致性与失效', '热点与穿透防护'],
  '数据库与存储引擎': ['索引与查询优化', '分片与扩容迁移', '事务与并发控制'],
  '文件与对象存储系统': ['对象分块与去重', '副本与容灾', '一致性与元数据管理'],
  '媒体处理与内容分发': ['转码与分片', 'CDN分发', '播放质量与成本优化'],
  '消息队列与异步架构': ['分区与消费组', '重试与死信', '幂等与顺序保证'],
  '任务调度与工作流系统': ['任务编排', '重试与补偿', '可观测与告警'],
  '分布式协调与一致性': ['分布式锁与租约', '配置与服务发现', '一致性与复制'],
  '云原生平台与资源编排': ['容器调度', '弹性伸缩', '发布与服务治理'],
  '数据管道与可观测性': ['日志指标追踪', '流批处理链路', '数据质量监控'],
  '数仓建模与BI分析': ['维度建模', '指标口径治理', '报表与分析性能'],
  '支付交易与资金风控': ['支付状态机', '幂等与对账', '风险控制与合规'],
  '电商交易与库存系统': ['订单履约链路', '库存一致性', '促销与高并发峰值治理'],
  '预订与票务履约': ['资源预占锁定', '超售防控', '支付与取消补偿'],
  '地理空间与路径调度': ['空间索引', '实时定位更新', '调度与路径规划'],
  '安全身份与内容风控': ['认证授权模型', '风控规则与模型', '内容审核与申诉回溯'],
  '去中心化与P2P网络': ['节点发现', '路由与一致性', '去中心化容错'],
  '通用业务平台与产品能力': ['平台化抽象', '权限与配置', '产品闭环与运营']
};

function inferExtraSkills(question: Question): string[] {
  const text = getSearchText(question);
  const inferred: string[] = [];

  const keywordRules: Array<{ keywords: string[]; skill: string }> = [
    { keywords: ['websocket', 'chat', '实时推送'], skill: 'WebSocket连接管理与ACK确认' },
    { keywords: ['geohash', 'gps', '地图', '路径'], skill: '地理索引与路径规划' },
    { keywords: ['hls', 'dash', 'webrtc', '视频', '音频'], skill: '媒体编解码与低延迟传输' },
    { keywords: ['payment', '支付', '对账', '交易'], skill: '资金安全、幂等与对账' },
    { keywords: ['fraud', 'spam', '审核', '推荐', '机器学习'], skill: '特征工程与在线模型服务' },
    { keywords: ['cache-aside', 'write-through', 'write-behind', 'read-through', 'refresh-ahead'], skill: '缓存模式一致性权衡' },
    { keywords: ['k8s', 'kubernetes', '容器', 'service mesh', 'serverless'], skill: '云原生编排与弹性治理' },
    { keywords: ['saga', 'outbox', 'cqrs', 'event sourcing', '消息队列'], skill: '事件一致性与补偿事务' },
    { keywords: ['etl', 'warehouse', 'analytics', 'bi', 'log'], skill: '数仓建模与指标治理' },
    { keywords: ['oauth', 'sso', 'rbac', 'identity'], skill: '认证授权与权限模型' },
    { keywords: ['search', 'index', '倒排', 'autocomplete', 'pagerank'], skill: '检索召回与排序优化' },
    { keywords: ['lock', 'consensus', 'raft', 'paxos', '一致性'], skill: '分布式一致性协议与租约机制' }
  ];

  for (const rule of keywordRules) {
    if (containsAny(text, rule.keywords.map((keyword) => keyword.toLowerCase()))) {
      inferred.push(rule.skill);
    }
  }

  return inferred;
}

const taxonomyQuestions: Question[] = rawQuestions.map((question) => {
  const domain = mapToTaxonomyCategory(question);
  return {
    ...question,
    domain,
    category: mapToFineCategory(question)
  };
});

const questionById = new Map<number, Question>();
for (const question of taxonomyQuestions) {
  questionById.set(question.id, question);
}

export const questions: Question[] = taxonomyQuestions.map((question) => {
  const fineCategory = question.category as FineCategory;
  const learningCoreId = coreByFineCategory[fineCategory];
  const coreQuestion = questionById.get(learningCoreId);
  const baselineSkills = baselineSkillsByFineCategory[fineCategory] ?? [];
  const inferredSkills = inferExtraSkills(question);
  const learningExtraSkills = Array.from(new Set([...baselineSkills, ...inferredSkills])).slice(0, 5);

  return {
    ...question,
    isCoreQuestion: question.id === learningCoreId,
    learningCoreId,
    learningCoreTitle: coreQuestion?.title ?? '',
    learningWhy:
      question.id === learningCoreId
        ? '这是该细分类的母题，优先掌握可覆盖同类高频题。'
        : `先掌握 #${learningCoreId} ${coreQuestion?.title ?? '母题'}，再补充本题差异知识。`,
    learningExtraSkills
  };
});

export const coreQuestions: Question[] = questions
  .filter((question) => question.isCoreQuestion)
  .sort((a, b) => a.id - b.id);

export const difficultyOrder: Difficulty[] = ['超高频', '高频', '中频', '低频'];

export const domains = [...taxonomyCategories];
export const categories = [...fineCategories];
