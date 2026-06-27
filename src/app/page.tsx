import HomeClient from '@/components/HomeClient'
import { getSession } from './lib/getSession'
import { dbConnect } from './lib/dbConnect'


async function Home() {
  const session = await getSession()
  console.log(session)
  const email = session?.user?.email
  return (
    <>
    <HomeClient email = {email!}/>
    </>
  )
}

export default Home
