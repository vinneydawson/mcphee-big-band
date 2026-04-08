import type { Metadata } from 'next'
import PageHeader from '@/components/PageHeader'
import Residency from '@/components/Residency'
import VenueSpotlight from '@/components/VenueSpotlight'
import PastShows from '@/components/PastShows'

export const metadata: Metadata = {
  title: 'Shows',
  description:
    'Catch the McPhee Big Band live every second Saturday at Roscoe\'s Jazz Lounge in Downtown Long Beach.',
}

export default function ShowsPage() {
  return (
    <>
      <PageHeader
        label="LIVE PERFORMANCES"
        title="See Us Live."
        subtitle="From our monthly residency to special engagements, there's nothing like hearing a full 17-piece orchestra in person."
      />
      <Residency />
      <VenueSpotlight />
      <PastShows />
    </>
  )
}
