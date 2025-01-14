import db from "db"
import { SecurePassword } from "@blitzjs/auth/secure-password"
import { z } from "zod"
import { resolver } from "@blitzjs/rpc"
import { Role } from "types"

const Input = z.object({
  password: z.string(),
  email: z.string(),
  name: z.string(),
})

export default resolver.pipe(resolver.zod(Input), async ({ name, email, password }, ctx) => {
  const hashedPassword = await SecurePassword.hash(password.trim())
  const user = await db.user.create({
    data: { email, hashedPassword, name, role: "USER" },
    select: { id: true, name: true, email: true, role: true },
  })

  await ctx.session.$create({ userId: user.id, role: user.role as Role })

  return user
})
