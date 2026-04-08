import type { Metadata } from 'next'
import PageHeader from '@/components/PageHeader'
import LivePlayer from '@/components/LivePlayer'
import { checkLiveStream } from '@/lib/youtube'

export const metadata: Metadata = {
  title: 'Live',
  description:
    'Watch the McPhee Big Band live. Tune in when the band is streaming a performance.',
}

export const dynamic = 'force-dynamic'

export default async function LivePage() {
  const initialStatus = await checkLiveStream()

  return (
    <>
      <PageHeader
        label="LIVE STREAM"
        title="Watch Live."
        subtitle="When the McPhee Big Band goes live on YouTube, you can watch the performance right here."
      />
      <div className="py-16 bg-bg-primary relative grain-light">
        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <LivePlayer initial={initialStatus} />
        </div>
      </div>
    </>
  )
}
