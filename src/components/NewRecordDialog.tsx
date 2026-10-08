import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import type { CopyRecord } from '@/types/record'
import { useState } from 'react'

interface NewRecordDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (record: Omit<CopyRecord, 'id' | 'createdAt'>) => void
}

export function NewRecordDialog({ open, onOpenChange, onSubmit }: NewRecordDialogProps) {
  const [title, setTitle] = useState('')
  const [platform, setPlatform] = useState('')
  const [category, setCategory] = useState('')
  const [content, setContent] = useState('')

  const reset = () => {
    setTitle('')
    setPlatform('')
    setCategory('')
    setContent('')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !platform || !category) return
    onSubmit({ title: title.trim(), platform, category })
    reset()
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o) reset(); onOpenChange(o) }}>
      <DialogContent className="sm:max-w-[520px]">
        <DialogHeader>
          <DialogTitle>新建文案</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="title">标题 *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="给这条文案起个名字"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>平台 *</Label>
              <Select value={platform} onValueChange={setPlatform} required>
                <SelectTrigger>
                  <SelectValue placeholder="选择平台" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="微信公众号">微信公众号</SelectItem>
                  <SelectItem value="小红书">小红书</SelectItem>
                  <SelectItem value="抖音">抖音</SelectItem>
                  <SelectItem value="微博">微博</SelectItem>
                  <SelectItem value="知乎">知乎</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label>分类 *</Label>
              <Select value={category} onValueChange={setCategory} required>
                <SelectTrigger>
                  <SelectValue placeholder="选择分类" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="产品介绍">产品介绍</SelectItem>
                  <SelectItem value="活动推广">活动推广</SelectItem>
                  <SelectItem value="品牌故事">品牌故事</SelectItem>
                  <SelectItem value="用户案例">用户案例</SelectItem>
                  <SelectItem value="种草文案">种草文案</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="content">内容</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="（选填）粘贴或输入文案内容…"
              rows={4}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              取消
            </Button>
            <Button type="submit">保存</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
