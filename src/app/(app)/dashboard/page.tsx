

import { getSession } from "@/app/lib/getSession"
import DashboardClient from "@/components/DashboardClient"

async function page() {
    const  session = await getSession()
    if(!session || !session.user) return
  return (
   <>
   <DashboardClient ownerId={session.user.id}/>
   </>
  )
}

export default page
