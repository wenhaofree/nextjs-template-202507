import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="flex flex-col gap-4">
        <Button>默认按钮</Button>
        <Button variant="secondary">次要按钮</Button>
        <Button variant="destructive">危险按钮</Button>
        <Button variant="outline">轮廓按钮</Button>
        <Button variant="ghost">幽灵按钮</Button>
        <Button variant="link">链接按钮</Button>
      </div>
    </main>
  )
}
