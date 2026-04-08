import type { Metadata } from 'next'
import PageHeader from '@/components/PageHeader'
import BandStats from '@/components/BandStats'
import PressKit from '@/components/PressKit'
import PressEmpty from '@/components/PressEmpty'

export const metadata: Metadata = {
  title: 'Press Kit',
  description:
    'Press kit for the McPhee Big Band: band bio, press photos, repertoire list, and technical rider for media and venues.',
}

export default function PressPage() {
  return (
    <>
      <PageHeader
        label="FOR MEDIA & VENUES"
        title="Press & Media."
        subtitle="Everything you need for booking inquiries, media requests, and technical information."
      />
      <BandStats />
      <PressKit />
      <PressEmpty />
    </>
  )
}
