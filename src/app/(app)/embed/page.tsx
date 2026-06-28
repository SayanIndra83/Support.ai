import { getSession } from "@/app/lib/getSession"
import Loading from "@/app/loading"
import EmbedClient from "@/components/EmbedClient"
import { Suspense } from "react"

async function page() {
    const session = await getSession()
    if(!session || !session.user) return
  return (
    <>
    <Suspense fallback={<Loading/>}>
    <EmbedClient ownerId={session.user.id}/>
     </Suspense>
    </>
  )
}

export default page
