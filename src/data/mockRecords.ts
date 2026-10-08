import type { CopyRecord } from '@/types/record'

const platforms = ['微信公众号', '小红书', '抖音', '微博', '知乎']
const categories = ['产品介绍', '活动推广', '品牌故事', '用户案例', '种草文案']
const titles = [
  '新品上市：XX 产品全新升级',
  '双 11 限时特惠活动来袭',
  '品牌背后的故事：十年坚守',
  '真实用户使用体验分享',
  '三分钟教你写出爆款文案',
  '这些细节决定成败',
  '行业趋势解读：2024 展望',
  '新手必看：入门指南',
  '深度评测：A vs B 对比',
  '快速上手：五分钟教程',
]

function randomFrom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

function randomDate(daysBack: number): string {
  const d = new Date()
  d.setDate(d.getDate() - Math.floor(Math.random() * daysBack))
  d.setHours(Math.floor(Math.random() * 24), Math.floor(Math.random() * 60))
  return d.toISOString()
}

export function generateMockRecords(count = 57): CopyRecord[] {
  const records: CopyRecord[] = []
  for (let i = 0; i < count; i++) {
    records.push({
      id: String(i + 1).padStart(4, '0'),
      title: randomFrom(titles) + ` #${i + 1}`,
      platform: randomFrom(platforms),
      category: randomFrom(categories),
      createdAt: randomDate(90),
    })
  }
  return records
}
