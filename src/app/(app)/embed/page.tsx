import { getSession } from "@/app/lib/getSession"
import EmbedClient from "@/components/EmbedClient"

async function page() {
    const session = await getSession()
    if(!session || !session.user) return
  return (
    <>
    <EmbedClient ownerId={session.user.id}/>
    </>
  )
}

export default page
