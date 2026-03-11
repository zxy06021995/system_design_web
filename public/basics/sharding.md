# Sharding / 分库分表基础知识复习

> 这页是独立的基础知识复习页，不属于题号体系。  
> 目标是把系统设计面试 + Java 开发里经常被追问的分片知识整理成一份可复习、可背诵、可快速回顾的笔记。

好，我们把刚才所有内容整理成一份 **系统设计面试 + Java开发复习笔记版**。我会按逻辑从基础 → 真实系统 → 面试重点整理，这样你以后复习会很清晰。

---

# 一、为什么需要 Sharding（分片）

当数据库数据量变大时，会遇到三个问题：

1. **查询慢**  
表数据太多，索引变大。

2. **写入慢**  
写操作多，锁竞争严重。

3. **单机容量不够**

所以需要把数据拆到多台机器。

这叫：

**Sharding（分片）**

---

# 二、两种基本分片方式

## 1. Hash 分片

思路：

```text
hash(key) % N
```

或者：

```text
user_id % N
```

例子：

```text
user_id % 4
```

结果：

```text
user_0
user_1
user_2
user_3
```

特点：

优点：

- 数据均匀
- 不容易热点

缺点：

- 范围查询困难
- 可能需要查所有分片

例子：

```text
select * from user where user_id = 100
```

很快。

但：

```text
select * from user where user_id between 1000 and 2000
```

需要查很多表。

## 2. Range 分片

思路：

按区间分。

例子：

```text
Shard A : user_id 1-1000000
Shard B : user_id 1000001-2000000
Shard C : user_id 2000001-3000000
```

优点：

- 范围查询很快

缺点：

- 容易热点

例如 `user_id` 递增：

新数据全部写到最后一个 shard。

---

# 三、什么时候用哪种分片

经验规则：

### Hash 分片适合

查询：

```text
where id = ?
```

例子：

- user
- account
- profile

### Range 分片适合

查询：

```text
where time between ?
where id between ?
```

例子：

- order
- log
- metrics
- time-series

---

# 四、Redis 分片（slot）

Redis Cluster 不用一致性哈希。

它使用：

```text
16384 slots
```

计算方式：

```text
slot = CRC16(key) % 16384
```

slot 范围：

```text
0 - 16383
```

每个节点负责一部分 slot。

例如：

```text
NodeA : 0-5000
NodeB : 5001-10000
NodeC : 10001-16383
```

新增节点时：

只需要迁移部分 slot。

---

# 五、MongoDB 分片

MongoDB 支持两种：

### Hash Shard

```text
hash(field)
```

再按 hash 范围分。

优点：

- 分布均匀

缺点：

- 范围查询困难

### Range Shard

按字段区间分。

例子：

```text
user_id 0-1M
user_id 1M-2M
user_id 2M-3M
```

优点：

- 范围查询快

缺点：

- 容易热点

---

# 六、Cassandra 分片

Cassandra 使用：

**一致性哈希**

思想：

1. 把机器放在哈希环上  
2. key hash 后找到位置  
3. 顺时针找到机器

特点：

- 扩容只影响一小部分数据
- 自动容错
- 自动均衡

---

# 七、MySQL 分库分表

MySQL 没有自动 sharding。

需要自己做：

**分库分表**

例如：

```text
4 个数据库
每库 8 张表
```

一共：

```text
32 shards
```

计算：

```text
shard = user_id % 32
db = shard / 8
table = shard % 8
```

---

# 八、为什么大厂一开始建很多表

例如：

```text
1024 tables
```

原因：

避免未来改变分片规则。

如果规则从：

```text
user_id % 64
```

变成：

```text
user_id % 256
```

所有数据都要迁移。

所以一开始就：

```text
user_id % 1024
```

未来只需要：

**移动表，不改规则**

---

# 九、热点问题

## 1. 热点 Key（Redis）

例如：

```text
product:1
```

访问量特别大。

解决：

### 方法1 拆 key

```text
product:1:0
product:1:1
product:1:2
```

随机访问。

### 方法2 多副本

```text
product:1:A
product:1:B
product:1:C
```

随机读。

### 方法3 本地缓存

应用服务器缓存：

```text
Caffeine
Guava cache
```

## 2. 热点 shard

例如：

```text
user_888
```

访问量特别大。

解决：

### 写热点

拆桶：

```text
msg_888_0
msg_888_1
msg_888_2
```

### 读热点

多副本：

```text
user:888:A
user:888:B
```

随机读。

---

# 十、Java 代码怎么实现分片

最简单版本：

```java
long userId = 123456;

int shard = (int)(userId % 32);
int dbIndex = shard / 8;
int tableIndex = shard % 8;

String db = "db_" + dbIndex;
String table = "user_" + tableIndex;
```

SQL：

```java
select * from user_5 where user_id = ?
```

---

# 十一、真实 Java 项目常用中间件

通常不会手写分片逻辑。

常见中间件：

- ShardingSphere
- Mycat
- Vitess
- 公司自研 Router

功能：

1. 自动算 shard  
2. 自动改 SQL  
3. 自动路由数据库

---

# 十二、分片系统的一个重要原则

查询尽量带：

**分片键**

例如：

```text
user_id
order_id
merchant_id
```

否则系统需要：

**查询所有分片**

性能会很差。

---

# 十三、分片系统常见限制

分片后很多操作变难：

- join
- group by
- 排序
- 跨分片事务

所以系统设计时：

通常避免跨分片操作。

---

# 十四、一句话总结（面试版）

分片是为了解决数据库容量和性能问题。  
常见方式有 hash 分片和 range 分片。  
Redis 使用 slot 分片，MongoDB 支持 hash 和 range 分片，Cassandra 使用一致性哈希。  
MySQL 需要通过分库分表实现 sharding，通常通过分片键计算目标库表，并使用中间件如 ShardingSphere 做路由。

---

如果你愿意，我可以再给你一份 **系统设计面试高频追问清单（分库分表部分）**，大概 10 个问题，基本是 **字节 / 腾讯 / 阿里**都会问的。
