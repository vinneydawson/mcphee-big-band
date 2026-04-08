import Hero from '@/components/Hero'
import HomeAbout from '@/components/HomeAbout'
import HomeNextShow from '@/components/HomeNextShow'
import HomeEvents from '@/components/HomeEvents'
import HomeQuote from '@/components/HomeQuote'
import BandStats from '@/components/BandStats'
import HomeTeaserGrid from '@/components/HomeTeaserGrid'
import HomeCTA from '@/components/HomeCTA'

export default function Home() {
  return (
    <>
      <Hero />
      <HomeAbout />
      <HomeNextShow />
      <HomeEvents />
      <HomeQuote />
      <BandStats />
      <HomeTeaserGrid />
      <HomeCTA />
    </>
  )
}
