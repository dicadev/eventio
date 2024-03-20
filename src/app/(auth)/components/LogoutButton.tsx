"use client"
import logout from "../mutations/logout"
import { useRouter } from "next/navigation"
import { useMutation } from "@blitzjs/rpc"
import { Button } from '@mantine/core'

export function LogoutButton () {
  const router = useRouter()
  const [logoutMutation] = useMutation(logout)
  return (
    <>
      <Button
        onClick={async () => {
          await logoutMutation()
          router.refresh()
        }}
      >
        Logout
      </Button>
    </>
  )
}