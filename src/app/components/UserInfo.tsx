import Link from "next/link"
import { invoke } from "@/blitz-server"
import { LogoutButton } from "@/(auth)/components/LogoutButton"
import getCurrentUser from "@/users/queries/getCurrentUser"
import { Button, Group, Stack, Text } from "@mantine/core"
import ButtonFetchTodos from "./ButtonFetchTodos"

async function UserInfo () {
  const currentUser = await invoke(getCurrentUser, null)

  if (!currentUser) return null

  return (
    <Stack maw={200}>
      <LogoutButton />
      <Group>
        <Link href="/">
          <Button variant="light">Home</Button>
        </Link>
        <Link href="/todos">
          <Button variant="light">Todos</Button>
        </Link>
      </Group>
      <Text>
        User Name: <code>{currentUser.name}</code>
      </Text>
    </Stack>
  )
}

export default UserInfo