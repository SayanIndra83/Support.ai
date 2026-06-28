

import { getSession } from "@/app/lib/getSession"
import Loading from "@/app/loading"
import DashboardClient from "@/components/DashboardClient"
import { Suspense } from "react"

async function page() {
    const  session = await getSession()
    if(!session || !session.user) return
  return (
   <>
   <Suspense fallback={<Loading/>}>
   <DashboardClient ownerId={session.user.id}/>
   </Suspense>
   </>
  )
}

export default page
