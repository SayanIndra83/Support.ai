import HomeClient from '@/components/HomeClient'
import { getSession } from './lib/getSession'
import { Suspense } from 'react'
import Loading from './loading'


async function Home() {
  const session = await getSession()
  // console.log(session)
  const email = session?.user?.email
  return (
    <>
    <Suspense fallback={<Loading/>}>
    <HomeClient email = {email!}/>
    </Suspense>
    </>
  )
}

export default Home
