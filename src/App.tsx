import { useMemo, useState } from 'react'
import { AppSidebar } from '@/components/AppSidebar'
import { NewRecordDialog } from '@/components/NewRecordDialog'
import { RecordsTable } from '@/components/RecordsTable'
import { Button } from '@/components/ui/button'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { generateMockRecords } from '@/data/mockRecords'
import type { CopyRecord } from '@/types/record'

function App() {
  const initialRecords = useMemo(() => generateMockRecords(), [])
  const [records, setRecords] = useState<CopyRecord[]>(initialRecords)
  const [dialogOpen, setDialogOpen] = useState(false)

  const handleCreate = (data: Omit<CopyRecord, 'id' | 'createdAt'>) => {
    const newRecord: CopyRecord = {
      id: String(records.length + 1).padStart(4, '0'),
      createdAt: new Date().toISOString(),
      ...data,
    }
    setRecords((prev) => [newRecord, ...prev])
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        {/* 顶部栏 */}
        <header className="flex h-14 shrink-0 items-center gap-2 sm:gap-3 border-b bg-card px-3 sm:px-4">
          <SidebarTrigger />
          <div className="flex-1" />
          <Button size="sm" className="sm:size-default" onClick={() => setDialogOpen(true)}>
            <span className="hidden sm:inline">＋ 新建</span>
            <span className="sm:hidden">新建</span>
          </Button>
        </header>

        {/* 中间内容区：flex-col gap 结构化 + 背景分层 */}
        <main className="flex-1 overflow-auto bg-muted/30 p-3 sm:p-6">
          <div className="flex flex-col gap-3 sm:gap-6">
            {/* 标题区：独立卡片容器 */}
            <section className="rounded-lg border bg-card px-3 sm:px-5 py-3 sm:py-4">
              <h2 className="text-base sm:text-lg font-semibold tracking-tight">文案记录</h2>
              <p className="mt-0.5 text-xs sm:text-sm text-muted-foreground">
                已生成的文案历史 · {records.length} 条
              </p>
            </section>

            {/* 表格区 */}
            <section>
              <RecordsTable data={records} />
            </section>
          </div>
        </main>
      </SidebarInset>

      <NewRecordDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={handleCreate}
      />
    </SidebarProvider>
  )
}

export default App
