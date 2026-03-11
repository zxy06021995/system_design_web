export interface BasicsPageMeta {
  slug: string;
  title: string;
  summary: string;
}

export const basicsPages: BasicsPageMeta[] = [
  {
    slug: 'sharding',
    title: 'Sharding / 分库分表基础知识复习',
    summary: '系统设计面试 + Java 开发复习版，覆盖分片、热点、Redis/MongoDB/Cassandra/MySQL 分库分表。'
  }
];

export async function loadBasicsContent(slug: string): Promise<string | null> {
  try {
    const response = await fetch(`/basics/${slug}.md`);
    if (!response.ok) {
      console.error(`Failed to load basics page ${slug}: ${response.status}`);
      return null;
    }
    return await response.text();
  } catch (error) {
    console.error('Failed to load basics content:', error);
    return null;
  }
}
