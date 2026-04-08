import { NoteIcon } from '@/components/Logo'

export default function Loading() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-bg-primary flex flex-col items-center justify-center">
      <div className="w-16 h-16 bg-cb-blue rounded-2xl flex items-center justify-center animate-pulse">
        <NoteIcon size={40} />
      </div>
      <div className="mt-6 flex gap-1">
        <div className="w-1.5 h-1.5 rounded-full bg-cb-blue/60 animate-[bounce_1s_ease-in-out_0s_infinite]" />
        <div className="w-1.5 h-1.5 rounded-full bg-cb-blue/60 animate-[bounce_1s_ease-in-out_0.15s_infinite]" />
        <div className="w-1.5 h-1.5 rounded-full bg-cb-blue/60 animate-[bounce_1s_ease-in-out_0.3s_infinite]" />
      </div>
    </div>
  )
}
