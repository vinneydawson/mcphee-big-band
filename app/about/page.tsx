import type { Metadata } from 'next'
import PageHeader from '@/components/PageHeader'
import AboutStrip from '@/components/AboutStrip'
import MissionStatement from '@/components/MissionStatement'
import BandStory from '@/components/BandStory'
import BandTimeline from '@/components/BandTimeline'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Learn about the McPhee Big Band, a collective of Southern California\'s finest young jazz musicians keeping the big band tradition alive.',
}

export default function AboutPage() {
  return (
    <>
      <PageHeader
        label="ABOUT US"
        title="The McPhee Big Band."
        subtitle="A collective of Southern California's highest-level young jazz musicians, keeping the big band tradition alive and thriving."
      />
      <AboutStrip />
      <MissionStatement />
      <BandStory />
      <BandTimeline />
    </>
  )
}
