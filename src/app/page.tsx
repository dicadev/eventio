import AuthenticationForm from "@/components/AuthenticationForm"
import UserInfo from "@/components/UserInfo"
import { invoke } from "@/blitz-server"
import getCurrentUser from "@/users/queries/getCurrentUser"
import { Group, Stack } from "@mantine/core"


export default async function Home () {
  const currentUser = await invoke(getCurrentUser, null)
  return (
    <>
      {!currentUser && (
        <Stack align="center">
          <AuthenticationForm />
        </Stack>
      )
      }
    </>
  )
}
