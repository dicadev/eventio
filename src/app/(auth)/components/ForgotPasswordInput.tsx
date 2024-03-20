import { PasswordInput, Text, Group, Anchor } from '@mantine/core'
import { useFormContext } from "react-hook-form"

export function ForgotPasswordInput () {
  const {
    register,
    formState: { isSubmitting, errors },
  } = useFormContext()
  return (
    <>
      <Group justify="space-between" mb={5} >
        <Text component="label" htmlFor="password" size="sm" fw={500}>
          Your password
        </Text>

        <Anchor href="#" onClick={(event) => event.preventDefault()} pt={2} fw={500} fz="xs">
          Forgot your password?
        </Anchor>
      </Group>
      <PasswordInput placeholder="Your password" id="password" {...register("password")} maw={200} styles={{
        input: {
          backgroundColor: 'green'
        }
      }}
      />
    </>
  )
}