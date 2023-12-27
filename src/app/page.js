import Animecard from '@/components/Animecard'
import Herosection from '@/components/home/Herosection'
import Navbarcomponent from '@/components/Navbar'
import { TrendingAnilist } from '@/lib/Anilistfunctions'
import React from 'react'
import { MotionDiv } from '@/utils/MotionDiv'
import RecentEpisodesCard from '@/components/home/RecentEpisodesCard'

async function Home() {
  const herodata = await TrendingAnilist();
  return (
    <div>
      <Navbarcomponent />
      <Herosection data={herodata} />
      <MotionDiv
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <RecentEpisodesCard cardid="Recent Episodes" />
      </MotionDiv>
      <MotionDiv
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <Animecard data={herodata} cardid="Trending Now" />
      </MotionDiv>
    </div>
  )
}

export default Home
