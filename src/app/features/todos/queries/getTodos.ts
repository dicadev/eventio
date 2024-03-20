import { resolver } from "@blitzjs/rpc"
import { z } from "zod"
import db from "~/db"

const Input = z.object({})

export default resolver.pipe(resolver.zod(Input), resolver.authorize(), async ({ }, { session: { userId } }) => {
  const todos = await db.todo.findMany(
    {
      where: {
        userId
      },
      orderBy: {
        createdAt: 'asc'
      },
      select: {
        id: true,
        title: true,
        done: true
      }
    }
  )
  return todos
})