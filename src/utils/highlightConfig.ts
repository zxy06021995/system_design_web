export interface HighlightCategory {
  name: string;
  pattern: RegExp;
  className: string;
  description: string;
}

export const highlightCategories: HighlightCategory[] = [
  {
    name: 'api',
    pattern: /(GET|POST|PUT|DELETE|PATCH)\s+(\/[^\s,\)]+)/g,
    className: 'highlight-api',
    description: 'API端点高亮'
  },
  {
    name: 'httpStatus',
    pattern: /\b(200|201|204|301|302|304|400|401|403|404|405|409|429|500|502|503|504)\b/g,
    className: 'highlight-http-status',
    description: 'HTTP状态码高亮'
  },
  {
    name: 'database',
    pattern: /(MySQL|PostgreSQL|MongoDB|Redis|Elasticsearch|Cassandra|DynamoDB|HBase|CouchDB|Neo4j|SQLite|Oracle|SQL Server)/gi,
    className: 'highlight-database',
    description: '数据库高亮'
  },
  {
    name: 'techStack',
    pattern: /(Kafka|RabbitMQ|RocketMQ|ActiveMQ|Zookeeper|Etcd|Consul|Nginx|HAProxy|Envoy|Docker|Kubernetes|K8s|Jenkins|GitLab|Prometheus|Grafana|ELK|Fluentd|Logstash|Kibana)/gi,
    className: 'highlight-tech',
    description: '技术栈高亮'
  },
  {
    name: 'algorithm',
    pattern: /(一致性哈希|布隆过滤器|LRU|LFU|Raft|Paxos|Gossip|Snowflake|Base62|Merkle Tree|B\+树|跳表|LSM-Tree|倒排索引|Trie树|Geohash|QUORUM|WAL|MVCC|CRDT|OT算法)/gi,
    className: 'highlight-algorithm',
    description: '算法/数据结构高亮'
  },
  {
    name: 'concept',
    pattern: /(分库分表|读写分离|主从复制|哨兵模式|集群模式|负载均衡|服务发现|熔断降级|限流|缓存穿透|缓存击穿|缓存雪崩|热点Key|大Key|消息队列|异步处理|最终一致性|分布式事务|分布式锁|幂等性|高可用|高并发|水平扩展|垂直扩展|微服务|服务网格|CDN|DNS|TCP|UDP|HTTP|HTTPS|WebSocket|gRPC|RESTful|GraphQL)/gi,
    className: 'highlight-concept',
    description: '核心概念高亮'
  },
  {
    name: 'storage',
    pattern: /(S3|OSS|HDFS|GFS|Ceph|MinIO|NFS|SAN|NAS|对象存储|块存储|文件存储|分布式存储|冷热分离|数据分片|数据复制|数据压缩|数据去重)/gi,
    className: 'highlight-storage',
    description: '存储相关高亮'
  },
  {
    name: 'metric',
    pattern: /(\d+(?:\.\d+)?\s*(?:QPS|TPS|RPS|ms|秒|分钟|小时|GB|TB|PB|MB|KB|B|%|万|亿|百万|千万|亿级|百万级|千万级))/gi,
    className: 'highlight-metric',
    description: '性能指标高亮'
  },
  {
    name: 'important',
    pattern: /(重要|关键|核心|注意|警告|⚠️|❗|❌|✅|💡|🔥|⭐|必须|务必|切记)/g,
    className: 'highlight-important',
    description: '重要提示高亮'
  },
  {
    name: 'codeKeyword',
    pattern: /(public|private|protected|class|interface|extends|implements|return|async|await|function|const|let|var|import|export|from|default|new|this|super|static|final|abstract|override|throws|try|catch|finally|throw)/g,
    className: 'highlight-keyword',
    description: '代码关键字高亮'
  }
];

export function highlightText(text: string): string {
  let result = text;
  
  for (const category of highlightCategories) {
    result = result.replace(category.pattern, (match) => {
      return `<span class="${category.className}">${match}</span>`;
    });
  }
  
  return result;
}

export const highlightStyles = `
.highlight-api {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 2px 8px;
  border-radius: 4px;
  font-weight: 600;
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 0.9em;
  display: inline-block;
  margin: 1px 2px;
}

.highlight-http-status {
  background: #fbbf24;
  color: #1f2937;
  padding: 1px 6px;
  border-radius: 3px;
  font-weight: 700;
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 0.85em;
}

.highlight-database {
  background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
  color: white;
  padding: 2px 8px;
  border-radius: 4px;
  font-weight: 600;
  font-size: 0.9em;
}

.highlight-tech {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
  padding: 2px 8px;
  border-radius: 4px;
  font-weight: 600;
  font-size: 0.9em;
}

.highlight-algorithm {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  color: #1a1a2e;
  padding: 2px 8px;
  border-radius: 4px;
  font-weight: 700;
  font-size: 0.9em;
}

.highlight-concept {
  background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
  color: #1a1a2e;
  padding: 2px 8px;
  border-radius: 4px;
  font-weight: 600;
  font-size: 0.9em;
}

.highlight-storage {
  background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
  color: #1a1a2e;
  padding: 2px 8px;
  border-radius: 4px;
  font-weight: 600;
  font-size: 0.9em;
}

.highlight-metric {
  background: #818cf8;
  color: white;
  padding: 2px 6px;
  border-radius: 3px;
  font-weight: 700;
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 0.85em;
}

.highlight-important {
  background: linear-gradient(135deg, #ff0844 0%, #ffb199 100%);
  color: white;
  padding: 2px 8px;
  border-radius: 4px;
  font-weight: 700;
  font-size: 0.9em;
  animation: pulse-highlight 2s infinite;
}

.highlight-keyword {
  color: #c084fc;
  font-weight: 600;
}

@keyframes pulse-highlight {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.85;
  }
}

.dark .highlight-database {
  background: linear-gradient(135deg, #059669 0%, #10b981 100%);
}

.dark .highlight-algorithm {
  background: linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%);
  color: white;
}

.dark .highlight-concept {
  background: linear-gradient(135deg, #ec4899 0%, #f97316 100%);
  color: white;
}

.dark .highlight-storage {
  background: linear-gradient(135deg, #14b8a6 0%, #f472b6 100%);
  color: white;
}

.dark .highlight-keyword {
  color: #a78bfa;
}
`;
