import type { Metadata } from 'next'
import PageHeader from '@/components/PageHeader'
import RepertoireComingSoon from '@/components/RepertoireComingSoon'

export const metadata: Metadata = {
  title: 'Repertoire',
  description:
    'Browse the McPhee Big Band repertoire: original arrangements by Miles McPhee alongside classic charts from the jazz canon.',
}

export default function RepertoirePage() {
  return (
    <>
      <PageHeader
        label="OUR MUSIC"
        title="Repertoire."
        subtitle="Original arrangements by Miles McPhee alongside classic charts from the jazz canon."
      />
      <RepertoireComingSoon />
    </>
  )
}
