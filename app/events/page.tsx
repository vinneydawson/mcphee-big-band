import type { Metadata } from 'next'
import PageHeader from '@/components/PageHeader'
import PrivateEvents from '@/components/PrivateEvents'
import EventPackages from '@/components/EventPackages'
import EventFAQ from '@/components/EventFAQ'

export const metadata: Metadata = {
  title: 'Private Events',
  description:
    'Book the McPhee Big Band for your next event: corporate galas, weddings, private parties, and fundraisers across Southern California.',
}

export default function EventsPage() {
  return (
    <>
      <PageHeader
        label="PRIVATE BOOKINGS"
        title="Make It Unforgettable."
        subtitle="The full sound, sophistication, and energy of a professional jazz orchestra, tailored to your event."
      />
      <PrivateEvents />
      <EventPackages />
      <EventFAQ />
    </>
  )
}
