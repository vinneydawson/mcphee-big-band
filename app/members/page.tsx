import type { Metadata } from 'next'
import PageHeader from '@/components/PageHeader'
import MilesBio from '@/components/MilesBio'
import FeaturedMusician from '@/components/FeaturedMusician'
import Members from '@/components/Members'

export const metadata: Metadata = {
  title: 'Members',
  description:
    'Meet the musicians of the McPhee Big Band. Southern California\'s finest young jazz players, led by music director Miles McPhee.',
}

export default function MembersPage() {
  return (
    <>
      <PageHeader
        label="THE ENSEMBLE"
        title="Meet the Band."
        subtitle="Seventeen musicians trained at the region's top conservatories, performing with the skill and commitment of working professionals."
      />
      <MilesBio />
      <FeaturedMusician />
      <Members />
    </>
  )
}
